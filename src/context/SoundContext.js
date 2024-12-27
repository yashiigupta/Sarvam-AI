import React, { createContext, useState, useContext } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isSound, setIsSound] = useState(true);

  return (
    <SoundContext.Provider value={{ isSound, setIsSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
