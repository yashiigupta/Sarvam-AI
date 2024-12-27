import React from 'react';
import ConvoHeader from './ConvoHeader';
import ConvoFooter from './ConvoFooter';
import ConversationBox from './ConversationBox';

const Conversation = ({ image, caption, sound }) => {
  return (
    <div className='bg-[#FAF3EA] h-full w-full p-8'>
      <ConvoHeader sound={sound} />
      <ConversationBox image = { image} caption={caption}/>
      <ConvoFooter />
    </div>
  )
}

export default Conversation;
