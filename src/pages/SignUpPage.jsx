import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/authContext'
import { registerUser } from '@/API';

const SignUpPage = () => {

    const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSignUp = async (e) => {
  e.preventDefault();
  try {
    const response = await registerUser(formData);
    console.log('Registration Response:', response);

    if (response.data) {
      const { token, userId } = response.data;
      console.log('Token:', token);
      console.log('User ID:', userId);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', JSON.stringify(userId.user_id));
      
      navigate('/platform');
      setAuthenticated(true);
    } else {
      console.error('Invalid response format:', response);
    }
  } catch (error) {
    console.error('Registration Error:', error);
  }
};


  return (
    <>
      <NavBar landing={false} />
      <div className='flex items-center justify-center flex-col py-16 bg-gray-100 h-screen'>
        <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
          <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
            <Medal className='h-6 w-6 mr-2' />
            No 1 note management
          </div>
          <h1 className='text-3xl md:text-4xl text-center text-neutral-800 mb-6'>Create an Account</h1>
          <form className='space-y-4' onSubmit={handleSignUp}>
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-600'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-600'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-fuchsia-600 to bg-pink-600 text-white px-4 p-2 rounded-md'
            >
              Register
            </Button>
          </form>
          <div className='text-sm text-neutral-400 mt-4 text-center'>
            Already have an account?{' '}
            <span className='text-fuchsia-600 cursor-pointer' onClick={() => navigate('/sign-in')}>
              Log in here
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
