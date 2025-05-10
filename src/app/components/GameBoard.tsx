'use client';

import { useState, useEffect } from 'react';
import Card from './Card';

// 定義卡牌型別
interface CardType {
  id: string;
  image: string;
  matched: boolean;
}

// 創建初始卡牌（固定順序）
const createCards = (): CardType[] => {
  const cards: CardType[] = [];
  for (let i = 1; i <= 8; i++) {
    cards.push({ id: `${i}-1`, image: `/images/card${i}.jpg`, matched: false });
    cards.push({ id: `${i}-2`, image: `/images/card${i}.jpg`, matched: false });
  }
  return cards;
};

// Fisher-Yates 洗牌演算法
const shuffleCards = (cards: CardType[]): CardType[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function GameBoard() {
  const [cards, setCards] = useState<CardType[]>(createCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [guessCount, setGuessCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(true);
  const [isInitialFlipped, setIsInitialFlipped] = useState<boolean>(true);

  // 初始洗牌動畫
  useEffect(() => {
    console.log('Initial shuffling...');
    setCards(shuffleCards(createCards()));
    setIsInitialFlipped(true); // 顯示正面
    const timer = setTimeout(() => {
      setIsShuffling(false);
      setIsInitialFlipped(false); // 結束後顯示背面
    }, 5000); // 3秒動畫
    return () => clearTimeout(timer);
  }, []);

  // 檢查配對
  useEffect(() => {
    if (flipped.length === 2) {
      setGuessCount((prev) => prev + 1);
      const [first, second] = flipped;
      if (cards[first].image === cards[second].image) {
        setCards((prev) =>
          prev.map((card, index) =>
            index === first || index === second ? { ...card, matched: true } : card
          )
        );
        setFlipped([]);
      } else {
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards]);

  // 檢查遊戲結束
  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setIsGameOver(true);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (
      isShuffling ||
      flipped.length >= 2 ||
      flipped.includes(index) ||
      cards[index].matched
    ) {
      return;
    }
    setFlipped((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setCards(shuffleCards(createCards()));
    setFlipped([]);
    setGuessCount(0);
    setIsGameOver(false);
    setIsShuffling(true);
    setIsInitialFlipped(true); // 顯示正面
    setTimeout(() => {
      setIsShuffling(false);
      setIsInitialFlipped(false); // 結束後顯示背面
    }, 5000); // 3秒動畫
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">翻翻樂</h1>
      <p className="mb-4 text-lg font-semibold text-gray-800 bg-white p-2 rounded shadow z-10">
        猜測次數: {guessCount}
      </p>
      <div
        className="grid grid-cols-2 lg:grid-cols-4 landscape:grid-cols-8 gap-2 max-w-4xl mx-auto"
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            isFlipped={isInitialFlipped || flipped.includes(index) || card.matched}
            onClick={() => handleCardClick(index)}
            isShuffling={isShuffling}
          />
        ))}
      </div>
      <div className="mt-6">
        {isGameOver && (
          <p className="text-xl font-semibold mb-4 text-green-600">
            恭喜！遊戲結束！
          </p>
        )}
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow z-10"
        >
          重新開始
        </button>
      </div>
    </div>
  );
}