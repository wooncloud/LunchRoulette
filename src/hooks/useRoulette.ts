import { useState, useCallback } from 'react';
import { Restaurant } from '../db';

export function useRoulette(restaurants: Restaurant[]) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const spin = useCallback(() => {
    if (!isSpinning && restaurants.length > 0) {
      setIsSpinning(true);
      setSelectedRestaurant(null);

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        setSelectedRestaurant(restaurants[randomIndex]);
        setIsSpinning(false);
      }, 3000);
    }
  }, [isSpinning, restaurants]);

  return {
    isSpinning,
    selectedRestaurant,
    spin
  };
}