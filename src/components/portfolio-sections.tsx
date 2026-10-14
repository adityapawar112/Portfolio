import { useState, type CSSProperties, type ReactNode } from "react";
import bookIcon from "pixelarticons/svg/book-open.svg?url";
import bracesIcon from "pixelarticons/svg/braces.svg?url";
import briefcaseIcon from "pixelarticons/svg/briefcase.svg?url";
import cloudServerIcon from "pixelarticons/svg/cloud-server.svg?url";
import codeIcon from "pixelarticons/svg/code.svg?url";
import cpuIcon from "pixelarticons/svg/cpu.svg?url";
import databaseIcon from "pixelarticons/svg/database.svg?url";
import externalLinkIcon from "pixelarticons/svg/external-link.svg?url";
import gitBranchIcon from "pixelarticons/svg/git-branch.svg?url";
import githubIcon from "pixelarticons/svg/github.svg?url";
import globeIcon from "pixelarticons/svg/globe.svg?url";
import homeIcon from "pixelarticons/svg/home.svg?url";
import keyIcon from "pixelarticons/svg/key.svg?url";
import laptopIcon from "pixelarticons/svg/laptop.svg?url";
import lockIcon from "pixelarticons/svg/lock.svg?url";
import packageIcon from "pixelarticons/svg/package.svg?url";
import reactIcon from "pixelarticons/svg/react.svg?url";
import serverIcon from "pixelarticons/svg/server.svg?url";
import shieldIcon from "pixelarticons/svg/shield.svg?url";
import testTubeIcon from "pixelarticons/svg/test-tube.svg?url";
import trophyIcon from "pixelarticons/svg/trophy.svg?url";
import userIcon from "pixelarticons/svg/user.svg?url";
import windIcon from "pixelarticons/svg/wind.svg?url";
import zapIcon from "pixelarticons/svg/zap.svg?url";

import type { UiSound } from "../hooks/use-ui-sounds";
import { Button } from "./ui/8bit-button";
import { PixelIcon } from "./ui/pixel-icon";

export type PortfolioSectionId = "start" | "about" | "skills" | "experience" | "projects";

interface SectionProps {
  playSound: (sound: UiSound, volume?: number) => void;
}

interface StartSectionProps extends SectionProps {
  onStartTutorial: () => void;
}

const professionalConversations = [
  {
    question: "What type of work do you specialize in?",
    answer:
      "I am a full-stack developer based in Pune building Next.js web applications, REST APIs, and offline-first desktop tools.",
  },
  {
    question: "What does your hands-on engineering experience look like?",
    answer:
      "I have built multi-tenant web platforms, automated internal workflows, and desktop database applications using TypeScript and SQL.",
  },
  {
    question: "What is a work habit or challenge you actively manage?",
    answer:
      "I tend to over-engineer solutions and fall into research rabbit holes, so I set strict scope limits to keep designs simple and deliver on time.",
  },
  {
    question: "What do you spend time on outside of software engineering?",
    answer:
      "Outside of work, I focus on street photography, game development experiments, video games, and reading novels and manga.",
  },
];

const catConversations = [
  {
    question:
      "[Sniffs the resume, then bats it off the desk.] Who are you, and why are you typing in my favorite sunbeam?",
    answer:
      "I am Aditya, a full-stack developer who builds web platforms and desktop software while trying not to disturb your spot.",
  },
  {
    question:
      "[Crawls into a cardboard box.] Your paper says you worked at a real company, but did you catch any mice?",
    answer:
      "No mice, but I shipped production web applications, automated intake workflows, and handled secure payment systems.",
  },
  {
    question:
      "[Pushes a pen onto the floor.] What is your biggest flaw besides not opening tuna cans on demand?",
    answer:
      "I tend to over-engineer simple problems, so I have to enforce strict limits on myself to keep solutions lean and practical.",
  },
  {
    question:
      "[Tucks paws in for a nap.] When you are not staring at glowing glass, what are you doing with your paws?",
    answer: "I take street photos, build small game prototypes, play video games, and read manga.",
  },
];

const education = [
  {
    period: "2026",
    title: "Bachelor of Technology",
    subtitle: "Information Technology and Data Science",
    school: "Ajeenkya D Y Patil University · Pune, India",
    detail: "8.58 / 10 CGPA",
  },
  {
    period: "2020–2022",
    title: "Pearson International Advanced Level",
    subtitle: "International Advanced Level (IAL)",
    school: "DHT – Kisumu Senior Academy · Kisumu, Kenya",
    detail: "Completed",
  },
  {
    period: "2020",
    title: "Pearson Edexcel International GCSE",
    subtitle: "International GCSE (IGCSE)",
    school: "Jalaram Academy · Kisumu, Kenya",
    detail: "Completed",
  },
];

const experienceMilestones = [
  {
    marker: "2025",
    title: "Fullstack Developer Intern",
    period: "March 2025 – July 2026",
    company: "Ioncure Tech Pvt. Ltd. · Remote",
    points: [
      {
        title: "Conference Platform",
        metric: "20+ events",
        description:
          "Built a multi-tenant platform with Next.js, TypeScript, and MySQL. Dynamic templates cut conference-track setup from four hours to ten minutes while maintaining 98+ Lighthouse scores.",
      },
      {
        title: "Payment Infrastructure",
        metric: "$50K+ processed",
        description:
          "Integrated Razorpay and PayPal with webhook signature verification and idempotent event handling across seven months of multi-currency transactions.",
      },
      {
        title: "Access & Data Security",
        metric: "1,000+ users",
        description:
          "Implemented tenant-scoped RBAC for organizers, speakers, and attendees, secured sessions with httpOnly cookies, and encrypted sensitive attendee data at rest.",
      },
      {
        title: "Production Delivery",
        metric: "5 websites",
        description:
          "Shipped production websites with Next.js and Tailwind CSS using a shared component library while incorporating client feedback into scoped development tasks.",
      },
      {
        title: "AI Workflow Automation",
        metric: "Under 1 min / CV",
        description:
          "Used a chatbot, Zapier, and the OpenAI API to convert 100–200 applicants per hiring cycle into structured records, down from roughly five minutes per CV.",
      },
      {
        title: "Team Enablement",
        metric: "12 onboarded",
        description:
          "Documented the team’s Git workflow and development tooling and onboarded incoming interns and teammates.",
      },
    ],
  },
  {
    marker: "NEXT",
    title: "Upcoming Chapter",
    period: "20XX",
    company: "Upcoming",
    points: [
      {
        title: "Reserved",
        metric: "Upcoming",
        description: "The next professional milestone will be added here.",
      },
    ],
  },
  {
    marker: "NEXT",
    title: "Upcoming Chapter",
    period: "20XX",
    company: "Upcoming",
    points: [
      {
        title: "Reserved",
        metric: "Upcoming",
        description: "A future role and its shipped work will appear here.",
      },
    ],
  },
  {
    marker: "NEXT",
    title: "Upcoming Chapter",
    period: "20XX",
    company: "Upcoming",
    points: [
      {
        title: "Reserved",
        metric: "Upcoming",
        description: "This slot is reserved for another experience milestone.",
      },
    ],
  },
];

const languageSkills = [
  { label: "TypeScript", icon: codeIcon, duration: "24s", delay: "-3s" },
  { label: "JavaScript", icon: bracesIcon, duration: "30s", delay: "-11s" },
  { label: "SQL", icon: databaseIcon, duration: "38s", delay: "-19s" },
];

const frontendSkills = [
  { label: "React", icon: bracesIcon },
  { label: "Next.js", icon: globeIcon },
  { label: "Tailwind CSS", icon: windIcon },
  { label: "Electron", icon: laptopIcon },
];

const backendSkills = [
  { label: "Node.js", icon: serverIcon },
  { label: "REST APIs", icon: globeIcon },
  { label: "MySQL", icon: databaseIcon },
  { label: "PostgreSQL", icon: databaseIcon },
  { label: "SQLite", icon: packageIcon },
  { label: "Supabase", icon: cloudServerIcon },
];

const securitySkills = [
  { label: "RBAC", icon: shieldIcon },
  { label: "OAuth 2.0 (PKCE)", icon: keyIcon },
  { label: "RSA", icon: lockIcon },
  { label: "Webhook verification", icon: cloudServerIcon },
];

const toolingSkills = [
  { label: "Git", icon: gitBranchIcon },
  { label: "GitHub Actions", icon: githubIcon },
  { label: "Vitest", icon: testTubeIcon },
  { label: "OpenAI API", icon: cpuIcon },
  { label: "Zapier", icon: zapIcon },
];

const projects = [
  {
    name: "ScaleERP-Desktop",
    subtitle: "Electron · React · SQLite",
    github: "https://github.com/adityapawar112/ScaleERP-Desktop",
    live: "https://scale-erp.vercel.app/",
    features: [
      "Built an offline-first inventory and billing desktop app with a 28-table schema, ledger-reversal safeguards, and indexed/FTS5 search under 50 ms across 10,000+ items.",
      "Implemented RSA-signed offline license verification with a 30-day grace period, local heartbeat checks, clock-rollback detection, and database-tampering safeguards.",
      "Built Google Drive backup and restore with OAuth 2.0 PKCE, encrypted token storage, exponential-backoff retries, and SHA-256-verified SQLite snapshots.",
      "Added GitHub Actions CI with Vitest, secret scanning, and build-safety checks before packaging Windows NSIS installers and portable releases.",
    ],
    technologies: [
      { label: "Electron", icon: laptopIcon },
      { label: "React", icon: reactIcon },
      { label: "TypeScript", icon: codeIcon },
      { label: "SQLite", icon: databaseIcon },
      { label: "Vite", icon: zapIcon },
      { label: "Bootstrap", icon: packageIcon },
    ],
    media: [
      { src: "/projects/scalerp-desktop/whatsapp-manager.webp", alt: "ScaleERP WhatsApp manager" },
      { src: "/projects/scalerp-desktop/add-transaction.webp", alt: "ScaleERP add transaction form" },
      { src: "/projects/scalerp-desktop/custom-bills.webp", alt: "ScaleERP custom invoice settings" },
      { src: "/projects/scalerp-desktop/invoice-preview.webp", alt: "ScaleERP supplier invoice preview" },
      { src: "/projects/scalerp-desktop/marathi-dashboard.webp", alt: "ScaleERP dashboard in Marathi" },
      { src: "/projects/scalerp-desktop/reports-analysis.webp", alt: "ScaleERP reports and analysis" },
    ],
  },
  {
    name: "ScaleERP-Web",
    subtitle: "Next.js · React · Supabase",
    github: "https://github.com/adityapawar112/ScaleERP-Web",
    live: "https://scale-erp.vercel.app/",
    features: [
      "Built a cloud control plane for trials and licenses with Next.js and Supabase, generating RSA-2048 signed keys tied to hardware fingerprints with an air-gapped signing tool.",
      "Hardened REST APIs with schema validation, structured errors, rate limiting, device-quota enforcement, and security audit logging.",
      "Handled client heartbeat ingestion to record workstation telemetry, audit active device allocations, and flag clock-skew anomalies.",
      "Configured release delivery through GitHub Releases, automated Vercel deployments, and documentation in English, Hindi, and Marathi.",
    ],
    technologies: [
      { label: "Next.js", icon: globeIcon },
      { label: "React", icon: reactIcon },
      { label: "TypeScript", icon: codeIcon },
      { label: "Supabase", icon: cloudServerIcon },
      { label: "PostgreSQL", icon: databaseIcon },
      { label: "Tailwind CSS", icon: windIcon },
    ],
    media: [
      { src: "/projects/scalerp-web/landing-scalererp-web.webp", alt: "ScaleERP website landing page" },
      { src: "/projects/scalerp-web/features-scalererp-web.webp", alt: "ScaleERP website platform page" },
    ],
  },
];

function SectionHeading({
  action,
  description,
  icon,
  title,
  tutorialTarget,
}: {
  action?: ReactNode;
  description: string;
  icon: string;
  title: string;
  tutorialTarget?: string;
}) {
  return (
    <div className="section-heading" data-tutorial-target={tutorialTarget}>
      <PixelIcon className="section-heading-icon" source={icon} />
      <div>
        <div aria-level={2} className="section-title" role="heading">
          {title}
        </div>
        <div className="section-description">{description}</div>
      </div>
      {action}
    </div>
  );
}

export function AboutSection({ playSound }: SectionProps) {
  const [mode, setMode] = useState<"professional" | "cat">("professional");
  const isCatMode = mode === "cat";
  const conversations = isCatMode ? catConversations : professionalConversations;

  const selectMode = (nextMode: "professional" | "cat") => {
    if (nextMode === mode) return;
    setMode(nextMode);
    playSound("ding", 0.2);
  };

  return (
    <div className="content-section">
      <SectionHeading
        action={
          <div aria-label="About conversation mode" className="about-mode-toggle" role="group">
            <Button
              aria-label="Use professional mode"
              aria-pressed={!isCatMode}
              className="about-mode-button"
              onClick={() => selectMode("professional")}
              onPointerEnter={() => playSound("boop", 0.1)}
              title="Professional mode"
              variant={!isCatMode ? "default" : "ghost"}
            >
              <PixelIcon source={briefcaseIcon} />
            </Button>
            <Button
              aria-label="Use cat mode"
              aria-pressed={isCatMode}
              className="about-mode-button"
              onClick={() => selectMode("cat")}
              onPointerEnter={() => playSound("boop", 0.1)}
              title="Cat mode"
              variant={isCatMode ? "default" : "ghost"}
            >
              <span aria-hidden="true" className="about-cat-icon">
                <span />
                <span />
              </span>
            </Button>
          </div>
        }
        description={
          isCatMode
            ? "A serious interview conducted by a deeply unserious cat."
            : "A concise conversation about my work, habits, and interests."
        }
        icon={userIcon}
        title="About Me"
        tutorialTarget="section-about"
      />
      <div className="dialogue-stack">
        {conversations.map((exchange) => (
          <div className="dialogue-exchange" key={exchange.question}>
            <div className="dialogue-row">
              {isCatMode ? (
                <div aria-label="Byte the pixel cat" className="pixel-cat" role="img">
                  <span className="cat-ear cat-ear-left" />
                  <span className="cat-ear cat-ear-right" />
                  <span className="cat-eye cat-eye-left" />
                  <span className="cat-eye cat-eye-right" />
                  <span className="cat-nose" />
                </div>
              ) : (
                <div aria-label="Recruiter" className="human-avatar recruiter-avatar" role="img">
                  HR
                </div>
              )}
              <div className="dialogue-box">
                <div className="dialogue-speaker">{isCatMode ? "Cat" : "Recruiter"}</div>
                <div className="dialogue-copy">{exchange.question}</div>
                <span aria-hidden="true" className="dialogue-next" />
              </div>
            </div>
            <div className="dialogue-row dialogue-row-reverse">
              <div aria-label="Aditya Pawar" className="human-avatar" role="img">
                AP
              </div>
              <div className="dialogue-box">
                <div className="dialogue-speaker">Aditya</div>
                <div className="dialogue-copy">{exchange.answer}</div>
                <span aria-hidden="true" className="dialogue-next" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="about-education">
        <SectionHeading
          description="The learning path that led from Kisumu to Pune."
          icon={bookIcon}
          title="Education Roadmap"
        />
        <div className="education-roadmap">
          <span aria-hidden="true" className="roadmap-line" />
          {education.map((item, index) => (
            <div className="roadmap-entry" key={item.title}>
              <div className="roadmap-node">{index + 1}</div>
              <div className="pixel-card roadmap-card">
                <div className="card-topline">
                  <span className="status-badge">{item.period}</span>
                  <span className="roadmap-detail">{item.detail}</span>
                </div>
                <div className="card-title">{item.title}</div>
                <div className="card-subtitle">{item.subtitle}</div>
                <div className="card-copy">{item.school}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StartSection({ onStartTutorial, playSound }: StartSectionProps) {
  return (
    <div className="content-section">
      <SectionHeading
        description="Learn the controls, meet the player, and inspect the completed quests."
        icon={zapIcon}
        title="Portfolio Tutorial"
      />
      <div className="pixel-card tutorial-launch-card">
        <div className="tutorial-launch-mark">?</div>
        <div>
          <div className="card-title">Tutorial ready</div>
          <div className="card-copy">
            Follow the guide through each menu chapter. You can leave the tutorial at any time.
          </div>
        </div>
        <Button
          className="tutorial-launch-button"
          onClick={() => {
            playSound("chord", 0.25);
            onStartTutorial();
          }}
        >
          Begin tutorial
        </Button>
      </div>
    </div>
  );
}

function openProjectLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function ProjectsSection({ playSound }: SectionProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(0);
  const [mediaIndexes, setMediaIndexes] = useState(() => projects.map(() => 0));

  const moveCarousel = (projectIndex: number, direction: number) => {
    setMediaIndexes((current) =>
      current.map((mediaIndex, index) => {
        if (index !== projectIndex) return mediaIndex;
        return (mediaIndex + direction + projects[index].media.length) % projects[index].media.length;
      }),
    );
    playSound("ding", 0.15);
  };

  return (
    <div className="content-section content-section-wide">
      <SectionHeading
        description="Two connected products built for reliable inventory, billing, and licensing."
        icon={trophyIcon}
        title="Project Quest Log"
        tutorialTarget="section-projects"
      />
      <div className="project-list">
        {projects.map((project, projectIndex) => {
          const activeMedia = mediaIndexes[projectIndex];

          return (
            <div className="pixel-card project-card" key={project.name}>
              <div className="project-header">
                <div className="project-actions">
                  <span className="card-subtitle">{project.subtitle}</span>
                  <div className="project-action-buttons">
                    <Button
                      aria-label={`Open ${project.name} on GitHub`}
                      className="project-link"
                      onClick={() => {
                        playSound("chord", 0.3);
                        openProjectLink(project.github);
                      }}
                      variant="ghost"
                    >
                      <PixelIcon source={githubIcon} />
                      GitHub
                    </Button>
                    <Button
                      aria-label={`Open ${project.name} live site`}
                      className="project-link"
                      onClick={() => {
                        playSound("chord", 0.3);
                        openProjectLink(project.live);
                      }}
                    >
                      <PixelIcon source={externalLinkIcon} />
                      Live Site
                    </Button>
                  </div>
                </div>
                <Button
                  aria-expanded={expandedProject === projectIndex}
                  className="project-trigger"
                  onClick={() => {
                    setExpandedProject((current) =>
                      current === projectIndex ? null : projectIndex,
                    );
                    playSound("ding", 0.2);
                  }}
                  variant="ghost"
                >
                  <span className="project-identity">
                    <span className="card-title">{project.name}</span>
                  </span>
                  <span className="project-trigger-hint">
                    <span>{expandedProject === projectIndex ? "Hide details" : "View details"}</span>
                    <span
                      aria-hidden="true"
                      className={`quest-chevron${expandedProject === projectIndex ? " is-open" : ""}`}
                    />
                  </span>
                </Button>
              </div>

              {expandedProject === projectIndex && (
                <div className="project-body">
                  <div className="project-section">
                    <div className="project-section-heading">
                      <span>01</span>
                      <span>Tech Stack</span>
                    </div>
                    <div className="project-tech-grid">
                      {project.technologies.map((technology) => (
                        <div className="project-tech" key={technology.label}>
                          <PixelIcon source={technology.icon} />
                          <span>{technology.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="project-section">
                    <div className="project-section-heading">
                      <span>02</span>
                      <span>Core Features</span>
                    </div>
                    <div className="project-feature-list">
                      {project.features.map((feature, featureIndex) => (
                        <div className="project-feature" key={feature}>
                          <span className="project-feature-number">
                            {String(featureIndex + 1).padStart(2, "0")}
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="project-section">
                    <div className="project-section-heading project-media-heading">
                      <span>03</span>
                      <span>Gallery</span>
                      <span className="project-media-count">
                        {String(activeMedia + 1).padStart(2, "0")} /{" "}
                        {String(project.media.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="project-carousel">
                      <div className="project-media-frame">
                        <img
                          alt={project.media[activeMedia].alt}
                          decoding="async"
                          loading="lazy"
                          src={project.media[activeMedia].src}
                        />
                      </div>
                      <div className="project-carousel-controls">
                        <Button
                          aria-label={`Show previous ${project.name} image`}
                          className="project-carousel-button"
                          onClick={() => moveCarousel(projectIndex, -1)}
                          variant="ghost"
                        >
                          <span aria-hidden="true">←</span>
                          Previous
                        </Button>
                        <div className="project-carousel-dots" aria-hidden="true">
                          {project.media.map((media, mediaIndex) => (
                            <span
                              className={mediaIndex === activeMedia ? "is-active" : ""}
                              key={media.src}
                            />
                          ))}
                        </div>
                        <Button
                          aria-label={`Show next ${project.name} image`}
                          className="project-carousel-button"
                          onClick={() => moveCarousel(projectIndex, 1)}
                          variant="ghost"
                        >
                          Next
                          <span aria-hidden="true">→</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ExperienceSection({ playSound }: SectionProps) {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [expandedPoints, setExpandedPoints] = useState<Set<string>>(() => new Set());

  const togglePoint = (pointId: string) => {
    setExpandedPoints((current) => {
      const next = new Set(current);
      if (next.has(pointId)) {
        next.delete(pointId);
      } else {
        next.add(pointId);
      }
      return next;
    });
  };

  return (
    <div className="content-section content-section-wide">
      <SectionHeading
        description="One role, mapped through the systems and outcomes shipped."
        icon={briefcaseIcon}
        title="Experience Timeline"
        tutorialTarget="section-experience"
      />
      <div className="experience-timeline">
        <span aria-hidden="true" className="timeline-line" />
        {experienceMilestones.map((event, index) => (
          <div
            className={`timeline-entry${index % 2 ? " timeline-entry-right" : ""}`}
            key={`${event.title}-${index}`}
          >
            <div className="timeline-marker">{event.marker}</div>
            <div className="pixel-card timeline-card">
              <Button
                aria-expanded={expandedRole === index}
                className="timeline-position-trigger"
                onClick={() => {
                  playSound("ding", 0.2);
                  setExpandedRole((current) => (current === index ? null : index));
                }}
                onPointerEnter={() => playSound("boop", 0.12)}
                variant="ghost"
              >
                <span className="card-title">{event.title}</span>
                <span
                  aria-hidden="true"
                  className={`quest-chevron${expandedRole === index ? " is-open" : ""}`}
                />
              </Button>

              <div
                aria-hidden={expandedRole !== index}
                className={`timeline-point-panel${expandedRole === index ? " is-open" : ""}`}
              >
                <div className="timeline-point-list">
                  {event.points.map((point, pointIndex) => {
                    const pointId = `${index}-${pointIndex}`;
                    const isExpanded = expandedPoints.has(pointId);

                    return (
                      <div className="timeline-point" key={point.description}>
                        <div className="timeline-point-heading">
                          <span>{point.title}</span>
                          <span>{point.metric}</span>
                        </div>
                        <div
                          className={`timeline-point-body${isExpanded ? " is-expanded" : ""}`}
                        >
                          <span>{point.description}</span>
                          <Button
                            aria-label={
                              isExpanded
                                ? `Collapse ${point.title} details`
                                : `Show full ${point.title} details`
                            }
                            className="timeline-point-more"
                            onClick={() => {
                              playSound("ding", 0.16);
                              togglePoint(pointId);
                            }}
                            tabIndex={expandedRole === index ? 0 : -1}
                            variant="ghost"
                          >
                            {isExpanded ? "Show less" : "..."}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="timeline-side">
              <span className="timeline-period">{event.period}</span>
              <span className="timeline-company">{event.company}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <div className="content-section">
      <SectionHeading
        description="A character sheet for the tools I use to ship."
        icon={codeIcon}
        title="Developer Character Sheet"
        tutorialTarget="section-skills"
      />
      <div className="pixel-card character-sheet">
        <div className="character-header">
          <div className="character-avatar">AP</div>
          <div>
            <div className="card-title character-name">Aditya Pawar</div>
            <div className="card-subtitle">Fullstack Developer · Builder Class</div>
          </div>
          <span className="status-badge">LV. 2026</span>
        </div>

        <div className="sheet-section">
          <div className="sheet-heading">Languages</div>
          <div className="vital-list">
            {languageSkills.map((skill) => (
              <div className="vital-skill" key={skill.label}>
                <div className="vital-label">
                  <span className="skill-name">
                    <PixelIcon source={skill.icon} />
                    {skill.label}
                  </span>
                  <span>Loading</span>
                </div>
                <div className="skill-bar">
                  <span
                    style={
                      {
                        "--load-delay": skill.delay,
                        "--load-duration": skill.duration,
                      } as CSSProperties
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sheet-section">
          <div className="sheet-heading">Attributes</div>
          <div className="sheet-subheading">Frontend / Desktop</div>
          <div className="attribute-grid">
            {frontendSkills.map((skill) => (
              <div className="attribute-box" key={skill.label}>
                <span>{skill.label}</span>
                <PixelIcon source={skill.icon} />
              </div>
            ))}
          </div>
        </div>

        <div className="sheet-section">
          <div className="sheet-heading">Stats</div>
          <div className="sheet-subheading">Backend / Data</div>
          <div className="stat-grid">
            {backendSkills.map((skill) => (
              <div className="stat-row" key={skill.label}>
                <span>{skill.label}</span>
                <PixelIcon source={skill.icon} />
              </div>
            ))}
          </div>
        </div>

        <div className="sheet-section">
          <div className="sheet-heading">Equipment</div>
          <div className="equipment-list">
            <div className="equipment-row">
              <span className="equipment-slot">Security</span>
              <div className="equipment-items">
                {securitySkills.map((skill) => (
                  <span className="equipment-item" key={skill.label}>
                    <PixelIcon source={skill.icon} />
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="equipment-row">
              <span className="equipment-slot">Tooling</span>
              <div className="equipment-items">
                {toolingSkills.map((skill) => (
                  <span className="equipment-item" key={skill.label}>
                    <PixelIcon source={skill.icon} />
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotFoundSection({ onHome, playSound }: SectionProps & { onHome: () => void }) {
  return (
    <div className="content-section not-found-section">
      <div className="not-found-title">ERROR 404</div>
      <div className="section-title">Break out of here</div>
      <div className="section-description">That route fell outside the map. Clear the wall or return home.</div>
      <div aria-hidden="true" className="brick-board">
        <div className="brick-wall">
          {Array.from({ length: 30 }, (_, index) => (
            <span className={`brick brick-${index % 3}`} key={index} />
          ))}
        </div>
        <span className="breaker-ball" />
        <span className="breaker-paddle" />
      </div>
      <Button
        className="not-found-home"
        onClick={() => {
          playSound("ding");
          onHome();
        }}
        variant="default"
      >
        <PixelIcon source={homeIcon} />
        Return Home
      </Button>
    </div>
  );
}
