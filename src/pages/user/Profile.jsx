import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import MotionWrapper from '../../components/navigation/Motion';
import { User } from '../../../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"
import { UpdateUser } from '../../../services/user/userService';

const Profile = ({
  email = User.email || '',
  username = User.username || '',
  age = User.age || 0,
  lastSignIn = new Date(),
  profilePicture = User.profilePicture,
  bio = User.bio

}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    email,
    username,
    age,
    bio,
    profilePicture
  });

  const controls = useAnimation();
  const y = useMotionValue(0);

  const handleEditClick = () => {
    setIsEditing(true);
    controls.start({ y: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await UpdateUser(editedInfo);

    setIsEditing(false);
    controls.start({ y: '100vh' });

    toast.info(`${User.username}'s info has been updated`);

    setTimeout(() => {
      window.location.reload();
    },2000)
  };


  const dragConstraints = { top: 0, bottom: 0 };

  const opacity = useTransform(y, [-100, 0], [0, 1]);
  const translateY = useTransform(y, [0, 100], ['0%', '100%']);

  return (
    <MotionWrapper>
      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick/>

      <div className="flex flex-col items-center min-h-screen">
        <motion.div
          className="max-w-md w-full bg-white overflow-hidden"
          style={{ y }}
          drag="y"
          dragConstraints={dragConstraints}
        >
          <div className="p-8">
            <div className="flex items-center justify-center">
              <img
                className="w-20 h-20 rounded-full"
                src={`${User.profilePicture}`}
                alt="Profile"
              />
            </div>
            <div className="mt-4 text-center">
              <h1 className="text-xl font-semibold">{username}</h1>
              <p className="text-gray-600">{email}</p>
            </div>
            
            <div className="mt-6 ">
             <p className="text-gray-700 " >
                <strong className='text-lg'>Bio: {bio}</strong> 
              </p>
              <p className="text-gray-700">
                <strong>Age:</strong> {age} years
              </p>
             
              <p className="text-gray-700">
                <strong>Last Sign-in:</strong> {lastSignIn?.toDateString()}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                onClick={handleEditClick}
              >
                Edit Info (endabled)
              </button>
            </div>
          </div>
        </motion.div>

        {isEditing && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white p-6 max-w-lg w-full rounded-t-lg shadow-xl"
            initial={{ y: '100vh' }}
            animate={controls}
            style={{ opacity, y: translateY }}
            drag="y"
            dragConstraints={dragConstraints}
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">Edit Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedInfo.email}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                  <div className="mb-4">
                  <label htmlFor="bio" className="block text-gray-700">
                    Bio:
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={editedInfo.bio}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editedInfo.username}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="age" className="block text-gray-700">
                    Age:
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={editedInfo.age}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>

            
                <div className="mb-4">
                  <label htmlFor="age" className="block text-gray-700">
                    Profile Picture:
                  </label>
                  <input
                    type="text"
                    id="profilePicture"
                    name="profilePicture"
                    value={editedInfo.profilePicture}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};

export default Profile;
