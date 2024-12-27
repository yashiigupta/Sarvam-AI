import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import AuthContext from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import RenderCard from './RenderCard';
import { speak as speakText, stopSpeaking } from '../utils/speech';

const ConversationBox = ({ message, isAssistant, image, caption, sound, chatId, userToken }) => {
  const { username } = useContext(AuthContext);
  const { speak } = useSound();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (query.trim()) {
      fetchData(query);
    }
  };

  // Update fetchData to use speak from context
  const fetchData = useCallback(async (queryText) => {
    if (!queryText.trim()) return;
    setIsSending(true);
    setLoading(false);

    const userMessage = {
      question: queryText,
      answer: []
    };
    setResult(prev => [...prev, userMessage]);
    setQuery(""); 

    try {
      const url = `https://sarvamai-backend.onrender.com/api/v1/ai/send-message?usertoken=${userToken}&chatid=${chatId}&message=${queryText}`;
      const res = await fetch(url, {method: "POST"});
      const data = await res.json();
      
      if (data.response) {
        setResult(prev => {
          const newResults = [...prev];
          newResults[newResults.length - 1].answer = [data.response];
          return newResults;
        });

        if (sound) {
          speak(data.response);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  }, [chatId, userToken, sound, speak]);

  const formatText = (text) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.split(boldRegex).map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      const italicRegex = /\*(.*?)\*/g;
      return part.split(italicRegex).map((subPart, subIndex) => {
        if (subIndex % 2 === 1) {
          return <em key={`${index}-${subIndex}`}>{subPart}</em>;
        }
        return subPart;
      });
    }).flat().filter(Boolean);
  };

  // If we assign a new image+caption, fetch it fresh
  useEffect(() => {
    if (caption && image) {
      setResult([]);
      fetchData(caption);
    }
  }, [caption, image, fetchData]);

  // Auto-scroll 
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [result]);

  // Update greeting effect
  useEffect(() => {
    let mounted = true;
    
    if (loading && sound) {
      const speakGreeting = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          if (mounted) {
            await speak(`Hey there, ${username}, nice to meet you. I'm Pi, your personal AI.`);
          }
        } catch (error) {
          console.error('Error speaking greeting:', error);
        }
      };
      
      speakGreeting();
    }

    return () => {
      mounted = false;
      stopSpeaking();
    };
  }, [loading, sound, username, speak]);

  // Stop if toggled off
  useEffect(() => {
    if (!sound) {
      stopSpeaking();
    }
  }, [sound]);

  // Update message speaking effect
  useEffect(() => {
    if (isAssistant && sound && message) {
      speak(message);
    }
  }, [message, isAssistant, sound, speak]);

  return (
    <div className="relative flex flex-col items-center justify-end h-full w-full overflow-hidden px-2 sm:px-4 md:px-8">
      {loading ? (
        <div className='absolute top-10 flex flex-col justify-start items-start text-base sm:text-xl md:text-2xl text-[#0D3C26] font-medium w-[90%] sm:w-[80%] md:w-[65%] animate-fadeIn'>
          <p className='mb-2 sm:mb-4'>Hey {username}, nice to meet you. I'm Pi, your personal AI.</p>
          <p className='mb-2 sm:mb-4'>My goal is to be useful, friendly and fun. Ask me for advice, for answers, or let's talk about whatever's on your mind.</p>
          <p>How's your day going?</p>
        </div>
      ) : (
        <div ref={resultRef} className='overflow-y-auto scrollbar-hide py-3 sm:py-5 flex flex-col items-center justify-start h-[90%] w-[90%] sm:w-[80%] md:w-[65%] mt-3 sm:mt-5 mb-2 sm:mb-3'>
          {caption && image ? (
            <>
              <RenderCard caption={caption} image={image} />
              {result.map((item, index) => (
                <div className='text-wrap text-sm sm:text-base md:text-xl text-[#0D3C26] font-medium my-2 sm:my-4' key={index}>
                  {item.question !== caption && (
                    <div className='text-base sm:text-lg bg-[#F5EADC] w-auto h-auto px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl flex justify-center items-end mt-2 sm:mt-3'>
                      {item.question}
                    </div>
                  )}
                  <div className="mt-2 sm:mt-3">
                    {item.answer.map((text, i) => (
                      <div key={i} className='mb-2 sm:mb-4'>
                        {formatText(text)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            result.map((item, index) => (
              <div className='w-full flex flex-col gap-2 sm:gap-4' key={index}>
                <div className='flex justify-end w-full'>
                  <div className='text-base sm:text-xl md:text-2xl text-[#0D3C26] font-medium bg-[#F5EADC] px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl max-w-[85%] sm:max-w-[75%] md:max-w-[65%]'>
                    {item.question}
                  </div>
                </div>
                <div className='flex flex-col justify-start items-start text-base sm:text-xl md:text-2xl text-[#0D3C26] font-medium max-w-[85%] sm:max-w-[75%] md:max-w-[65%]'>
                  {item.answer.map((text, i) => (
                    <div key={i} className='mb-2 sm:mb-4'>
                      {formatText(text)}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <div className="flex items-center w-[90%] sm:w-[80%] md:max-w-xl bg-white rounded-full shadow-md overflow-hidden hover:border hover:border-[#c9b597] px-2">
        <input
          type="text"
          placeholder="Talk with Pi"
          className="flex-grow px-3 sm:px-5 py-3 sm:py-4 h-auto text-black text-base sm:text-lg placeholder-[#c9b597] focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
        />
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full
            ${query.trim() && !isSending ? 'bg-green-600 text-white' : 'bg-[#FAF3EA] text-[#6B6255]'}
            hover:${query.trim() && !isSending ? 'bg-[#8d6d42]' : ''} 
            disabled:opacity-50`}
          aria-label="Send"
          onClick={handleSendMessage}
          disabled={!query.trim() || isSending}
        >
          {isSending ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
                  5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
                  5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" width="12" height="16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M.852 7.648a1.2 1.2 0 0 1 0-1.696l4.8-4.8a1.2
                   1.2 0 0 1 1.696 0l4.8 4.8a1.2 1.2 0 1 1-1.697
                   1.696L7.7 4.897V14a1.2 1.2 0 0 1-2.4
                   0V4.897L2.548 7.648a1.2 1.2 0 0
                   1-1.696 0Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      <footer className="flex justify-center items-center mt-2 sm:mt-4 mb-3 sm:mb-5 text-[#6B6255] text-xs sm:text-sm font-medium font-sans text-center w-full">
        By using Pi, you agree to our <span className="text-green-800 underline">Terms</span> and <span className="text-green-800 underline">Privacy Policy</span>.
      </footer>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ConversationBox;