import React from 'react';
import ConvoHeader from './ConvoHeader';
import ConvoFooter from './ConvoFooter';
import ConversationBox from './ConversationBox';

const Conversation = ({ image, caption }) => {
  return (
    <div className='bg-[#FAF3EA] h-full p-8'>
      <ConvoHeader />
      <ConversationBox image = { image} caption={caption}/>
      <ConvoFooter />
    </div>
  )
}

export default Conversation;
