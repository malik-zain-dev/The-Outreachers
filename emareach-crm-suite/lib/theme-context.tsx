'use client';

import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      localStorage.setItem('emareach_theme', 'light');
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.classList.add('light');
    } catch (e) {}
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: 'light',
        toggleTheme: () => {},
        setTheme: () => {},
      }}
    >
      <div className="light w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
