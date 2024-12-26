import React from 'react';
import SideBar from './SideBar';
import Explore from './Explore';
import Conversation from './Conversation';

const Home = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] h-screen w-screen overflow-hidden'>
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

export default Home;
