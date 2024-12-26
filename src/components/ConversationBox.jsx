import React, { useState, useEffect, useRef } from 'react';
import RenderCard from './RenderCard';

const ConversationBox = ({ image, caption }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [result, setResult] = useState([]);
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (queryText) => {
    setLoading(false);
    if(queryText.trim() === "") {
      setResult([]);
      return;
    }
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
    const element = {
      "question": queryText,
      "answer": data.candidates[0].content.parts[0].text.split("**")
    }
    setResult((prev) => [...prev, element]);
    setQuery("");
    return;
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

  return (
    <div className="relative flex flex-col items-center justify-end h-full w-full overflow-hidden px-8">
      {loading ? 
        <div className='absolute top-10 flex flex-col justify-start items-start text-2xl text-[#0D3C26] font-medium w-[65%] animate-fadeIn'>
          <p className='mb-4'>Hey there, great to meet you. I'm Pi, your personal AI.</p>
          <p className='mb-4'>My goal is to be useful, friendly and fun. Ask me for advice, for answers, or let's talk about whatever's on your mind.</p>
          <p>How's your day going?</p>
        </div>
        :
        <div ref={resultRef} className='overflow-y-auto py-5 flex flex-col items-center justify-start h-[90%] w-[80%] mt-5 mb-3'>
        {caption && image ? (
          <>  
            <RenderCard caption={caption} image={image} />
            {result.map((item, index) => (
            <div className='text-wrap text-lg text-[#0D3C26] font-medium my-4' key={index}>
              {item.question !== caption ? 
                <div className='text-lg text-[#0D3C26] font-medium bg-[#F5EADC] w-auto h-auto px-3 py-2 rounded-2xl flex justify-centerflex justify-end items-end mt-3' key={item.question}>{item.question}</div>
               : <></>}
              <ul className={item.answer.length > 1 ? "list-disc ml-5 mt-3" : "mt-3"}>{item.answer.map((impo, index) => (
                impo !== "*" ? <li key={index}>{impo}</li> : <></>
              ))}</ul>
            </div>))}
          </>
          )
          : 
          result.map((item, index) => (
          <div className='text-wrap text-lg text-[#0D3C26] font-medium my-4' key={index}>
            <div className='flex justify-end items-end w-full mt-3' key={item.question}>
              <div className='text-lg text-[#0D3C26] font-medium bg-[#F5EADC] w-auto h-auto px-3 py-2 rounded-2xl flex items-center justify-center'>{item.question}</div>
            </div>
            <ul className={item.answer.length > 1 ? "list-disc ml-5" : ""}>{item.answer.map((impo, index) => (
              <li key={index}>{impo}</li>
            ))}</ul>
          </div>
        ))}
      </div>}
      <div className="flex items-center w-full max-w-lg bg-white rounded-full shadow-md overflow-hidden hover:border hover:border-[#c9b597]">
        <input
          type="text"
          placeholder="Talk with Pi"
          className="flex-grow px-5 py-4 h-auto text-black text-lg placeholder-[#c9b597] focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#a78252] text-white"
          aria-label="Send"
          onClick={() => fetchData(debouncedQuery)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M.852 7.648a1.2 1.2 0 0 1 0-1.696l4.8-4.8a1.2 1.2 0 0 1 1.696 0l4.8 4.8a1.2 1.2 0 1 1-1.697 1.696L7.7 4.897V14a1.2 1.2 0 0 1-2.4 0V4.897L2.548 7.648a1.2 1.2 0 0 1-1.696 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <footer className="flex justify-center items-center mt-4 mb-5 text-[#6B6255] text-sm font-medium font-sans text-center w-full">
        By using Pi, you agree to our&nbsp;<span className="text-green-800 underline">Terms</span>&nbsp;and&nbsp;<span className="text-green-800 underline">Privacy Policy</span>.
      </footer>
    </div>
  )
}

export default ConversationBox;