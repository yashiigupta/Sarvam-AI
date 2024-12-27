import React, { useState, useEffect, useRef } from 'react';
import RenderCard from './RenderCard';
import { useSound } from '../context/SoundContext';
import { speak, stopSpeaking } from '../utils/speech';

const ConversationBox = ({ image, caption }) => {
  const { isSound } = useSound();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [result, setResult] = useState([]);
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const fetchData = async (queryText) => {
    if(queryText.trim() === "") {
      return;
    }
    setIsSending(true);
    setLoading(false);
    
    // Add user message immediately
    const userMessage = {
      question: queryText,
      answer: []
    };
    setResult(prev => [...prev, userMessage]);
    setQuery(""); 

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD-Yof9ACbc-5ddfm5qDl23Fuvtn5lfQcc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "contents": [
            {
              "parts": [
                {
                  "text": queryText,
                }
              ]
            }
          ]
        })
      });
      const data = await res.json();
      
      // Get the AI response text
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // Update the last message with AI response
      setResult(prev => {
        const newResults = [...prev];
        newResults[newResults.length - 1].answer = aiResponse.split("**");
        return newResults;
      });

      // Speak the AI response
      speak(aiResponse, isSound);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (caption && image) {
      setResult([]);
      fetchData(caption);
    }
  }, [caption, image]);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [result]);

  // Add new useEffect for initial greeting
  useEffect(() => {
    if (loading && isSound) {
      const greeting = "Hey there, great to meet you. I'm Pi, your personal AI. My goal is to be useful, friendly and fun. Ask me for advice, for answers, or let's talk about whatever's on your mind. How's your day going?";
      speak(greeting, isSound);
    }
  }, [loading, isSound]);

  useEffect(() => {
    if (!isSound) {
      stopSpeaking();
    }
  }, [isSound]);

  return (
    <div className="relative flex flex-col items-center justify-end h-full w-full overflow-hidden px-2 sm:px-4 md:px-8">
      {loading ? 
        <div className='absolute top-10 flex flex-col justify-start items-start text-base sm:text-xl md:text-2xl text-[#0D3C26] font-medium w-[90%] sm:w-[80%] md:w-[65%] animate-fadeIn'>
          <p className='mb-2 sm:mb-4'>Hey there, great to meet you. I'm Pi, your personal AI.</p>
          <p className='mb-2 sm:mb-4'>My goal is to be useful, friendly and fun. Ask me for advice, for answers, or let's talk about whatever's on your mind.</p>
          <p>How's your day going?</p>
        </div>
        :
        <div ref={resultRef} className='overflow-y-auto scrollbar-hide py-3 sm:py-5 flex flex-col items-center justify-start h-[90%] w-[90%] sm:w-[80%] md:w-[65%] mt-3 sm:mt-5 mb-2 sm:mb-3'>
        {caption && image ? (
          <>  
            <RenderCard caption={caption} image={image} />
            {result.map((item, index) => (
            <div className='text-wrap text-base sm:text-lg text-[#0D3C26] font-medium my-2 sm:my-4' key={index}>
              {item.question !== caption ? 
                <div className='text-base sm:text-lg text-[#0D3C26] font-medium bg-[#F5EADC] w-auto h-auto px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl flex justify-center items-end mt-2 sm:mt-3'>{item.question}</div>
               : <></>}
              <ul className={item.answer.length > 1 ? "list-disc ml-4 sm:ml-5 mt-2 sm:mt-3" : "mt-2 sm:mt-3"}>{item.answer.map((impo, index) => (
                impo !== "*" ? <li key={index}>{impo}</li> : <></>
              ))}</ul>
            </div>))}
          </>
          )
          : 
          result.map((item, index) => (
          <div className='w-full flex flex-col gap-2 sm:gap-4' key={index}>
            <div className='flex justify-end w-full'>
              <div className='text-base sm:text-xl md:text-2xl text-[#0D3C26] font-medium bg-[#F5EADC] px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl max-w-[85%] sm:max-w-[75%] md:max-w-[65%]'>
                {item.question}
              </div>
            </div>
            <div className='flex flex-col justify-start items-start text-base sm:text-xl md:text-2xl text-[#0D3C26] font-medium max-w-[85%] sm:max-w-[75%] md:max-w-[65%]'>
              {item.answer.map((text, i) => (
                text !== "*" && <p key={i} className='mb-2 sm:mb-4'>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>}
      <div className="flex items-center w-[90%] sm:w-[80%] md:max-w-xl bg-white rounded-full shadow-md overflow-hidden hover:border hover:border-[#c9b597] px-2">
        <input
          type="text"
          placeholder="Talk with Pi"
          className="flex-grow px-3 sm:px-5 py-3 sm:py-4 h-auto text-black text-base sm:text-lg placeholder-[#c9b597] focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full
            ${query.trim() && !isSending ? 'bg-green-600' : 'bg-[#FAF3EA]'} 
            ${query.trim() && !isSending ? 'text-white' : 'text-[#6B6255]'}
            hover:${query.trim() && !isSending ? 'bg-[#8d6d42]' : ''} 
            disabled:opacity-50`}
          aria-label="Send"
          onClick={() => fetchData(debouncedQuery)}
          disabled={!query.trim() || isSending}
        >
          {isSending ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 16"
              width="12"
              height="16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M.852 7.648a1.2 1.2 0 0 1 0-1.696l4.8-4.8a1.2 1.2 0 0 1 1.696 0l4.8 4.8a1.2 1.2 0 1 1-1.697 1.696L7.7 4.897V14a1.2 1.2 0 0 1-2.4 0V4.897L2.548 7.648a1.2 1.2 0 0 1-1.696 0Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      <footer className="flex justify-center items-center mt-2 sm:mt-4 mb-3 sm:mb-5 text-[#6B6255] text-xs sm:text-sm font-medium font-sans text-center w-full">
        By using Pi, you agree to our&nbsp;<span className="text-green-800 underline">Terms</span>&nbsp;and&nbsp;<span className="text-green-800 underline">Privacy Policy</span>.
      </footer>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default ConversationBox;