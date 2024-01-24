import React from "react";
import MotionWrapper from '../../components/navigation/Motion';
import { DelAccount } from "../../../services/user/userService";
import { useNavigate } from 'react-router-dom';

const LastResort = () => {
  const navigate = useNavigate();

  const handleProceed = async () => {
    try {
      // Call the DelAccount function to delete the account
      await DelAccount();

      
    } catch (error) {
      console.error("Error during account deletion:", error);
      // Handle error as needed
    }
  };

  return (
    <MotionWrapper>
      <div className="flex items-center justify-center bg-white text-black">
        <div className="w-full max-w-screen-md p-4 sm:p-8">
          <h2 className="text-4xl font-bold mb-4 text-center text-red-700">Last Resort: Irreversible Deletion</h2>
          <div className="bg-white p-6 rounded-none-md shadow-md">
            <p className="text-lg mb-4">
              You have reached the point of no return. This is the last bastion before the annihilation of your account. Once you proceed, there is no turning back.
            </p>
            <p className="mb-4">
              Here lies your final opportunity to reconsider. Are you absolutely certain that you want to proceed with the irreversible deletion of your account?
            </p>
            <div className="flex gap-5 mt-6">
              <button
                className="bg-red-700 dark:text-white py-2 px-4 rounded-none-md hover:bg-red-600 transition duration-300 w-full"
                onClick={handleProceed}
              >
                Proceed with Final Deletion
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-green-700 dark:text-white py-2 px-4 rounded-none-md hover:bg-green-800 transition duration-300 w-full"
              >
                Retreat and Preserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default LastResort;
