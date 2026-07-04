import { SkillsMap } from "@/types";
import { TerminalWindow } from "./TerminalWindow";

const Str = ({ children }: { children: string }) => (
  <span className="text-term-green">&quot;{children}&quot;</span>
);
const Key = ({ children }: { children: string }) => (
  <span className="text-term-cyan">&quot;{children}&quot;</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-term-muted">{children}</span>
);

export const SkillsJson = ({ skills }: { skills: SkillsMap }) => {
  const entries = Object.entries(skills);
  let lineNo = 0;
  const Line = ({ children }: { children: React.ReactNode }) => {
    lineNo++;
    return (
      <div className="flex">
        <span className="w-8 shrink-0 text-right pr-3 text-term-muted select-none opacity-60">
          {lineNo}
        </span>
        <span className="whitespace-pre-wrap break-words">{children}</span>
      </div>
    );
  };

  return (
    <TerminalWindow title="~/portfolio/skills.json">
      <div className="text-xs sm:text-sm leading-relaxed overflow-x-auto">
        <Line>
          <P>{"{"}</P>
        </Line>
        {entries.map(([key, value], i) => {
          const last = i === entries.length - 1;
          if (Array.isArray(value)) {
            return (
              <Line key={key}>
                {"  "}
                <Key>{key}</Key>
                <P>: [</P>
                {value.map((v, j) => (
                  <span key={v}>
                    <Str>{v}</Str>
                    {j < value.length - 1 && <P>, </P>}
                  </span>
                ))}
                <P>{last ? "]" : "],"}</P>
              </Line>
            );
          }
          const sub = Object.entries(value);
          return (
            <div key={key}>
              <Line>
                {"  "}
                <Key>{key}</Key>
                <P>: {"{"}</P>
              </Line>
              {sub.map(([k, v], j) => (
                <Line key={k}>
                  {"    "}
                  <Key>{k}</Key>
                  <P>: </P>
                  <Str>{v}</Str>
                  {j < sub.length - 1 && <P>,</P>}
                </Line>
              ))}
              <Line>
                {"  "}
                <P>{last ? "}" : "},"}</P>
              </Line>
            </div>
          );
        })}
        <Line>
          <P>{"}"}</P>
        </Line>
      </div>
    </TerminalWindow>
  );
};
