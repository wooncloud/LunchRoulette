import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Restaurant } from '../db';

interface RouletteProps {
  restaurants: Restaurant[];
  isSpinning: boolean;
  selectedRestaurant: Restaurant | null;
}

export function Roulette({ restaurants, isSpinning, selectedRestaurant }: RouletteProps) {
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isSpinning) {
      let startTime: number;
      const duration = 3000; // 3초 동안 회전

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 이징 함수를 사용하여 자연스러운 감속 효과
        const easing = 1 - Math.pow(1 - progress, 4);
        const currentRotation = easing * 1800; // 총 5바퀴 회전

        setRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isSpinning]);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div
        className="absolute inset-0 rounded-full border-4 border-indigo-600 flex items-center justify-center transform transition-transform"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {isSpinning ? (
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        ) : selectedRestaurant ? (
          <div className="text-xl font-bold text-indigo-600">{selectedRestaurant.name}</div>
        ) : (
          <div className="text-gray-400">룰렛을 돌려주세요!</div>
        )}
      </div>
    </div>
  );
}