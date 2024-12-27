import React, { useEffect, useState, useContext } from 'react';
import ExploreCard from './ExploreCard';
import ImageCard1 from './ImageCard1';
import ImageCard2 from './ImageCard2';
import ImageCard3 from './ImageCard3';
import AuthContext from '../context/AuthContext';

const Threads = ({ isOpen, onClose, onSelectThread }) => {
  const [threads, setThreads] = useState([]);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const token = getToken();
        const response = await fetch(
          `https://sarvamai-backend.onrender.com/api/v1/ai/get-all-chats?usertoken=${token}`
        );
        const data = await response.json();
        if (data.data) {
          setThreads(data.data);
        }
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    if (isOpen) {
      fetchThreads();
    }
  }, [isOpen, getToken]);

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden' onClick={onClose} />
      <div className={`
        fixed md:relative
        top-0 left-0 h-full
        w-full md:w-96
        bg-white
        z-50 md:z-auto
        flex-shrink-0
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className='p-4'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold'>Chat History</h2>
            <button 
              className='md:hidden p-2 text-gray-600'
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <div className='space-y-3'>
            {threads.map((thread) => (
              <div
                key={thread.id}
                className='p-4 bg-[#FAF3EA] rounded-lg cursor-pointer hover:bg-[#f1e4d2]'
                onClick={() => {
                  onSelectThread(thread.id);
                  onClose();
                }}
              >
                <p className='text-[#0D3C26] font-medium'>
                  {thread.description || 'Untitled Chat'}
                </p>
                <p className='text-sm text-gray-500'>
                  {new Date(thread.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Threads;