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
        <div className='text-[11px] flex items-center gap-4 mb-0.5'>
          {ranges.map((range, index) => (
            <span key={index}>{range}</span>
          ))}
        </div>
        <div className='flex items-center gap-8 mb-2.5'>
          {colors.map((color, index) => (
            <div
              role='button'
              key={index}
              className={`size-4 rounded-sm ${
                selectedColor === color &&
                `scale-110 outline outline-1 outline-offset-1 outline-gray-500`
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
      <div className='text-[11px] flex items-center justify-between ps-5 pe-1 w-full'>
        <p>J</p>
        <p>F</p>
        <p>M</p>
        <p>A</p>
        <p>M</p>
        <p>J</p>
        <p>J</p>
        <p>A</p>
        <p>S</p>
        <p>O</p>
        <p>N</p>
        <p>D</p>
      </div>
      {Array.from({ length: 31 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex mb-1 justify-between'>
          <span className='text-[11px] w-2.5 text-center'>{rowIndex + 1}</span>
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
