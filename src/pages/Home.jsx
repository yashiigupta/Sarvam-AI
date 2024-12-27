import React, { useContext, useEffect, useState, useCallback } from 'react';
import SideBar from '../components/SideBar';
import Explore from '../components/Explore';
// import Threads from '../components/Threads';
import AuthContext from '../context/AuthContext';
import Conversation from '../components/Conversation';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [conversationContent, setConversationContent] = useState({ image: '', caption: '' });
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isThreadsOpen, setIsThreadsOpen] = useState(false);
  const [chatid, setChatid] = useState(null);
  const [messages, setMessages] = useState([]);
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Make loadChatData a useCallback
  const loadChatData = useCallback(async (id) => {
    try {
      const token = getToken();
      const url = `https://sarvamai-backend.onrender.com/api/v1/ai/get-chat?usertoken=${token}&chatid=${id}`;
      const res = await fetch(url);
      const responseData = await res.json();
      
      if (responseData.data && responseData.data.data) {
        // Parse the data string to get messages array
        const chatData = JSON.parse(responseData.data.data);
        // Filter out system messages and set only assistant messages
        const assistantMessages = chatData.filter(msg => msg.role === 'assistant');
        setMessages(assistantMessages);
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  }, [getToken]);

  useEffect(() => {
    if (!getToken()) {
      return navigate('/welcome');
    }
  }, [getToken, navigate]);

  useEffect(() => {
    const createChat = async () => {
      if (!chatid) {
        try {
          const token = getToken();
          const url = `https://sarvamai-backend.onrender.com/api/v1/ai/create-chat?userToken=${token}&type=9`;
          const res = await fetch(url);
          const responseData = await res.json();
          if (responseData.data && responseData.data.id) {
            setChatid(responseData.data.id);
          }
        } catch (error) {
          console.error('Error creating chat:', error);
        }
      }
    };

    createChat();
  }, [chatid, getToken]);

  useEffect(() => {
    if (chatid) {
      loadChatData(chatid);
    }
  }, [chatid, loadChatData]); // Now loadChatData is properly memoized

  const handleImageClick = async (image, caption, newChatId) => {
    setConversationContent({ image, caption });
    if (newChatId) {
      setChatid(newChatId);
      await loadChatData(newChatId);
    }
    if (window.innerWidth < 1000) {
      setIsExploreOpen(false);
    }
  };

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  // const handleThreadSelect = async (threadId) => {
  //   setChatid(threadId);
  //   await loadChatData(threadId);
  //   setIsThreadsOpen(false);
  // };

  const toggleThreads = () => {
    setIsThreadsOpen(!isThreadsOpen);
    if (!isThreadsOpen) {
      setIsExploreOpen(false);
    }
  };

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      {console.log(localStorage.authToken)}
      <div className='w-[90px] flex-shrink-0'>
        <SideBar 
          onDiscoverClick={toggleExplore} 
          onThreadsClick={toggleThreads}
        />
      </div>

      {/* Remove sound button */}

      {isExploreOpen && (
        <>
          <div className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40' />
          <div className={`
            ${isExploreOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed md:relative
            top-0 left-0 h-full
            w-full md:w-96
            bg-white
            transition-transform duration-300
            z-50 md:z-auto
            flex-shrink-0
          `}>
            <button 
              className='md:hidden absolute top-4 left-4 p-2 text-gray-600'
              onClick={toggleExplore}
            >
              ✕
            </button>
            <div className='pt-16 md:pt-0 h-full'>
              <Explore 
                onClick={handleImageClick} 
                onClose={toggleExplore}  // Add this line
              />
            </div>
          </div>
        </>
      )}
      <div className='flex-grow'>
        <Conversation 
          image={conversationContent.image}
          caption={conversationContent.caption}
          messages={messages}
          chatId={chatid}
          userToken={getToken()}
        />
      </div>
    </div>
  );
};

export default Home;
