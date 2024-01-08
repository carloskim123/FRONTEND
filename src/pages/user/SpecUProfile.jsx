import React, { useEffect, useState } from 'react';
import { GetUser } from '../../../services/user/userService';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpecUProfile = () => {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await GetUser(username, setUserData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="flex flex-col items-center min-h-screen  py-8">
      <motion.div
        className="max-w-md w-full bg-white overflow-hidden"

      >
        <div className="p-8">
          <div className="flex items-center justify-center">
            {userData && userData.profilePicture && (
              <img
                className="w-20 h-20 rounded-full"
                src={userData.profilePicture}
                alt="Profile"
              />
            )}
          </div>
          <div className="mt-4 text-center">
            {userData && (
              <>
                <h1 className="text-xl font-semibold">{userData.username}</h1>
                <p className="text-gray-600">{userData.email}</p>
              </>
            )}
          </div>
          <div className="mt-6">
            {userData && (
              <>
                <p className="text-gray-700">
                  <strong className='text-lg'>Bio: {userData.bio}</strong>
                </p>
                <p className="text-gray-700">
                  <strong>Age:</strong> {userData.age} years
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpecUProfile;
