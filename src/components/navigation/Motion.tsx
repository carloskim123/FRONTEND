import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({ children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    });
  }, [controls]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      animate={controls}
      exit={{ opacity: 0, y: 130 }}
    >
        {children}

    </motion.div>
  );
};

export default MotionWrapper;
