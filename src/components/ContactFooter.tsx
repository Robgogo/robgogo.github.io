import { PortfolioLink } from "@/types";
import { TerminalWindow } from "./TerminalWindow";

export const ContactFooter = ({ links }: { links: PortfolioLink[] }) => (
  <div className="space-y-8">
    <TerminalWindow title="curl -s robgogo.github.io/contact.json">
      <div className="text-xs sm:text-sm leading-relaxed">
        <span className="text-term-muted">{"{"}</span>
        {links.map((l, i) => (
          <div key={l.name} className="pl-4">
            <span className="text-term-cyan">&quot;{l.name}&quot;</span>
            <span className="text-term-muted">: </span>
            <a
              href={l.link}
              target={l.link.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="text-term-green hover:underline hover:text-term-accent transition-colors"
            >
              &quot;{l.content}&quot;
            </a>
            {i < links.length - 1 && (
              <span className="text-term-muted">,</span>
            )}
          </div>
        ))}
        <span className="text-term-muted">{"}"}</span>
      </div>
    </TerminalWindow>
    <p className="text-center text-xs text-term-muted pb-8">
      © {new Date().getFullYear()} Robera Worku · built with Next.js, Tailwind
      &amp; Framer Motion ·{" "}
      <a
        href="https://github.com/Robgogo/robgogo.github.io"
        target="_blank"
        rel="noreferrer"
        className="text-term-cyan hover:underline"
      >
        view source
      </a>
      <br />
      <span className="opacity-70">
        connection to robera@madrid closed.
      </span>
    </p>
  </div>
);
