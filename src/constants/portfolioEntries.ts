import {
  CareerEntry,
  EducationEntry,
  PortfolioLink,
  Project,
  SkillsMap,
  VolunteeringEntry,
} from "@/types";

const profile = {
  name: "Robera Worku",
  user: "robera",
  host: "madrid",
  title: "Senior Software Engineer",
  company: "Ebury",
  location: "Madrid, Spain",
  summary:
    "Senior Software Engineer with 5+ years in fintech. I design, build, and optimize scalable backend systems — and I care a lot about security, reliability, and the occasional 25% infra bill haircut.",
};

const links: PortfolioLink[] = [
  {
    name: "email",
    link: "mailto:robgogoworku@gmail.com",
    content: "robgogoworku@gmail.com",
  },
  { name: "github", link: "https://github.com/Robgogo", content: "Robgogo" },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/robera-worku/",
    content: "robera-worku",
  },
];

const careerTimeline: CareerEntry[] = [
  {
    hash: "e4b7a1f",
    tag: "L4",
    head: true,
    company: "Ebury",
    role: "Senior Engineer",
    location: "Madrid, ES",
    from: new Date("2026/03/01"),
    to: "now",
    message: "feat(ebury): lead monolith → micro-frontend migration",
    achievements: [
      "Leading the critical migration from a monolithic web app to a micro-frontend architecture",
      "Leading development of the form prefill feature for Supplier Payment Financing applications",
    ],
  },
  {
    hash: "97c04d2",
    tag: "L2.5",
    company: "Klarna",
    role: "Engineer (Full-Stack)",
    location: "Madrid, ES",
    from: new Date("2025/05/01"),
    to: new Date("2026/03/01"),
    message: "feat(klarna): M&A data migration + <2min PostgreSQL upgrades",
    achievements: [
      "Led the post-M&A data migration of Stocard (acquired company) into the core Klarna ecosystem, ensuring business continuity for a major product expansion",
      "Drove Peak Season Readiness across multiple cycles — zero major incidents during high-traffic periods",
      "Engineered critical PostgreSQL engine upgrades with less than 2 minutes of downtime",
      "Designed and optimized the Transaction Branding service, accurately branding millions of consumer transactions",
    ],
  },
  {
    hash: "5b21af0",
    tag: "L2",
    company: "Klarna",
    role: "Engineer (Full-Stack)",
    location: "Madrid, ES",
    from: new Date("2023/05/01"),
    to: new Date("2025/05/01"),
    message: "feat(klarna): high-volume data service + Physical Stores",
    achievements: [
      "Designed and implemented a high-volume service for external data processing, offloading significant strain from the core service",
      "Spearheaded the Physical Stores initiative, integrating physical stores into the Klarna platform",
      "Served as Domain Security Champion, consulting multiple teams on security best practices and threat modeling",
      "Led security topics in a new team — zero violations",
    ],
  },
  {
    hash: "c88d3e9",
    tag: "L1.5",
    company: "Klarna",
    role: "Engineer (Full-Stack)",
    location: "Berlin, DE",
    from: new Date("2022/10/01"),
    to: new Date("2023/05/01"),
    message: "perf(klarna): -25% cloud infrastructure cost",
    achievements: [
      "Led service optimization that cut team cloud infrastructure cost by 25% through architecture refinement and resource scaling",
      "Designed and implemented a mission-critical service replacing an unstable legacy service",
      "Managed the end-to-end data migration from old to new service — zero data integrity issues",
    ],
  },
  {
    hash: "1af62b8",
    tag: "L1",
    company: "Klarna",
    role: "Graduate Engineer (Full-Stack)",
    location: "Berlin, DE",
    from: new Date("2021/12/01"),
    to: new Date("2022/10/01"),
    message: "feat(klarna): ship 'My Stores' + follow-stores feature",
    achievements: [
      "Led backend and frontend development of the Klarna app's 'My Stores' section, introducing the popular follow-stores feature",
      "Led the security epic in the team — zero violations and compliance issues",
      "Migrated an internal tool to a modern UI/UX, designing and implementing a supporting GraphQL API backend",
    ],
  },
  {
    hash: "b3391cd",
    company: "Better Mobile Security",
    role: "Junior ML & Backend Engineer",
    location: "Addis Ababa, ET",
    from: new Date("2019/08/01"),
    to: new Date("2020/08/31"),
    message: "feat(ml): malware detection accuracy 87% → 97%",
    achievements: [
      "Improved an Android malware detection model's accuracy from 87% to 97%",
      "Built 3 different models for phishing link detection",
      "Developed a SOC2 compliance checking tool as a backend developer",
      "Led a cross-team group building a platform connecting all company products",
    ],
  },
  {
    hash: "0a1c0de",
    company: "Apposit LLC / Federal TVET Agency",
    role: "Software Developer (Internships)",
    location: "Addis Ababa, ET",
    from: new Date("2018/03/01"),
    to: new Date("2018/10/31"),
    message: "chore: initial commits — first industry experience",
    achievements: [
      "Built an internal developer-performance monitoring tool on top of the Jira platform (Apposit)",
      "Built a system automating exam preparation and online student certification, and set up its IT infrastructure (Federal TVET Agency)",
    ],
  },
];

const projects: Project[] = [
  {
    name: "time-tracker",
    file: "time-tracker.ts",
    description:
      "A PWA for tracking work hours — clock in/out with a live timer, history editing, and monthly summaries, all persisted to a Google Sheet you own.",
    why: "wanted one-tap time tracking without handing my data to a SaaS",
    tech: ["TypeScript", "PWA", "Google Sheets API"],
    repo: "https://github.com/Robgogo/time-tracker",
  },
  {
    name: "kafka-tut",
    file: "kafka-tut.ts",
    description:
      "A hands-on Kafka setup with docker-compose, KafkaJS, and Schema Registry — producing and consuming schema-validated messages locally.",
    why: "learning Kafka properly meant building the whole pipeline myself",
    tech: ["TypeScript", "Kafka", "Docker", "Schema Registry"],
    repo: "https://github.com/Robgogo/kafka-tut",
  },
  {
    name: "Covid-19-SMS",
    file: "covid-19-sms.js",
    description:
      "A Node.js API delivering COVID-19 information over SMS via the Africa's Talking API — built for reach where internet access isn't a given.",
    why: "in 2020, SMS was the most reliable way to reach people back home",
    tech: ["Node.js", "Africa's Talking API", "SMS"],
    repo: "https://github.com/Robgogo/Covid-19-SMS",
  },
  {
    name: "nestjs-template",
    file: "nestjs-template.ts",
    description:
      "My opinionated NestJS boilerplate — the starting point I reach for when spinning up a new backend service.",
    why: "stop re-wiring the same auth/config/lint setup on every new project",
    tech: ["NestJS", "TypeScript", "Node.js"],
    repo: "https://github.com/Robgogo/nestjs-template",
  },
  {
    name: "ChatAppSocketPython",
    file: "chat_app.py",
    description:
      "A chat application built on raw Python sockets — no frameworks, just the network layer.",
    why: "the best way to understand sockets is to speak them directly",
    tech: ["Python", "Sockets"],
    repo: "https://github.com/Robgogo/ChatAppSocketPython",
  },
  {
    name: "robgogo.github.io",
    file: "portfolio.tsx",
    description:
      "This site — a terminal-themed portfolio with a working command line, a git-log career timeline, and switchable terminal color schemes.",
    why: "you're looking at it",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    repo: "https://github.com/Robgogo/robgogo.github.io",
  },
];

const skills: SkillsMap = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "Java", "Dart"],
  backend: ["NestJS", "Node.js", "Django", "Flask", "Express", "GraphQL"],
  frontend: ["React", "React Native", "Next.js"],
  cloud_devops: [
    "AWS",
    "GCP",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitHub Actions",
  ],
  databases: ["PostgreSQL", "MySQL", "MongoDB"],
  observability: ["Grafana", "Prometheus", "DataDog"],
  security: ["Threat Modeling", "SOC2", "Domain Security Champion @ Klarna"],
  spoken_languages: {
    afaan_oromo: "native",
    amharic: "native",
    english: "fluent",
    spanish: "A2",
  },
};

const educationHistory: EducationEntry[] = [
  {
    school: "IE University",
    degree: "M.Sc. Computer Science & Business Technology",
    location: "Madrid, Spain",
    from: new Date("2020/09/01"),
    to: new Date("2021/07/23"),
    notes: ["IE Foundation Scholarship (fully funded)"],
  },
  {
    school: "Addis Ababa Institute of Technology",
    degree: "B.Sc. Electrical & Computer Engineering (Computer Engineering)",
    location: "Addis Ababa, Ethiopia",
    from: new Date("2014/09/01"),
    to: new Date("2019/07/30"),
    notes: ["Graduated with great distinction, top 10th percentile"],
  },
];

const volunteering: VolunteeringEntry[] = [
  {
    org: "AddisCoder",
    role: "Assistant Lecturer",
    period: "Summer 2018",
    description:
      "Taught high school students the fundamentals of computer science and programming with the AddisCoder team.",
  },
  {
    org: "Visionary Tech × Meles Zenawi Foundation",
    role: "Co-founder & Lecturer",
    period: "Winter 2019",
    description:
      "Co-founded Visionary Tech with friends after AddisCoder, partnering with the Meles Zenawi Foundation to teach programming to high school students.",
  },
];

export {
  profile,
  links,
  careerTimeline,
  projects,
  skills,
  educationHistory,
  volunteering,
};
