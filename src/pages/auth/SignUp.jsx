import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MotionWrapper from '../../components/navigation/Motion';
import AuthContext from '../../context/AuthContext';
import { RegisterUser } from '../../../services/auth/authService'
import { ToastContainer, toast } from 'react-toastify';
import Notification from '../../helpers/Notification';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { setAccountCreated, accountCreated } = useContext(AuthContext)

  const navigate = useNavigate();
  const notify = Notification();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      age,
    };

    try {
      await RegisterUser(userData, setAccountCreated, setError, setSuccess);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  useEffect(() => {
    if (accountCreated) {
      // notify.displaySuccess(success);
      notify.displaySuccess("Account created successfully")
      setTimeout(() => {
        navigate("/auth/sign-in");
      }, 2000)
    }

    if (error) {
      notify.displayError(error);
      setError(null)
    }

    if (success) {
      setSuccess(null);
    }
  }, [error, success, navigate, accountCreated]);


  return (
    <MotionWrapper>
      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick />

      <div className="flex w-full justify-center min-h-screen bg-cover bg-center bg-blur-lg">
        <div className="bg-white p-8 w-[500px]">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-12" onSubmit={handleSignUp}>
            <div className="flex flex-col space-y-2">
              <div>
                <label className="block text-md font-semibold mb-4 mt-3">Username</label>
                <input
                  type="text"
                  className="w-full rounded-none focus:border-black focus:ring focus:ring-blue-200 px-4 py-2"

                  // className="w-full rounded-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-4 mt-3">Email</label>
                <input
                  type="email"
                  className="w-full rounded-none focus:border-black focus:ring focus:ring-blue-200 px-4 py-2"

                  // className="w-full rounded-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-4 mt-3">Password</label>
                <input
                  type="password"
                  className="w-full rounded-none focus:border-black focus:ring focus:ring-blue-200 px-4 py-2"

                  // className="w-full rounded-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-4 mt-3">Age</label>
                <input
                  type="number"
                  className="w-full rounded-none focus:border-black focus:ring focus:ring-blue-200 px-4 py-2"

                  // className="w-full rounded-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-2"
                  placeholder="Enter your age"
                  min={16}
                  max={80}
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
              </div>
              <div>

              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 dark:text-white rounded-none py-2 transition duration-300 hover:bg-gray-700"

            // className="w-full bg-blue-500 dark:text-white rounded-none py-2 transition duration-300 hover:bg-blue-600"
            >
              Sign Up
            </button>
            <div>
              Already have an account. <Link to={"/auth/sign-in"} className='text-black underline'>Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default SignUpPage;
