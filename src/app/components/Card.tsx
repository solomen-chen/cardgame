'use client';

import Image from 'next/image';

// 定義 Card 組件的 props 型別
interface CardProps {
  image: string;
  isFlipped: boolean;
  onClick: () => void;
  isShuffling: boolean;
}

export default function Card({ image, isFlipped, onClick, isShuffling }: CardProps) {
  return (
    <div
      className={`relative aspect-square w-20 sm:w-28 cursor-pointer transform transition-transform duration-300 ${
        isFlipped ? 'rotate-y-180' : ''
      } ${isShuffling ? 'animate-shuffle' : ''}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 backface-hidden">
        <Image
          src="/images/back.jpg"
          alt="Card Back"
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="absolute inset-0 backface-hidden rotate-y-180">
        <Image src={image} alt="Card Front" fill className="object-cover rounded" />
      </div>
    </div>
  );
}