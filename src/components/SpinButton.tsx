import React from 'react';

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SpinButton({ onClick, disabled }: SpinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-8 px-6 py-3 rounded-full text-white font-semibold shadow-lg transform transition-all
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}
    >
      {disabled ? '선택 중...' : '점심 고르기'}
    </button>
  );
}