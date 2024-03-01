import { useNavigate } from 'react-router-dom'
import Logo from '@/components/Logo'
import { Button } from './ui/button'
import { ClipboardCheck, Lightbulb, Salad } from 'lucide-react'
import { useAuth } from '@/authContext'; // Import the useAuth hook
import Note from './Note'
import { useState } from 'react'

const NavBar = ({ landing, platform, visibleHandler, archivedOpenHandler, handleFilterChange, handleCategoryClick, filterCategory }) => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useAuth(); // Use the useAuth hook
  const isSelected = (category) => {
    return filterCategory.includes(category);
  }

  const handleLogout = () => {
    // Perform logout actions, such as revoking authentication
    setAuthenticated(false);
    // You may also want to clear any stored tokens or user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redirect the user to the landing page or any other desired page
    navigate('/');
  };
  
  return (
    <div className='fixed z-5 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo
          platform={platform}
          visibleHandler={visibleHandler}
          archivedOpenHandler={archivedOpenHandler}
        />
        
        {landing &&
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size='sm' variant='outline' onClick={() => navigate('/sign-in')}>
            Login
          </Button>
          <Button size='sm' onClick={() => navigate('/sign-up')}>
            Get Noteus for free
          </Button>
        </div>
        }
        {platform && (
          <div className='px-2 h-10 flex items-center justify-between'>
            <div className='flex w-[300px] mr-4 border border-1 rounded-md px-1 h-10 justify-evenly items-center'>
              <div
                className={`flex ${isSelected('Tasks') ? 'text-red-600' : 'hover:text-red-600'} transition cursor-pointer`}
                onClick={() => handleCategoryClick('Tasks')}
              >
                <ClipboardCheck />
                <p className='ml-2'>Tasks</p>
              </div>
              <div
                className={`flex ${isSelected('Ideas') ? 'text-yellow-400' : 'hover:text-yellow-400'} transition cursor-pointer`}
                onClick={() => handleCategoryClick('Ideas')}
              >
                <Lightbulb />
                <p className='ml-2'>Ideas</p>
              </div>
              <div
                className={`flex ${isSelected('Health') ? 'text-green-600' : 'hover:text-green-600'} transition cursor-pointer`}
                onClick={() => handleCategoryClick('Health')}
              >
                <Salad />
                <p className='ml-2'>Health</p>
              </div>
            </div>
            <input
              onChange={(e) => handleFilterChange(e.target.value)}
              placeholder='Search for notes, tags...'
              className='border border-1 rounded-md px-1 h-10'
            />
            {authenticated && (
              <Button size='sm' onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default NavBar;