import { EducationEntry, VolunteeringEntry } from "@/types";
import { shortDate } from "@/utils/dateUtils";
import { TerminalWindow } from "./TerminalWindow";

const H = ({ children }: { children: string }) => (
  <h3 className="text-term-yellow font-bold tracking-wide mt-5 first:mt-0">
    {children}
  </h3>
);

export const ManPage = ({
  education,
  volunteering,
}: {
  education: EducationEntry[];
  volunteering: VolunteeringEntry[];
}) => (
  <TerminalWindow title="man robera">
    <div className="text-xs sm:text-sm leading-relaxed">
      <div className="flex justify-between text-term-muted">
        <span>ROBERA(1)</span>
        <span className="hidden sm:inline">User Commands</span>
        <span>ROBERA(1)</span>
      </div>

      <H>NAME</H>
      <p className="pl-4 text-term-fg">
        robera — senior software engineer, security nerd, teacher at heart
      </p>

      <H>EDUCATION</H>
      <div className="pl-4 space-y-3">
        {education.map((e) => (
          <div key={e.school}>
            <p className="text-term-fg">
              <span className="text-term-accent">{e.school}</span> — {e.degree}
            </p>
            <p className="text-term-muted">
              {e.location} · {shortDate(e.from)} — {shortDate(e.to)}
            </p>
            {e.notes.map((n) => (
              <p key={n} className="text-term-muted">
                ★ {n}
              </p>
            ))}
          </div>
        ))}
      </div>

      <H>VOLUNTEERING</H>
      <div className="pl-4 space-y-3">
        {volunteering.map((v) => (
          <div key={v.org}>
            <p className="text-term-fg">
              <span className="text-term-accent">{v.org}</span> — {v.role}{" "}
              <span className="text-term-muted">({v.period})</span>
            </p>
            <p className="text-term-muted">{v.description}</p>
          </div>
        ))}
      </div>

      <H>LANGUAGES</H>
      <p className="pl-4 text-term-muted">
        Afaan Oromo (native) · Amharic (native) · English (fluent) · Spanish
        (A2)
      </p>

      <H>SEE ALSO</H>
      <p className="pl-4 text-term-muted">
        git-log(1), skills.json(5), contact(7)
      </p>
    </div>
  </TerminalWindow>
);
