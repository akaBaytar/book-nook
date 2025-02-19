'use client';

import { useState } from 'react';

const ranges = ['0-50', '51-100', '101-150', '151-200', '200+'];
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

    newBoxColors[row][col] =
      newBoxColors[row][col] === selectedColor ? null : selectedColor;

    setBoxColors(newBoxColors);
  };

  return (
    <div className='w-full py-2.5'>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-[11px] flex items-center gap-4'>
          {ranges.map((range, index) => (
            <span key={index}>{range}</span>
          ))}
        </div>
        <div className='flex items-center gap-8 mb-2.5'>
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
      </div>
      <div className='text-xs flex items-center gap-[14.4px] ms-3.5'>
        <span>J</span>
        <span>F</span>
        <span>M</span>
        <span>A</span>
        <span>M</span>
        <span>J</span>
        <span>J</span>
        <span>A</span>
        <span>S</span>
        <span>O</span>
        <span>N</span>
        <span>D</span>
      </div>
      {Array.from({ length: 31 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex mb-1 justify-between'>
          <span className='text-[11px]'>{rowIndex + 1}</span>
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
