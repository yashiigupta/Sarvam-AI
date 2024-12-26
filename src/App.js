import React from 'react';
import SideBar from './components/SideBar';
import Explore from './components/Explore';
import Conversation from './components/Conversation';

const App = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] w-screen overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] h-full'>
        <SideBar />
        <Explore />
      </div>
      <div className='h-full'>
        <Conversation />
      </div>
    </div>
  );
};

export default App;
