"use client";
import { motion } from "framer-motion";

export const Prompt = () => (
  <span>
    <span className="text-term-green">robera@madrid</span>
    <span className="text-term-muted">:</span>
    <span className="text-term-cyan">~</span>
    <span className="text-term-muted">$</span>
  </span>
);

export const Section = ({
  id,
  command,
  children,
}: {
  id: string;
  command: string;
  children: React.ReactNode;
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="scroll-mt-20"
  >
    <h2 className="mb-6 text-sm sm:text-base">
      <Prompt /> <span className="text-term-fg">{command}</span>
    </h2>
    {children}
  </motion.section>
);
