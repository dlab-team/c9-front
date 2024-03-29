import React, { createContext, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const ColorContext = createContext();

export function useColor() {
  return useContext(ColorContext);
}

export function ColorProvider({ children }) {
  const { currentUser } = useContext(AuthContext);

  const isTeacher = currentUser ? currentUser.isTeacher : false;

  const bgUserColor = isTeacher ? '#FF8552' : '#00235c';

  return (
    <ColorContext.Provider value={bgUserColor}>
      {children}
    </ColorContext.Provider>
  );
}
