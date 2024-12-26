import React from 'react';
const ImageCard1 = ({ image, caption, onClick }) => {
  const handleClick = () => {
    onClick(image, caption);
  };
  return (
    <div className="relative w-40 h-40 border border-white rounded-3xl mb-4 hover:w-[9.7rem] hover:h-[9.7rem] cursor-pointer" onClick={handleClick}>
      <img 
        src={image} 
        alt="topic" 
        className="w-full h-full rounded-3xl object-cover blur-[0.2px]" 
      />
      <p className="leading-snug absolute bottom-0 left-0 p-2 text-sm sm:text-base font-semibold text-white bg-black bg-opacity-10 rounded-b-3xl">
        {caption}
      </p>
    </div>
  );
};

export default ImageCard1;
