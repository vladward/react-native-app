import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { AsyncStore } from '../utils/async-store';
import { API } from '../api';
import { UserType } from '../types/types';

const AuthContext = createContext<any>('');
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('usePaginationContext must be used within a PaginationProvider');
  }
  return context;
};

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<any>();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();

  const [isAppLoading, setIsAppLoading] = useState(true);
  const updateSessionId = async () => {
    try {
      await AsyncStore.getValue('sessionId').then((value) => {
        setSessionId(value);
        setIsAppLoading(false);
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

  useEffect(() => {
    sessionId && API.getCurrentUser(sessionId).then((data) => setCurrentUser(data));
  }, [sessionId]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoggedIn,
        sessionId,
        isAppLoading,
        setIsAuth,
        setIsLoggedIn,
        setSessionId,
        currentUser,
        setIsAppLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
