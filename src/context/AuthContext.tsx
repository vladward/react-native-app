import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { AsyncStore } from '../utils/async-store';

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

  const updateSessionId = async () => {
    try {
      await AsyncStore.getValue('sessionId').then((value) => {
        if (value !== null) setSessionId(value);
      });
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    updateSessionId();
  }, []);

  useEffect(() => {
    if (sessionId) setIsAuth(true);
  }, [sessionId]);

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
