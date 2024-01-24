import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function EditSuccess() {
  const navigate = useNavigate();

  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 text-center font-semibold  text-black rounded-none-md shadow-md flex items-center justify-center"
    >
      <div>
        <h2 className="text-3xl mb-2">Edit Success!</h2>
        <p className="text-2xl text-green-900">Please refresh page for changes to be viewed.</p>
           <button
           onClick={() => navigate("/")}
                    className="bg-indigo-700 mt-4 dark:text-white py-2 px-4 rounded-none-md hover:bg-indigo-600 transition duration-300 w-full"
                  >
                    Back Home
                  </button>
                    <button
           onClick={() => window.location.reload()}
                    className="bg-indigo-700 mt-4 dark:text-white py-2 px-4 rounded-none-md hover:bg-indigo-600 transition duration-300 w-full"
                  >
                    Refresh
                  </button>
      </div>
    </motion.div>
  );
}
