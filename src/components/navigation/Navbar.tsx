import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Routes, User } from "../../../utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import SiteLogo from "../../../public/vite.svg";
import AuthContext from "../../context/AuthContext";
import Avatar from "./Avatar";

type RouteType = {
  path: string;
  pathname: string;
};

type NavLinkProps = {
  route: RouteType;
  closeMenu: (event: React.MouseEvent<HTMLElement>) => void;
};

const NavLink: React.FC<NavLinkProps> = ({ route, closeMenu }) => {
  const location = useLocation();
  const isActive = location.pathname === route.path;

  return (
    <motion.li
      onClick={closeMenu}
      whileHover={{ cursor: "pointer" }}
      className={`text-lg transition duration-300 cursor-pointer pt-[15px] ${isActive ? "text-gray-900 underline font-bold" : "font-bold text-gray-600"
        }`}
    >
      <Link to={route.path}>{route.pathname}</Link>
    </motion.li>
  );
};


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { auth } = useContext(AuthContext);

  const protectedRoutes = ["/auth/sign-in", "/auth/sign-up"];

  const filteredRoutes = Routes.filter((route) => {
    if (auth) {
      // Display all routes for authenticated users
      return !protectedRoutes.includes(route.path) || !auth
    } else {
      // Display only 'Sign In' and 'Register' routes for unauthenticated users
      return route.path === '/auth/sign-in' || route.path === '/auth/sign-up';
    }
  });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 770) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <nav ref={navRef} className=" backdrop-filter backdrop-blur-lg bg-[rgba(255,255,255,0.9)] p-4 ">
      <div className="max-w-full flex">

        <Link to={"/"} className="text-xl font-semibold flex gap-4 mr-auto ">
          <img src={SiteLogo} style={{ width: "30px" }} alt="Logo" />
        </Link>
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-2 px-4"
            >
              {filteredRoutes.map((route: RouteType) => (
                <div key={route.path}>
                  <NavLink closeMenu={closeMenu} key={route.path} route={route} />
                </div>
              ))}
              {(auth && User.profilePicture && User.username) ? <div className="flex gap-1 mt-2">
                {/* Styled username */}
                <Avatar />
                <Link to={'/u/profile'} className="text-gray-600 font-bold mx-2 mt-3">{`Hey, ${User.username}`}</Link>
              </div> : <div></div>}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {filteredRoutes.map((route: RouteType) => (
            <div key={route.path}>
              <NavLink closeMenu={closeMenu} key={route.path} route={route} />
            </div>
          ))}
          {(auth && User.profilePicture && User.username) && (
            <div className="flex gap-1 mt-2">
              <Avatar />

              <Link to={'/u/profile'} className="text-gray-600 font-bold mx-2 mt-3">{`Hey, ${User.username}`}</Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );

};

export default Navbar;
