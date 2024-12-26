import React from 'react';

const ImageCard3 = ({ image, caption }) => {
  return (
    <div className="relative w-[21rem] h-80 border border-white rounded-3xl mb-4">
      <img 
        src={image} 
        alt="topic" 
        className="w-full h-full rounded-3xl object-cover" 
      />
      <p className="leading-tight absolute bottom-0 left-0 p-3 text-2xl sm:text-3xl md:text-4xl font-[550] text-white tracking-tight bg-black bg-opacity-30 rounded-b-3xl">
        {caption}
      </p>
    </div>
  );
};

export default ImageCard3;
