import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MotionWrapper from '../../components/navigation/Motion';
import { LoginUser } from '../../../services/auth/authService';
import AuthContext from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const userData = {
      email,
      password,
    };

    try {
      await LoginUser(userData, setAuth, setError, setSuccess);
    } catch (error) {
      // Handle login error: Display error message to the user
      setError(error.message || 'An error occurred during sign-in');
    }
  };



  useEffect(() => {
    
    if (auth) {
      setTimeout(() => {
        navigate("/");
      },1000)
    }

    if(error) {
      toast.error(error);
      setError(null)
    }

    if (success) {
      toast.success(success);
      setSuccess(null);
    }
  }, [auth, error,success, navigate]);

  return (
    <MotionWrapper>
      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick/>

      <div className="flex w-full justify-center min-h-screen bg-cover bg-center bg-blur">
        <div className="rounded-lg p-8 autofill w-[500px]">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
       
          <form className="space-y-12" onSubmit={handleSignIn}>
            <div className="flex flex-col space-y-2">
              <div>
                <label className="block text-md font-semibold mb-4 mt-3">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='username'
                  className="w-full rounded focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-4 mt-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded py-2 transition duration-300 hover:bg-blue-600"
            >
              Sign In
            </button>
            <div>Don't have an account: <Link to={"/auth/sign-up"} className='text-violet-600'>Create One</Link></div>
          </form>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default SignInPage;
