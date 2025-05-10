'use client';

import Image from 'next/image';

export default function Card({ id, image, isFlipped, onClick }) {
  return (
    <div
      className="card relative aspect-square cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face card-front">
          <Image
            src={image}
            alt="Card"
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="card-face card-back">
          <Image
            src="/images/back.jpg"
            alt="Card Back"
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}