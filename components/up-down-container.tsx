"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function UpDown() {
  return (
    <motion.div
      style={{ cursor: 'pointer' }}
      transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
      initial={{ transform: "translateY(0px)", opacity: 0 }}
      animate={{ transform: "translateY(70px)", opacity: 1 }}
    >
      <ChevronDown className="size-10" />
    </motion.div>
  );
}
