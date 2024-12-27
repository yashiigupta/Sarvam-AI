let currentSpeech = null;

export const speak = (text, isSound) => {
  // Cancel any ongoing speech
  if (currentSpeech) {
    window.speechSynthesis.cancel();
  }
  
  // Don't start new speech if sound is off
  if (!isSound) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  currentSpeech = utterance;
  
  window.speechSynthesis.speak(utterance);
  
  utterance.onend = () => {
    currentSpeech = null;
  };
};

export const stopSpeaking = () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    currentSpeech = null;
  }
};
