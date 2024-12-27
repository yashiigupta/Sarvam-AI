import React, { createContext, useContext, useState } from 'react';
import { stopSpeaking } from '../utils/speech';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isSound, setIsSound] = useState(false);

  const toggleSound = () => {
    if (isSound) {
      stopSpeaking();
    }
    setIsSound(!isSound);
  };

  return (
    <SoundContext.Provider value={{ isSound, setIsSound, toggleSound }}>
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

export default SoundContext;
