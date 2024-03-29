import { motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Notification from "../../helpers/Notification";

const Logout: React.FC = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const notify = Notification();

  const handleLogout = () => {
    // Reset auth status from true to false
    setAuth(false);

    const username = Cookies.get("username");
   
    // Show toast notification
    notify.displaySuccess(`${username} has been logged out!!`);

    setTimeout(() => {
       navigate("/auth/sign-in");
        window.location.reload();
    }, 1500);

      Cookies.remove("authToken");
      Cookies.remove("id");
      Cookies.remove("username");
      Cookies.remove("email")
      Cookies.remove("age")
      Cookies.remove("profilePicture")
      Cookies.remove("bio");

  };

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center bg-gray-100"
    >
      <div className="max-w-md w-full rounded-none-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Logout</h1>
        <p className="mb-8 text-center text-gray-600">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 dark:text-white font-semibold py-3 px-6 rounded-none-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Yes, Logout
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-none-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Logout;
