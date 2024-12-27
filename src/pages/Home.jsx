import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Explore from '../components/Explore';
import Threads from '../components/Threads';
import Conversation from '../components/Conversation';

const Home = (props) => {
  const [conversationContent, setConversationContent] = useState({ image: '', caption: '' });
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const handleImageClick = (image, caption) => {
    setConversationContent({ image, caption });
    if (window.innerWidth < 1000) {
      setIsExploreOpen(false);
    }
  };

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      {console.log(localStorage.authToken)}
      <div className='w-[90px] flex-shrink-0'>
        <SideBar onDiscoverClick={toggleExplore} />
      </div>

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
              <Explore onClick={handleImageClick} />
            </div>
          </div>
        </>
      )}
      <div className='flex-grow'>
        <Conversation 
          image={conversationContent.image}
          caption={conversationContent.caption}
          sound={props.sound}
        />
      </div>
    </div>
  );
};

export default Home;
