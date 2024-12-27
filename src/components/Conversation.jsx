import React from 'react';
import ConversationBox from './ConversationBox';

const Conversation = ({ image, caption, messages, chatId, userToken }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <ConversationBox 
              key={index}
              message={msg.message}
              isAssistant={true}
              image={index === messages.length - 1 ? image : ''}
              caption={index === messages.length - 1 ? caption : ''}
              chatId={chatId}
              userToken={userToken}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            Connecting...
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
