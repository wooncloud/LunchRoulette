import React from 'react';
import { Restaurant } from '../db';

interface ResultDisplayProps {
  restaurant: Restaurant;
}

export function ResultDisplay({ restaurant }: ResultDisplayProps) {
  return (
    <div className="mt-6 text-center">
      <p className="text-lg text-gray-600">오늘의 점심은</p>
      <p className="text-xl font-bold text-indigo-600 mt-2">{restaurant.name}</p>
      <p className="text-lg text-gray-600">어떠세요?</p>
    </div>
  );
}