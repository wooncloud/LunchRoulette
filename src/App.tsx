import React from 'react';
import { useRestaurants } from './hooks/useRestaurants';
import { useRoulette } from './hooks/useRoulette';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Roulette } from './components/Roulette';
import { SpinButton } from './components/SpinButton';
import { ResultDisplay } from './components/ResultDisplay';

export default function App() {
  const { restaurants, loading, error } = useRestaurants();
  const { isSpinning, selectedRestaurant, spin } = useRoulette(restaurants);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <LoadingSpinner message="음식점 정보를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-red-600">데이터를 불러오는데 실패했습니다.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">오늘의 점심 메뉴</h1>
      
      <Roulette
        restaurants={restaurants}
        isSpinning={isSpinning}
        selectedRestaurant={selectedRestaurant}
      />

      <SpinButton onClick={spin} disabled={isSpinning} />

      {selectedRestaurant && !isSpinning && (
        <ResultDisplay restaurant={selectedRestaurant} />
      )}
    </div>
  );
}