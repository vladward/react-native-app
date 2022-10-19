import React, { createContext, FC, useContext, useState } from 'react';

const AppContext = createContext<any>('');
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('usePaginationContext must be used within a PaginationProvider');
  }
  return context;
};

const AppProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en-US' | 'ru-RUS'>('en-US');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        language,
        isLoading,
        setLanguage,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
