import React, { useState } from 'react';
import SideBar from './components/SideBar';
import Explore from './components/Explore';
import Conversation from './components/Conversation';

const App = () => {
  const [conversationContent, setConversationContent] = useState({ image: '', caption: '' });
  const handleImageClick = (image, caption) => {
    setConversationContent({ image, caption });
  };
  return (
    <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] w-screen overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-[1fr_6fr] lg:grid-cols-[1fr_6fr] h-screen'>
        <SideBar />
        <Explore onClick={handleImageClick} />
      </div>
      <div className='h-screen'>
        <Conversation image={conversationContent.image} caption={conversationContent.caption} />
      </div>
    </div>
  );
};

export default App;
