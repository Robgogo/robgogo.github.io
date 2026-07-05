import { ContactFooter } from "@/components/ContactFooter";
import { GitTimeline } from "@/components/GitTimeline";
import { HeroTerminal } from "@/components/HeroTerminal";
import { ManPage } from "@/components/ManPage";
import { Projects } from "@/components/Projects";
import { Section } from "@/components/Section";
import { SkillsJson } from "@/components/SkillsJson";
import {
  careerTimeline,
  educationHistory,
  links,
  projects,
  skills,
  volunteering,
} from "@/constants/portfolioEntries";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 sm:gap-24 px-4 py-8 sm:py-14 mx-auto max-w-[1000px] w-full">
      <HeroTerminal />

      <Section id="experience" command="git log --graph --all --decorate">
        <GitTimeline entries={careerTimeline} />
      </Section>

      <Section id="projects" command="ls -la ~/projects --sort=affection">
        <Projects projects={projects} />
      </Section>

      <Section id="skills" command="cat skills.json | jq '.'">
        <SkillsJson skills={skills} />
      </Section>

      <Section id="about" command="man robera">
        <ManPage education={educationHistory} volunteering={volunteering} />
      </Section>

      <Section id="contact" command="curl -s robgogo.github.io/contact.json">
        <ContactFooter links={links} />
      </Section>
    </main>
  );
}
