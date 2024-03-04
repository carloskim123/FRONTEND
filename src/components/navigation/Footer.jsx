import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User } from "../../../utils/constants";
import Notification from "../../helpers/Notification";

const Footer = () => {
  const [emailValue, setEmailValue] = useState("");
  const toast = Notification();

  const notify = () => {
    toast.displaySuccess("Newsletter subscription under review");
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

  const footerLinks = [
    {
      navigationType: 'external',
      pathname: 'Facebook',
      path: 'https://www.facebook.com/profile.php?id=100089910465149'
    },
    {
      navigationType: 'external',
      pathname: 'Twitter',
      path: 'https://twitter.com/KimKimkirui79'
    },
    {
      navigationType: 'external',
      pathname: 'Instagram',
      path: 'https://www.instagram.com/somedev99/'
    },
    {
      navigationType: 'internal',
      pathname: 'Privacy Policy',
      path: '/auth/privacy-policy'
    },
    {
      navigationType: 'internal',
      pathname: 'Updates',
      path: '/updates'
    },
  ];

  return (
    <div>

      <motion.footer
        className="bg-white py-4 text-black text-center mt-[10rem]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto justify-start sticky bottom-0">

          <p className="text-3xl font-semibold">Connect with Us</p>
          <div className="flex justify-center mt-2">
            {footerLinks.map((link, index) => (
              link.navigationType === 'internal' ? (
                <Link className="px-2 hover:underline" key={index} to={link.path}>
                  {link.pathname}
                </Link>
              ) : link.navigationType === 'external' ? (
                <a className="px-2 hover:underline" key={index} href={link.path} target="_blank" rel="noopener noreferrer">
                  {link.pathname}
                </a>
              ) : null
            ))}
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
