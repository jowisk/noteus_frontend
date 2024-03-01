import React from 'react'

const ValidationIndicator = ({ valid, text }) => {
    return (
      <div className='flex items-center'>
        {valid ? (
          <svg className='h-5 w-5 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
          </svg>
        ) : (
          <svg className='h-5 w-5 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        )}
        <span className='ml-1'>{text}</span>
      </div>
    );
  };
  
export default ValidationIndicator