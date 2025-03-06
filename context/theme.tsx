'use client';

import { createContext, useState, useContext, useEffect, useMemo } from 'react';

import type { Theme, ThemeContext } from '@/types';

const ThemeContext = createContext<ThemeContext>({
  theme: 'theme-soft-pastel',
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const validThemes = useMemo(
    () => [
      'theme-soft-pastel',
      'theme-ocean-breeze',
      'theme-lavender-fields',
      'theme-mint-fresh',
      'theme-sunset-glow',
    ],
    []
  );

  const [theme, setTheme] = useState<Theme | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('selected-theme') as Theme;
      if (savedTheme && validThemes.includes(savedTheme)) {
        setTheme(savedTheme);
      } else {
        setTheme('theme-soft-pastel');
      }
    }
  }, [validThemes]);

  useEffect(() => {
    if (theme === null || typeof window === 'undefined') return;

    const root = document.documentElement;
    validThemes.forEach((cls) => root.classList.remove(cls));
    root.classList.add(theme);

    if (isInitialized) {
      localStorage.setItem('selected-theme', theme);
    }
  }, [theme, validThemes, isInitialized]);

  useEffect(() => {
    if (theme !== null) {
      setIsInitialized(true);
    }
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme: theme || 'theme-soft-pastel',
      setTheme,
    }),
    [theme]
  );

  if (theme === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
