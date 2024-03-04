import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MotionWrapper from '../../components/navigation/Motion';
import { LoginUser } from '../../../services/auth/authService';
import AuthContext from '../../context/AuthContext';
import Notification from '../../helpers/Notification';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const notify = Notification();

  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      setLoggingIn(true);
      await LoginUser(userData, setAuth, setError, setSuccess);
    } catch (error) {
      setError(error.message || 'An error occurred during sign-in');
    } finally {
      setLoggingIn(false);
    }
  };

  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        navigate('/auth/login-success');
      }, 1000);
    }

    if (error) {
      notify.displayError(error);
      setError(null);
    }

    if (success) {
      notify.displaySuccess(success);
      setSuccess(null);
    }
  }, [auth, error, success, navigate]);

  return (
    <MotionWrapper>

      <div className="flex w-full justify-center min-h-screen bg-cover bg-center bg-blur-lg mt-5">



        <div className=" pt-5 w-[30%] autofill">
          {loggingIn ? (
            <h2 className="text-3xl font-bold mb-6 text-center">Logging In...</h2>
          ) : (
            <h2 className="text-3xl font-bold mb-6 text-center">Sign In to Vinly</h2>
          )}

          <form className="space-y-12 " onSubmit={handleSignIn}>
            <div className="flex flex-col space-y-7 ">
              <div>
                <label className="block text-md font-semibold mb-4 mt-3 ">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='username'
                  // className="w-full rounded-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"

                  className="w-full rounded-none focus:border-black focus:ring focus:ring-blue-200 px-4 py-2"
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
                  className="w-full rounded-none focus:border-black focus:ring focus:ring-blue-200 px-4 py-2"
                  // className="w-full rounded-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 dark:text-white rounded-none py-2 transition duration-300 hover:bg-gray-700"
            >
              Sign In
            </button>
            <div>Don't have an account: <Link to={"/auth/sign-up"} className='text-black underline'>Create One</Link></div>
          </form>
        </div>


      </div>
    </MotionWrapper>
  );
};

export default SignInPage;
