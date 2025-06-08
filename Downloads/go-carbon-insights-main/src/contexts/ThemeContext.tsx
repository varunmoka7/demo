
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  textScale: number;
  setTextScale: (scale: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textScale, setTextScale] = useState(1);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedContrast = localStorage.getItem('highContrast');
    const savedScale = localStorage.getItem('textScale');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedContrast === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
    
    if (savedScale) {
      const scale = parseFloat(savedScale);
      setTextScale(scale);
      document.documentElement.style.fontSize = `${scale * 16}px`;
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newValue);
      return newValue;
    });
  };

  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const newValue = !prev;
      localStorage.setItem('highContrast', newValue.toString());
      document.documentElement.classList.toggle('high-contrast', newValue);
      return newValue;
    });
  };

  const handleTextScale = (scale: number) => {
    setTextScale(scale);
    localStorage.setItem('textScale', scale.toString());
    document.documentElement.style.fontSize = `${scale * 16}px`;
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      isHighContrast,
      toggleHighContrast,
      textScale,
      setTextScale: handleTextScale
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
