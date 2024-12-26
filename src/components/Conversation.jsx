import React from 'react';
import ConvoHeader from './ConvoHeader';
import ConvoFooter from './ConvoFooter';
import ConversationBox from './ConversationBox';

const Conversation = () => {
  return (
    <div className='bg-[#FAF3EA] h-screen p-8'>
      <ConvoHeader />
      <ConversationBox />
      <ConvoFooter />
    </div>
  )
}

export default Conversation;
