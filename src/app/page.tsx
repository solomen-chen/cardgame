'use client';

import { useState, useEffect } from 'react';
import Card from './components/Card';

const generateCards = () => {
  const images = Array.from({ length: 8 }, (_, i) => `/images/card${i + 1}.jpg`);
  const cards = images.flatMap((image, index) => [
    { id: `${index}-1`, image, matched: false },
    { id: `${index}-2`, image, matched: false },
  ]);
  // Fisher-Yates 洗牌
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

export default function Home() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);

  // 初始化遊戲
  const resetGame = () => {
    setCards(generateCards());
    setFlipped([]);
    setGuessCount(0);
    setGameOver(false);
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 1500); // 洗牌動畫 1.5 秒
  };

  useEffect(() => {
    resetGame();
  }, []);

  // 處理卡牌點擊
  const handleCardClick = (id) => {
    if (flipped.length === 2 || isShuffling || flipped.includes(id) || cards.find((c) => c.id === id).matched) {
      return;
    }

    setFlipped([...flipped, id]);

    if (flipped.length === 1) {
      const firstCard = cards.find((c) => c.id === flipped[0]);
      const secondCard = cards.find((c) => c.id === id);
      if (firstCard.image === secondCard.image) {
        setCards(cards.map((c) => (c.image === firstCard.image ? { ...c, matched: true } : c)));
        setFlipped([]);
        setGuessCount(guessCount + 1);
      } else {
        setGuessCount(guessCount + 1);
        setTimeout(() => setFlipped([]), 1000); // 不匹配，1 秒後翻回
      }
    }
  };

  // 檢查遊戲是否結束
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">翻翻樂</h1>
      <p className="text-lg mb-4">猜測次數：{guessCount}</p>
      {gameOver && <p className="text-2xl text-green-600 mb-4">恭喜完成！</p>}
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 landscape:grid-cols-8 gap-2 max-w-4xl w-full ${
          isShuffling ? 'shuffle' : ''
        }`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            isFlipped={flipped.includes(card.id) || card.matched}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        重新開始
      </button>
    </div>
  );
}