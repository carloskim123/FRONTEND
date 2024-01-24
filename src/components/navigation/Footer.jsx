import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      className=" bg-white py-4 text-black text-center mt-[10rem]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto justify-start sticky bottom-0">
        <p className="text-3xl font-semibold">Connect with Us</p>
        <div className="flex justify-center mt-2">
          <a target="_blank" href="https://twitter.com/KimKimkirui7" className="mx-2 hover:text-gray-500">
            Twitter
          </a>
          <a  target="_blank" href="https://www.facebook.com/profile.php?id=100089910465149" className="mx-2 hover:text-gray-500">
            Facebook
          </a>
          <a target="_blank" href="https://www.instagram.com/somedev99/" className="mx-2 hover:text-gray-500">
            Instagram
          </a>
          <Link to={"/auth/privacy-statement"} className="mx-2 hover:text-gray-500">
            Privacy Statement
          </Link>
        </div>
        <p className="text-sm mt-4">Subscribe to our newsletter for updates.</p>
        <input
          type="email"
          placeholder="Your email"
          className="p-2 mt-2 mx-2 border rounded-none focus:outline-none focus:border-black text-black"
        />
        <button className="bg-black text-white px-4 py-2 mt-2 rounded-none hover:bg-gray-800">
          Subscribe
        </button>
        <p className="text-sm mt-4">© {new Date().getFullYear()} Vinly</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
