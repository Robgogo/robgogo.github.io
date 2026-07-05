"use client";
import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MatrixRain } from "./MatrixRain";
import { Prompt } from "./Section";
import { profile, links } from "@/constants/portfolioEntries";

const BANNER = String.raw`
 ____   ___  ____  _____ ____      _
|  _ \ / _ \| __ )| ____|  _ \    / \
| |_) | | | |  _ \|  _| | |_) |  / _ \
|  _ <| |_| | |_) | |___|  _ <  / ___ \
|_| \_\\___/|____/|_____|_| \_\/_/   \_\
`.replace(/^\n/, "");

type Line = { id: number; node: ReactNode };

const SECTIONS = ["experience", "projects", "skills", "about", "contact"];
const THEMES = ["dracula", "gruvbox", "solarized"];
const COMPLETIONS = [
  "help",
  "whoami",
  "ls",
  "cat skills.json",
  "git log",
  "projects",
  "experience",
  "skills",
  "about",
  "education",
  "languages",
  "contact",
  "theme ",
  "clear",
  "cv",
  "time-left",
  "history",
  "matrix",
  "exit",
];

const HELP: Array<[string, string]> = [
  ["help", "you are here"],
  ["whoami", "who is this guy"],
  ["ls", "list the sections of this site"],
  ["git log", "jump to the career timeline"],
  ["projects", "jump to selected projects"],
  ["cat skills.json", "jump to the skills dump"],
  ["contact", "how to reach me"],
  ["theme <name>", "dracula | gruvbox | solarized"],
  ["cv", "get a copy of my CV"],
  ["clear", "clean up this mess"],
];

export const HeroTerminal = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);
  const [input, setInput] = useState("");
  const [matrix, setMatrix] = useState(false);
  const [vimMode, setVimMode] = useState(false);
  const history = useRef<string[]>([]);
  const histIdx = useRef(-1);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootStarted = useRef(false);

  const push = useCallback((...nodes: ReactNode[]) => {
    setLines((prev) => [
      ...prev,
      ...nodes.map((node) => ({ id: idRef.current++, node })),
    ]);
  }, []);

  const echoCmd = useCallback(
    (cmd: string) =>
      push(
        <div>
          <Prompt /> <span className="text-term-fg">{cmd}</span>
        </div>
      ),
    [push]
  );

  const whoamiOutput = (
    <div className="text-term-fg">
      {profile.name} —{" "}
      <span className="text-term-accent">{profile.title}</span> @{" "}
      <span className="text-term-pink">{profile.company}</span>,{" "}
      {profile.location}
    </div>
  );

  const welcomeOutput = (
    <div className="space-y-3 py-1">
      <pre className="ascii-shimmer text-[7px] min-[400px]:text-[9px] sm:text-xs leading-tight font-bold overflow-x-auto">
        {BANNER}
      </pre>
      <p className="text-term-muted max-w-xl leading-relaxed">
        {profile.summary}
      </p>
      <p className="text-term-muted">
        Type <span className="text-term-yellow">`help`</span> to explore — or
        just scroll like a normal person.
      </p>
    </div>
  );

  // boot sequence: types the first two commands, then hands over the prompt
  useEffect(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const type = async (cmd: string) => {
      for (let i = 1; i <= cmd.length; i++) {
        if (cancelled) return;
        setTyping(cmd.slice(0, i));
        await sleep(45 + Math.random() * 40);
      }
      await sleep(350);
      setTyping(null);
      echoCmd(cmd);
    };

    (async () => {
      await sleep(0);
      if (cancelled) return;
      setLines([]);
      if (reduced) {
        echoCmd("whoami");
        push(whoamiOutput);
        echoCmd("./welcome.sh");
        push(welcomeOutput);
        setBooted(true);
        return;
      }
      await sleep(500);
      await type("whoami");
      if (cancelled) return;
      push(whoamiOutput);
      await sleep(600);
      await type("./welcome.sh");
      if (cancelled) return;
      push(welcomeOutput);
      setBooted(true);
    })();

    return () => {
      // strict-mode remount: cancel this run and let the next one restart
      cancelled = true;
      bootStarted.current = false;
      setTyping(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing, booted]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    push(
      <div className="text-term-muted">
        → scrolling to <span className="text-term-cyan">#{id}</span>
      </div>
    );
  };

  const err = (text: string) =>
    push(<div className="text-term-red">{text}</div>);
  const out = (text: string) =>
    push(<div className="text-term-muted">{text}</div>);

  const run = (raw: string) => {
    const cmd = raw.trim();
    echoCmd(cmd);
    if (!cmd) return;
    history.current.push(cmd);
    histIdx.current = history.current.length;

    if (vimMode) {
      if (cmd === ":q!" || cmd === ":q" || cmd === ":wq") {
        setVimMode(false);
        out("vim exited. You are free now.");
      } else {
        err(`E492: Not an editor command: ${cmd}   (hint: :q!)`);
      }
      return;
    }

    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");

    switch (name.toLowerCase()) {
      case "help":
        push(
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-0.5 py-1">
            {HELP.map(([c, desc]) => (
              <div key={c} className="contents">
                <span className="text-term-yellow">{c}</span>
                <span className="text-term-muted">{desc}</span>
              </div>
            ))}
            <span className="text-term-muted col-span-2 pt-1">
              …and a few undocumented ones. Explore.
            </span>
          </div>
        );
        break;
      case "whoami":
        push(whoamiOutput);
        break;
      case "ls":
        push(
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-term-cyan hover:underline"
              >
                {s}/
              </button>
            ))}
          </div>
        );
        break;
      case "cat":
        if (arg === "skills.json") scrollTo("skills");
        else if (!arg) err("cat: missing operand");
        else err(`cat: ${arg}: No such file or directory`);
        break;
      case "git":
        if (arg.startsWith("log")) scrollTo("experience");
        else if (arg === "blame") out("it was DNS. It is always DNS.");
        else if (arg.startsWith("push"))
          err("remote: Permission denied. This is MY portfolio 🙂");
        else out(`git: '${arg || ""}' — try \`git log\``);
        break;
      case "experience":
        scrollTo("experience");
        break;
      case "projects":
        scrollTo("projects");
        break;
      case "skills":
        scrollTo("skills");
        break;
      case "about":
      case "education":
      case "man":
        scrollTo("about");
        break;
      case "languages":
        out(
          "Afaan Oromo (native) · Amharic (native) · English (fluent) · Spanish (A2) · TypeScript (fluent)"
        );
        break;
      case "contact":
        scrollTo("contact");
        break;
      case "cv":
        push(
          <div className="text-term-muted">
            CV available on request →{" "}
            <a
              href={links[0].link}
              className="text-term-cyan hover:underline"
            >
              {links[0].content}
            </a>{" "}
            (or find me on{" "}
            <a
              href={links[2].link}
              target="_blank"
              rel="noreferrer"
              className="text-term-cyan hover:underline"
            >
              LinkedIn
            </a>
            )
          </div>
        );
        break;
      case "theme":
        if (THEMES.includes(arg)) {
          setTheme(arg);
          out(`theme set to ${arg} ✓`);
        } else {
          err(`usage: theme <${THEMES.join("|")}>`);
        }
        break;
      case "clear":
        setLines([]);
        break;
      case "matrix":
        setMatrix(true);
        break;
      case "time-left":
        out("entering the countdown…");
        router.push("/time-left");
        break;
      case "history":
        push(
          <div className="text-term-muted">
            {history.current.map((h, i) => (
              <div key={i}>
                {String(i + 1).padStart(3, " ")} {h}
              </div>
            ))}
          </div>
        );
        break;
      case "pwd":
        out("/home/robera/portfolio");
        break;
      case "date":
        out(new Date().toString());
        break;
      case "echo":
        out(arg);
        break;
      case "sudo":
        err(
          "you are not in the sudoers file. This incident will be reported."
        );
        break;
      case "rm":
        err("rm: cannot remove: read-only file system (nice try though)");
        break;
      case "vim":
      case "nano":
      case "emacs":
        setVimMode(true);
        out(`${name} opened. Good luck getting out. (hint: :q!)`);
        break;
      case "exit":
      case "logout":
        out("there is no escape. Scroll down instead.");
        break;
      case "ping":
        out(`PONG ${arg || ""} time=0.042ms`);
        break;
      default:
        err(`${name}: command not found — try \`help\``);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx.current > 0) {
        histIdx.current--;
        setInput(history.current[histIdx.current] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current < history.current.length - 1) {
        histIdx.current++;
        setInput(history.current[histIdx.current] ?? "");
      } else {
        histIdx.current = history.current.length;
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMPLETIONS.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-lg border border-term-border bg-term-panel shadow-window shadow-glow overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-term-bgAlt border-b border-term-border">
        <span className="w-3 h-3 rounded-full bg-term-red" />
        <span className="w-3 h-3 rounded-full bg-term-yellow" />
        <span className="w-3 h-3 rounded-full bg-term-green" />
        <span className="ml-3 text-xs text-term-muted truncate">
          robera@madrid: ~/portfolio — zsh
        </span>
      </div>
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-6 h-[420px] sm:h-[460px] overflow-y-auto text-xs sm:text-sm leading-relaxed cursor-text"
      >
        <div className="space-y-1.5">
          {lines.map((l) => (
            <div key={l.id}>{l.node}</div>
          ))}
        </div>
        {typing !== null && (
          <div>
            <Prompt /> <span className="text-term-fg">{typing}</span>
            <span className="cursor-blink text-term-accent">▊</span>
          </div>
        )}
        {booted && !typing && (
          <div className="flex items-center gap-0 pt-1.5">
            {vimMode ? (
              <span className="text-term-green">-- INSERT --</span>
            ) : (
              <Prompt />
            )}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 ml-2 bg-transparent outline-none text-term-fg min-w-0"
              style={{ caretColor: "var(--accent)" }}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal command input"
            />
          </div>
        )}
      </div>
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
    </motion.div>
  );
};
