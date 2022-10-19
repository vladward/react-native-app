import React, { createContext, FC, useContext, useState } from 'react';

const AuthContext = createContext<any>('');
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('usePaginationContext must be used within a PaginationProvider');
  }
  return context;
};

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState('');

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoggedIn,
        sessionId,
        setIsAuth,
        setIsLoggedIn,
        setSessionId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
