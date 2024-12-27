import React from 'react';
import ExploreCard from './ExploreCard';
import ImageCard1 from './ImageCard1';
import ImageCard2 from './ImageCard2';
import ImageCard3 from './ImageCard3';

const Threads = ({ onClick }) => {
  return (
    <div className='bg-[#F7EFE3] border border-[#e1d3bd] p-8 h-full w-full overflow-y-auto flex flex-col items-start scrollbar-hide'>
      <div className='flex justify-between w-full items-center mb-5'>
        <div className='text-black text-[34px] font-medium tracking-tighter'>Threads</div>
        <button className='flex justify-center items-center rounded-md bg-[#f1e4d2] py-1 px-2 text-sm font-sans text-[#0D3C26] font-medium'>
          <p>New thread</p>
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4"><g id="Iconography/16px" clip-path="url(#clip0_9738_8426)"><path id="Exclude" fill-rule="evenodd" clip-rule="evenodd" d="M3.55544 1.34824C4.87103 0.469192 6.41775 0 8 0C10.1205 0.00406613 12.153 0.848227 13.6524 2.34764C15.1518 3.84705 15.9959 5.87952 16 8C16 9.58225 15.5308 11.129 14.6518 12.4446C13.7727 13.7602 12.5233 14.7855 11.0615 15.391C9.59966 15.9965 7.99113 16.155 6.43928 15.8463C4.88743 15.5376 3.46197 14.7757 2.34315 13.6569C1.22433 12.538 0.462403 11.1126 0.153721 9.56072C-0.15496 8.00887 0.00346624 6.40034 0.608967 4.93853C1.21447 3.47672 2.23985 2.22729 3.55544 1.34824ZM3.00002 8C3.00002 7.44772 3.44773 7 4.00002 7H7.00002V4C7.00002 3.44772 7.44774 3 8.00002 3C8.5523 3 9.00002 3.44772 9.00002 4V7H12C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9H9.00002V12C9.00002 12.5523 8.5523 13 8.00002 13C7.44773 13 7.00002 12.5523 7.00002 12V9H4.00002C3.44773 9 3.00002 8.55229 3.00002 8Z" fill="currentColor"></path></g><defs><clipPath id="clip0_9738_8426"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
        </button>
      </div>
      <div className='flex w-full flex-col bg-[#f1e4d2] h-[74px] rounded-xl justify-center items-start p-3 mb-3'>
        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12.4298V7.67716C15 7.21942 14.9996 6.99042 14.9427 6.77743C14.8924 6.58867 14.8097 6.41004 14.6977 6.24863C14.5715 6.06648 14.3959 5.91543 14.044 5.61401L9.84399 2.01608C9.19071 1.45644 8.86407 1.17677 8.49646 1.07034C8.17254 0.976554 7.82728 0.976554 7.50337 1.07034C7.13604 1.17669 6.80987 1.4561 6.15757 2.01489L1.95618 5.61401C1.60431 5.91543 1.42879 6.06648 1.30249 6.24863C1.19057 6.41004 1.10723 6.58867 1.05685 6.77743C1 6.99043 1 7.21942 1 7.67716V12.4298C1 13.2281 1 13.6271 1.13321 13.9419C1.31083 14.3617 1.65128 14.6957 2.08008 14.8696C2.40168 15 2.80938 15 3.62477 15C4.44017 15 4.84832 15 5.16992 14.8696C5.59872 14.6957 5.93909 14.3618 6.1167 13.942C6.24991 13.6272 6.25 13.228 6.25 12.4297V11.5731C6.25 10.6268 7.0335 9.85977 8 9.85977C8.9665 9.85977 9.75 10.6268 9.75 11.5731V12.4297C9.75 13.228 9.75 13.6272 9.88321 13.942C10.0608 14.3618 10.4013 14.6957 10.8301 14.8696C11.1517 15 11.5594 15 12.3748 15C13.1902 15 13.5983 15 13.9199 14.8696C14.3487 14.6957 14.6891 14.3617 14.8667 13.9419C14.9999 13.6271 15 13.2281 15 12.4298Z" stroke="#6B6255" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <p className='text-lg text-[#0D3C26]'>Here's the code that should make t...</p>
      </div>
      <div className='flex w-full flex-col bg-[#E3D4BF] h-[74px] rounded-xl justify-center items-start p-3 mb-3'>
        <p className='font-sans'>Anxiety Management</p>
        <p className='text-lg text-[#0D3C26]'>Okay, cool! Glad you're taking the ...</p>
      </div>
      <div className='flex w-full flex-col bg-[#f1e4d2] h-[74px] rounded-xl justify-center items-start p-3'>
        <p className='font-sans'>Google Interview Tips</p>
        <p className='text-lg text-[#0D3C26]'>Ah, the Google interview is infam...</p>
      </div>
    </div>
  )
}

export default Threads;