import React, { useState } from "react";
import { motion, MotionConfig } from "motion/react";

const HambergurMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      <motion.button
        initial={false}
        onClick={toggleMobileMenu}
        className="relative rounded-full bg-white hover:bg-brand-50 transition-colors w-10 h-10 shrink-0 cursor-pointer"
        animate={isMobileMenuOpen ? "open" : "closed"}
      >
        <motion.span
          style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
          className="absolute h-[3px] w-[20px] bg-brand-950 rounded-full"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              top: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              top: ["50%", "50%", "35%"],
            },
          }}
        ></motion.span>
        <motion.span
          style={{ left: "calc(50% + 2px)", top: "52%", x: "-50%", y: "-50%" }}
          className="absolute h-[3px] w-4 bg-brand-950 rounded-full"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
              left: "50%",
              top: ["52%", "50%", "50%"],
              width: ["16px", "18px", "20px"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
              top: ["50%", "50%", "52%"],
              width: ["20px", "18px", "16px"],
            },
          }}
        ></motion.span>
      </motion.button>
    </MotionConfig>
  );
};

export default HambergurMenu;
