'use client';

import { useState } from 'react';

const colors = ['#8ebaa3', '#709dad', '#a3aed3', '#d7b6', '#d2665a'];

const BookTracker = () => {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [boxColors, setBoxColors] = useState<(string | null)[][]>(
    Array(31)
      .fill(null)
      .map(() => Array(12).fill(null))
  );

  const handleBoxClick = (row: number, col: number) => {
    const newBoxColors = [...boxColors];
    newBoxColors[row][col] = selectedColor;
    setBoxColors(newBoxColors);
  };

  return (
    <div className='w-full py-5'>
      <div className='flex justify-center gap-2.5 mb-2.5'>
        {colors.map((color, index) => (
          <div
            role='button'
            key={index}
            className={`size-4 border rounded-sm ${
              selectedColor === color ? 'border-gray-500' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      {Array.from({ length: 31 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex mb-1 justify-between'>
          {Array.from({ length: 12 }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className='size-4 rounded-sm border border-gray-300 cursor-pointer hover:opacity-75'
              style={{
                backgroundColor: boxColors[rowIndex][colIndex] || 'white',
              }}
              onClick={() => handleBoxClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BookTracker;
