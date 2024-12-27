let speaking = false;
let currentUtterance = null;

export const speak = (text) => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Stop any existing speech
    stopSpeaking();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance();
    currentUtterance = utterance;
    utterance.text = text;
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Set callbacks
    utterance.onend = () => {
      speaking = false;
      resolve();
    };

    utterance.onerror = (event) => {
      speaking = false;
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };

    // Start speaking
    speaking = true;
    window.speechSynthesis.speak(utterance);
  });
};

export const stopSpeaking = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (currentUtterance) {
    currentUtterance = null;
  }
  speaking = false;
};

export const isSpeaking = () => speaking;
