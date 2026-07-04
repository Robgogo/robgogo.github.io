export type PortfolioLink = { name: string; link: string; content: string };

export type CareerEntry = {
  hash: string;
  tag?: string;
  head?: boolean;
  company: string;
  role: string;
  location: string;
  from: Date;
  to: Date | "now";
  message: string;
  achievements: string[];
};

export type Project = {
  name: string;
  file: string;
  description: string;
  why: string;
  tech: string[];
  repo: string;
};

export type EducationEntry = {
  school: string;
  degree: string;
  location: string;
  from: Date;
  to: Date;
  notes: string[];
};

export type VolunteeringEntry = {
  org: string;
  role: string;
  period: string;
  description: string;
};

export type SkillsMap = Record<string, string[] | Record<string, string>>;
