"use client";
import { MouseEvent, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Project } from "@/types";

const TiltCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), {
    stiffness: 250,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), {
    stiffness: 250,
    damping: 20,
  });

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: 0.06 * index, ease: "easeOut" }}
      style={{ perspective: 800 }}
    >
      <motion.a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div
          ref={ref}
          className="h-full rounded-lg border border-term-border bg-term-panel hover:border-term-accent hover:shadow-glow transition-colors flex flex-col"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-term-bgAlt border-b border-term-border rounded-t-lg">
            <span className="text-term-muted text-xs">📄</span>
            <span className="text-xs text-term-cyan truncate">
              {project.file}
            </span>
            <span className="ml-auto text-xs text-term-muted">↗</span>
          </div>
          <div className="p-4 flex flex-col gap-3 grow text-xs sm:text-sm">
            <p className="text-term-fg leading-relaxed">
              {project.description}
            </p>
            <p className="text-term-muted italic">
              <span className="text-term-green">{"//"} why:</span>{" "}
              {project.why}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] sm:text-xs px-2 py-0.5 rounded border border-term-border text-term-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export const Projects = ({ projects }: { projects: Project[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {projects.map((p, i) => (
      <TiltCard key={p.name} project={p} index={i} />
    ))}
  </div>
);
