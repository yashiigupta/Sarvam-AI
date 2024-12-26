import React from 'react';

const RenderCard = ({ image, caption }) => {
  return (
    <div className="flex h-52 border border-[#c9b597] rounded-3xl bg-[#FAF3EA] p-3 mb-4">
      <div className="w-2/3 flex items-end justify-center text-3xl font-[550] text-[#0D3C26] tracking-tighter">
        {caption}&nbsp;...
      </div>
      <div className="w-1/3">
        <img 
          src={image} 
          alt="topic" 
          className="w-full h-full rounded-xl object-cover" 
        />
      </div>
    </div>
  );
};

export default RenderCard;