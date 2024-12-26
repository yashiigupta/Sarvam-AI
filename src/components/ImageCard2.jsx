import React from 'react';

const ImageCard2 = ({ image, caption }) => {
  return (
    <div className="flex w-[21rem] h-40 border border-white rounded-3xl bg-[#FAF3EA] p-3 mb-4">
      <div className="w-1/2 flex items-end justify-center text-sm sm:text-base md:text-lg font-[550] text-[#0D3C26] leading-tight">
        {caption}
      </div>
      <div className="w-1/2">
        <img 
          src={image} 
          alt="topic" 
          className="w-full h-full rounded-xl object-cover" 
        />
      </div>
    </div>
  );
};

export default ImageCard2;
