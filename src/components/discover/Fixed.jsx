import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

export const NewPostButton = () => {
  const liquidAnimationControls = useAnimation();

  // useEffect(() => {
  //   const liquidEffect = async () => {
  //     await liquidAnimationControls.start({
  //       backgroundPosition: ['0% 50%', '100% 50%', '0% 50%', '10% 30%', '20% 40%'],
  //       backgroundColor: ['#00c6fb', '#005bea', '#ff6b6b', '#006bea', '#00b6fb'],
  //       transition: {
  //         duration: 4,
  //         repeat: Infinity,
  //         repeatType: 'reverse',
  //       },
  //     });
  //   };

  //   liquidEffect();
  // }, [liquidAnimationControls]);

  return (
    <div className="mobile-button">
      <Link to="/post/new">
        <motion.button
          // initial={{ background: 'linear-gradient(45deg, #00c6fb, #005bea, #ff6b6b)', backgroundSize: '200% 200%' }}
          // animate={liquidAnimationControls}
          whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.2)' }}
          whileTap={{ scale: 0.9 }}
          className='fixed bottom-10 right-10 text-white p-4 rounded-none-md overflow-hidden shadow-md z-50 bg-black'
        >
          New Post
        </motion.button>
      </Link>
    </div>
  );
};

export const RefreshButton = ({ handleRefresh }) => {
  const liquidAnimationControls = useAnimation();



  return (
    <div className="">
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.2)' }}
        whileTap={{ scale: 0.9 }}
        className='fixed bottom-10 sm:w-[ right-[170px] text-white p-4 rounded-none-md overflow-hidden shadow-md z-50 bg-black'
        onClick={handleRefresh}
      >
        Refresh 
      </motion.button>
    </div>
  );
};
