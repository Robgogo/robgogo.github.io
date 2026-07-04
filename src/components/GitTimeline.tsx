"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CareerEntry } from "@/types";
import { dateRange } from "@/utils/dateUtils";

const Refs = ({ entry }: { entry: CareerEntry }) => (
  <>
    {(entry.head || entry.tag) && (
      <span className="text-term-muted">
        (
        {entry.head && (
          <>
            <span className="text-term-cyan">HEAD -&gt; </span>
            <span className="text-term-green">main</span>
            {entry.tag && ", "}
          </>
        )}
        {entry.tag && <span className="text-term-yellow">tag: {entry.tag}</span>}
        ){" "}
      </span>
    )}
  </>
);

const Commit = ({ entry, index }: { entry: CareerEntry; index: number }) => {
  const [open, setOpen] = useState(entry.head === true);

  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: 0.05 * index, ease: "easeOut" }}
      className="relative pl-8 sm:pl-10 pb-8 last:pb-0"
    >
      {/* graph rail */}
      <span
        aria-hidden
        className="absolute left-[7px] sm:left-[9px] top-5 bottom-0 w-px bg-term-border group-last:hidden"
      />
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 + 0.05 * index }}
        className={`absolute left-0 sm:left-0.5 top-1.5 w-4 h-4 rounded-full border-2 ${
          entry.head
            ? "bg-term-accent border-term-accent shadow-glow"
            : "bg-term-panel border-term-muted"
        }`}
      />

      <button
        onClick={() => setOpen((o) => !o)}
        className="text-left w-full group"
        aria-expanded={open}
      >
        <div className="text-xs sm:text-sm leading-relaxed">
          <span className="text-term-orange">{entry.hash}</span>{" "}
          <Refs entry={entry} />
          <span className="text-term-fg font-medium group-hover:text-term-accent transition-colors">
            {entry.message}
          </span>
        </div>
        <div className="text-xs text-term-muted mt-1">
          {entry.role} · {entry.company} · {entry.location} ·{" "}
          {dateRange(entry.from, entry.to)}
          <span className="ml-2 text-term-accent">
            [{open ? "-" : "+"}]
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden mt-2 space-y-1.5 text-xs sm:text-sm text-term-muted"
          >
            {entry.achievements.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-term-green shrink-0">+</span>
                <span>{a}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export const GitTimeline = ({ entries }: { entries: CareerEntry[] }) => (
  <div className="rounded-lg border border-term-border bg-term-panel shadow-window p-4 sm:p-8">
    <ol>
      {entries.map((entry, i) => (
        <Commit key={entry.hash} entry={entry} index={i} />
      ))}
    </ol>
    <div className="pl-8 sm:pl-10 pt-2 text-xs text-term-muted">
      (END) — click a commit to expand it
    </div>
  </div>
);
