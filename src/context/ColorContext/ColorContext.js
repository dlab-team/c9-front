import React, { createContext, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext'; 


const ColorContext = createContext();

export function useColor() {
  return useContext(ColorContext);
}


export function ColorProvider({ children }) {
  const { currentUser } = useContext(AuthContext);

  const bgUserColor = currentUser ? '#FF8000' : '#00235c';

  return (
    <ColorContext.Provider value={bgUserColor}>
      {children}
    </ColorContext.Provider>
  );
}
