"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props extends React.ComponentProps<typeof motion.div> {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
}

export const AnimatedContainer = ({
  children,
  className,
  delay = 0.2,
  reverse,
  ...rest
}: Props) => {
  return (
    <motion.div
      className={cn("w-full h-full", className)}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: delay, duration: 0.4, ease: "easeInOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
