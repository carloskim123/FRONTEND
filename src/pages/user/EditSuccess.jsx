import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function EditSuccess() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/u/profile');
    window.location.reload();
  }, 1500);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 text-center font-semibold text-black rounded-none-md shadow-md flex items-center justify-center"
    >
      <div>
        <h2 className="text-3xl mb-2">Edit Success!</h2>
        <p className="text-2xl text-green-900">
          Your profile has been updated on the server. Changes will be live shortly after a quick refresh!
        </p>
      </div>
    </motion.div>
  );
}
