import React from 'react';
import MotionWrapper from '../../components/navigation/Motion';
import { useNavigate } from 'react-router-dom';

const DeleteAccountPage = () => {

    const navigate = useNavigate();

    const confirmDeletion = () => {
        navigate("/u/last-resort")
    }

    
    const cancelDeletion = () => {
        navigate(-1)
    }

  return (
    <MotionWrapper>
      <div className="flex items-center justify-center bg-white text-black">
        <div className="w-full max-w-xl p-4 sm:p-8">
          <h2 className="text-4xl font-bold mb-4 text-center">Confirm Account Deletion</h2>
          <div className="bg-white p-6 rounded-none-md shadow-md">
            <p className="text-lg mb-4">
              Are you sure you want to delete your account? This action cannot be undone, and it will result in the following consequences:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Loss of all posts and modifications associated with your account.</li>
              <li className="mb-2">Inability to access your account in the future.</li>
              <li className="mb-2">Termination of any active subscriptions or services associated with your account.</li>
              <li className="mb-2">Destruction of all site data linked to your account.</li>
            </ul>
            <p className="text-red-500 font-semibold">
              Please consider the consequences carefully before proceeding.
            </p>
            <div className="flex gap-5 mt-6">
              <button onClick={confirmDeletion} className="bg-red-700 dark:text-white py-2 px-4 rounded-none-md hover:bg-red-600 transition duration-300 w-full">
                Confirm Deletion
              </button>
              <button onClick={cancelDeletion} className="bg-gray-500 dark:text-white py-2 px-4 rounded-none-md hover:bg-gray-400 transition duration-300 w-full">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default DeleteAccountPage;
