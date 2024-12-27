import React from 'react';
import { useSound } from '../context/SoundContext';
import { stopSpeaking } from '../utils/speech';

const ConvoHeader = () => {
  const { isSound, setIsSound } = useSound();

  const handleSoundToggle = () => {
    if (isSound) {
      stopSpeaking();
    }
    setIsSound(!isSound);
  };

  return (
    <header className='flex items-end justify-end'>
      <button 
        className='bg-[#f0e5d5] px-2 py-2 rounded-full flex gap-4 transition-colors hover:bg-[#e6d5c0]' 
        onClick={handleSoundToggle}
      >
        {isSound ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0D3C26] lg:h-6 lg:w-6">
            <path 
              fill="currentColor" 
              d="M12 3.75v16.5L7 16H4c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h3l5-4.25z"
            />
            <path 
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              d="M14 8.5c1.7 1.7 1.7 5.3 0 7"
            />
            <path 
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              d="M16.5 6c2.7 2.7 2.7 9.3 0 12"
            />
            <path 
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              d="M19 3.5c3.7 3.7 3.7 13.3 0 17"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0D3C26] lg:h-6 lg:w-6">
            {/* Speaker base */}
            <path 
              fill="currentColor" 
              d="M12 3.75v16.5L7 16H4c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h3l5-4.25z"
            />
            {/* X mark */}
            <g transform="translate(14, 8)">
              <line
                x1="0"
                y1="0"
                x2="6"
                y2="8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="6"
                y1="0"
                x2="0"
                y2="8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </svg>
        )}
      </button>
    </header>
  );
};

export default ConvoHeader;