import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ExploreCard from './ExploreCard';
import ImageCard1 from './ImageCard1';
import ImageCard2 from './ImageCard2';
import ImageCard3 from './ImageCard3';

const Explore = ({ onClick }) => {
  const { username } = useContext(AuthContext);
  return (
    <div className='bg-[#F7EFE3] border border-[#e1d3bd] p-8 h-full w-full overflow-y-auto flex flex-col items-start scrollbar-hide'>
      <h1 className='text-[#0D3C26] tracking-tight font-medium text-3xl mb-6 '>Good afternoon, <span className='italic'>{username}</span></h1>
      <div className="mb-5 h-full w-full">
        <ExploreCard/>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <ImageCard1 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2Fefk36amiX1R6DkTVzsZ3V.png&w=3840&q=100" caption="Therapy - understanding the different types" onClick={onClick}/>
        <ImageCard1 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2FULTzJLqGDq4xHQkJ1GRHD.png&w=640&q=100" caption="Tap into your creative side" onClick={onClick}/>
      </div>
      <ImageCard2 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2Fastrology.png&w=640&q=100" caption="Let Pi guess your horoscope" onClick={onClick}/>
      <ImageCard3 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2Fx5JMfDfyNoAaMx3rJRWXX.png&w=1200&q=100" caption="Sympathy vs. empathy" onClick={onClick}/>
      <ImageCard2 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2FmFvsfnbxAi4pnAGJyZxQh.png&w=3840&q=100" caption="Do you have a type A or type B personality?" onClick={onClick}/>
      <div className='flex gap-4'>
        <ImageCard1 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2FTUDM8vZhaaCgMJ6Y5j4Zg.png&w=640&q=100" caption="Quiz: what's my love language?" onClick={onClick}/>
        <ImageCard1 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2FPeJMea8GAZ7fBzRkf9rGT.png&w=640&q=100" caption="Expand your vocabulary" onClick={onClick}/>
      </div>
      <ImageCard3 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2FRMD9gJvKM6jLWnevbpUhq.png&w=1200&q=100" caption="Is it okay to be disliked?" onClick={onClick}/>
      <div className='flex gap-4'>
        <ImageCard1 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2Fglasses.webp&w=640&q=100" caption="You CAN stop procrastinating" onClick={onClick}/>
        <ImageCard1 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2Femployees.png&w=640&q=100" caption="Top tips for giving difficult feedback" onClick={onClick}/>
      </div>
      <ImageCard2 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2FEMALDx8RczS5sp85EV7kg.png&w=640&q=100" caption="Let Pi plan your next mini break" onClick={onClick}/>
      <ImageCard3 image="https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fdiscover%2Fimages%2Ff5HdUHV4MxcFuRfDzJF1z.png&w=1200&q=100" caption="Manifest your deepest desires" onClick={onClick}/>
    </div>
  )
}

export default Explore;