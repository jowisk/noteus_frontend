import { useNavigate } from 'react-router-dom'
import React from 'react'
import Logosvg from '@/assets/logo.svg'
import { Archive } from 'lucide-react'
import { Button } from './ui/button'
const Logo = ({platform, visibleHandler, archivedOpenHandler}) => {

  const navigate = useNavigate()

  return (
    <div className='items-center gap-x-2 hidden md:flex'>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex' onClick={()=>navigate('/')}>
        <img src={Logosvg} alt="Logo" className='w-[30px] h-[30px]' />

        <p className='text-lg text-neutral-700 pt-1 font-calRegular'>
            Noteus
        </p>
      </div>
        {platform && 
          <div className='flex items-center justify-between w-[150px]'>
            <Button size='sm' variant='primary' onClick={()=>visibleHandler()}>
              + New note
            </Button>
            <div className='pl-5 flex hover:text-sky-700 transition cursor-pointer' onClick={archivedOpenHandler}>  
              <Archive />
              <p className='ml-2'>Archived</p>
            </div>
            
          </div>}
    </div>
  )
}

export default Logo