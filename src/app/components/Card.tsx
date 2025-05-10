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
      className={`relative aspect-square w-20 md:w-28 cursor-pointer transition-transform duration-300 ${
        isShuffling ? 'animate-shuffle' : ''
      }`}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 transition-transform duration-300 transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <Image
          src="/images/back.jpg"
          alt="Card Back"
          fill
          className="object-cover rounded"
        />
      </div>
      <div
        className={`absolute inset-0 transition-transform duration-300 transform ${
          isFlipped ? '' : 'rotate-y-180'
        }`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <Image src={image} alt="Card Front" fill className="object-cover rounded" />
      </div>
    </div>
  );
}