import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routes/AppRouter ';

export const App = () => {
  const WebState = ({ children }: any) => {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    );
  }

  return (
    <WebState>
      <AppRouter />
    </WebState>
  )
}
