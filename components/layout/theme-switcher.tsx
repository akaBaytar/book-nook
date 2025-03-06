'use client';

import { useState, useEffect, useMemo } from 'react';

import { PaletteIcon } from 'lucide-react';

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';

import { useTheme } from '@/context/theme';

import type { Theme } from '@/types';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const themes = useMemo(
    () => [
      { value: 'theme-soft-pastel', label: 'Soft Pastel', color: '#f8d7e3' },
      { value: 'theme-ocean-breeze', label: 'Ocean Breeze', color: '#dbe9f5' },
      {
        value: 'theme-lavender-fields',
        label: 'Lavender Fields',
        color: '#e5d7f0',
      },
      { value: 'theme-mint-fresh', label: 'Mint Fresh', color: '#d7eede' },
      { value: 'theme-sunset-glow', label: 'Sunset Glow', color: '#f5e0c9' },
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Select
      value={theme}
      onValueChange={(newTheme) => setTheme(newTheme as Theme)}>
      <SelectTrigger className='w-full flex items-center gap-2 border-none shadow-none px-2'>
        <div className='flex items-center gap-2'>
          <PaletteIcon className='size-4' />
          <span>Theme</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {themes.map((themeOption) => (
          <SelectItem
            key={themeOption.value}
            value={themeOption.value}
            className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <div
                className='size-3 rounded-full'
                style={{ backgroundColor: themeOption.color }}
              />
              {themeOption.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ThemeSwitcher;
