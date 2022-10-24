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

  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<Array<number>>([]);

  const [parentPage, setParentPage] = useState<'NowPlaying' | 'Favorite' | 'SearchMovies'>(
    'NowPlaying'
  );

  return (
    <AppContext.Provider
      value={{
        language,
        isLoading,
        favoriteMoviesIds,
        parentPage,
        setLanguage,
        setIsLoading,
        setFavoriteMoviesIds,
        setParentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
