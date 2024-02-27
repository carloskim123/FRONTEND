import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { Link } from "react-router-dom";
import { User } from "../../../utils/constants";

const Footer = () => {
  const [emailValue, setEmailValue] = useState("");

  const notify = () => {
    toast.info("Newsletter subscription under review");
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');

    if (!emailInput.checkValidity()) {
      // If the email is not valid, set a custom validation message
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.reportValidity();
    } else {
      notify();
    }
  };

  const autoFillEmail = (e) => {
    // Add logic to autofill the email
    setEmailValue(User.email)

  };

  return (
    <div>
      <ToastContainer theme="light" autoClose={3000} position="top-left" />

      <motion.footer
        className="bg-white py-4 text-black text-center mt-[10rem]"
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
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100089910465149" className="mx-2 hover:text-gray-500">
              Facebook
            </a>
            <a target="_blank" href="https://www.instagram.com/somedev99/" className="mx-2 hover:text-gray-500">
              Instagram
            </a>
            <Link to={"/auth/privacy-statement"} className="mx-2 hover:text-gray-500">
              Privacy Statement
            </Link>
          </div>
          <p className="text-sm mt-4 mb-2 md:mb-0 md:mr-2">Subscribe to our newsletter for updates.</p>

          <form onSubmit={handleSubscribe} className="flex flex-row mx-auto items-center justify-center">
            <input
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
              type="email"
              placeholder="Your email"
              className="p-2 mt-2 md:mt-0 mx-2 border rounded-none focus:outline-none focus:border-black text-black"
            />
            <div className="flex mt-2 md:mt-0">
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-none hover:bg-gray-800">
                Subscribe
              </button>
              <button onClick={autoFillEmail} className="bg-black text-white px-4 py-2 ml-2 rounded-none hover:bg-gray-800">
                Autofill Email and Subscribe
              </button>
            </div>
          </form>

          <p className="text-sm mt-4">© {new Date().getFullYear()} Vinly</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Footer;
