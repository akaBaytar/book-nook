'use client';

import { useState, useEffect, useCallback } from 'react';

import { useToast } from '@/hooks/use-toast';
import { upsertBookEntry, getBookEntries } from '@/actions/book.actions';

const ranges = ['0-50', '51-100', '101-150', '151-200', '200+'];
const colors = ['#8ebaa3', '#709dad', '#a3aed3', '#d7b6', '#d2665a'];

const pagesForColors = {
  '#8ebaa3': 25,
  '#709dad': 75,
  '#a3aed3': 125,
  '#d7b6': 175,
  '#d2665a': 225,
};

const months = [
  { name: 'J', days: 31 },
  { name: 'F', days: 28 },
  { name: 'M', days: 31 },
  { name: 'A', days: 30 },
  { name: 'M', days: 31 },
  { name: 'J', days: 30 },
  { name: 'J', days: 31 },
  { name: 'A', days: 31 },
  { name: 'S', days: 30 },
  { name: 'O', days: 31 },
  { name: 'N', days: 30 },
  { name: 'D', days: 31 },
];

type Entry = {
  id: string;
  day: number;
  month: number;
  year: number;
  pagesRead: number;
};

const BookTracker = () => {
  const { toast } = useToast();

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

  const [boxColors, setBoxColors] = useState<(string | null)[][]>(
    Array(31)
      .fill(null)
      .map(() => Array(12).fill(null))
  );

  const isLeapYear = useCallback((year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }, []);

  const isValidDay = useCallback(
    (day: number, month: number) => {
      const currentYear = new Date().getFullYear();

      if (month === 1) {
        return isLeapYear(currentYear) ? day <= 29 : day <= 28;
      }

      return day <= months[month].days;
    },
    [isLeapYear]
  );

  const loadEntries = useCallback(async () => {
    try {
      const { success, entries } = await getBookEntries();

      if (success && entries) {
        const newBoxColors = Array(31)
          .fill(null)
          .map(() => Array(12).fill(null));

        entries.forEach((entry: Entry) => {
          const pagesRead = entry.pagesRead;
          let color = colors[0];

          if (pagesRead > 200) color = colors[4];
          else if (pagesRead > 150) color = colors[3];
          else if (pagesRead > 100) color = colors[2];
          else if (pagesRead > 50) color = colors[1];

          if (isValidDay(entry.day, entry.month - 1)) {
            newBoxColors[entry.day - 1][entry.month - 1] = color;
          }
        });

        setBoxColors(newBoxColors);
      }
    } catch {
      toast({ title: 'Error', description: 'An error occurred.' });
    }
  }, [isValidDay, toast]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleBoxClick = async (row: number, col: number) => {
    const day = row + 1;
    const month = col + 1;

    try {
      const currentColor = boxColors[row][col];
      let pagesRead = 0;

      if (currentColor !== selectedColor) {
        pagesRead =
          pagesForColors[selectedColor as keyof typeof pagesForColors];
      }

      // const { success, message } = await upsertBookEntry({
      const { success } = await upsertBookEntry({
        day,
        month,
        pagesRead,
      });

      if (success) {
        await loadEntries();

        // toast({ description: message });
      }
    } catch {
      toast({ title: 'Error', description: 'An error occurred.' });
    }
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
                'scale-110 outline outline-1 outline-offset-1 outline-gray-500'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
      <div className='text-[11px] flex items-center justify-between ps-5 pe-1 w-full'>
        {months.map((month, index) => (
          <p key={index}>{month.name}</p>
        ))}
      </div>
      {Array.from({ length: 31 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex mb-1 justify-between'>
          <span className='text-[11px] w-2.5 text-center'>{rowIndex + 1}</span>
          {Array.from({ length: 12 }).map((_, colIndex) => {
            const isValid = isValidDay(rowIndex + 1, colIndex);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`size-4 rounded-sm border border-gray-300 
                  ${
                    isValid
                      ? 'cursor-pointer hover:opacity-75'
                      : 'cursor-not-allowed bg-gray-100'
                  }`}
                style={{
                  backgroundColor: isValid
                    ? boxColors[rowIndex][colIndex] || '#fff'
                    : '#f2efe7',
                }}
                onClick={() => isValid && handleBoxClick(rowIndex, colIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BookTracker;
