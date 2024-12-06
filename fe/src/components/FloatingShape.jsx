import React from "react";
import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-20 blur-xl`}
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay: delay,
      }}
      style={{ top, left }}
      aria-hidden="true"
      />


  );
};

export default FloatingShape;
