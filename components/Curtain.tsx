"use client";

import { motion } from "framer-motion";

export default function Curtain() {
  return (
    <motion.div
      className="curtain"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
      style={{ originY: 0 }}
      aria-hidden
    />
  );
}
