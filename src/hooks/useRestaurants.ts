import { useState, useEffect } from 'react';
import { Restaurant, getAllRestaurants } from '../db';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load restaurants'));
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  return { restaurants, loading, error };
}