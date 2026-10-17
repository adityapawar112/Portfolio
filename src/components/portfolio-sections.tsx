import { useState, type CSSProperties, type ReactNode } from "react"
import bookIcon from "pixelarticons/svg/book-open.svg?url"
import bracesIcon from "pixelarticons/svg/braces.svg?url"
import briefcaseIcon from "pixelarticons/svg/briefcase.svg?url"
import cloudServerIcon from "pixelarticons/svg/cloud-server.svg?url"
import codeIcon from "pixelarticons/svg/code.svg?url"
import cpuIcon from "pixelarticons/svg/cpu.svg?url"
import databaseIcon from "pixelarticons/svg/database.svg?url"
import externalLinkIcon from "pixelarticons/svg/external-link.svg?url"
import gitBranchIcon from "pixelarticons/svg/git-branch.svg?url"
import githubIcon from "pixelarticons/svg/github.svg?url"
import globeIcon from "pixelarticons/svg/globe.svg?url"
import homeIcon from "pixelarticons/svg/home.svg?url"
import keyIcon from "pixelarticons/svg/key.svg?url"
import laptopIcon from "pixelarticons/svg/laptop.svg?url"
import lockIcon from "pixelarticons/svg/lock.svg?url"
import packageIcon from "pixelarticons/svg/package.svg?url"
import reactIcon from "pixelarticons/svg/react.svg?url"
import serverIcon from "pixelarticons/svg/server.svg?url"
import shieldIcon from "pixelarticons/svg/shield.svg?url"
import testTubeIcon from "pixelarticons/svg/test-tube.svg?url"
import trophyIcon from "pixelarticons/svg/trophy.svg?url"
import userIcon from "pixelarticons/svg/user.svg?url"
import windIcon from "pixelarticons/svg/wind.svg?url"
import zapIcon from "pixelarticons/svg/zap.svg?url"
import checkIcon from "pixelarticons/svg/check.svg?url"
import contactIcon from "pixelarticons/svg/contact.svg?url"
import copyIcon from "pixelarticons/svg/copy.svg?url"
import fileTextIcon from "pixelarticons/svg/file-text.svg?url"
import heartIcon from "pixelarticons/svg/heart.svg?url"
import imageIcon from "pixelarticons/svg/image.svg?url"
import linkedinIcon from "pixelarticons/svg/linkedin.svg?url"
import mailIcon from "pixelarticons/svg/mail.svg?url"
import musicIcon from "pixelarticons/svg/music.svg?url"
import chartLineIcon from "pixelarticons/svg/chart-line.svg?url"
import dockerIcon from "pixelarticons/svg/docker.svg?url"
import speedFastIcon from "pixelarticons/svg/speed-fast.svg?url"

import { realmMusicTracks } from "../data/realm-music"
import { realmCategories } from "../data/realms"
import type { UiSound } from "../hooks/use-ui-sounds"
import { Button } from "./ui/8bit-button"
import { PixelIcon } from "./ui/pixel-icon"

export type PortfolioSectionId = "start" | "about" | "skills" | "experience" | "projects" | "contact"

interface SectionProps {
  playSound: (sound: UiSound, volume?: number) => void
}

interface StartSectionProps extends SectionProps {
  onStartTutorial: () => void
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
]

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
    answer:
      "I take street photos, build small game prototypes, play video games, and read manga.",
  },
]

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
]

const experienceMilestones = [
  {
    marker: "2025",
    title: "Fullstack Developer Intern (Part-time to Full-time)",
    period: "March 2025 – July 2026",
    company: "Ioncure Tech Pvt. Ltd. · Remote",
    points: [
      {
        title: "Multi-Tenant Conference Platform",
        metric: "20+ events",
        description:
          "Built a multi-tenant conference platform using Next.js, TypeScript, and MySQL across 20+ events; implemented dynamic page templates that reduced new conference-track setup from 4 hours to 10 minutes while maintaining 98+ Lighthouse scores.",
      },
      {
        title: "Dual-Gateway Payment Pipelines",
        metric: "Zero duplicates",
        description:
          "Engineered dual-gateway payment pipelines with Razorpay and PayPal in Next.js; implemented HMAC webhook verification and idempotent transaction handling to prevent duplicate ticket allocations across multi-currency checkouts.",
      },
      {
        title: "Role-Based Access Control",
        metric: "1,000+ users",
        description:
          "Implemented role-based access control for organizers, speakers, and attendees through API middleware with tenant-scoped database queries for 1,000+ users; secured sessions with httpOnly cookies and encrypted sensitive attendee data at rest.",
      },
      {
        title: "Conference Discovery Portals",
        metric: "20+ schedules",
        description:
          "Built responsive conference discovery and registration portals using Next.js, React, and Radix UI with React Hook Form and Zod validation; implemented debounced search and URL-synchronized multi-criteria filters across 20+ event schedules.",
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
]

const languageSkills = [
  { label: "TypeScript", icon: codeIcon, duration: "24s", delay: "-3s" },
  { label: "JavaScript", icon: bracesIcon, duration: "30s", delay: "-11s" },
  { label: "SQL", icon: databaseIcon, duration: "38s", delay: "-19s" },
]

const frontendSkills = [
  { label: "React", icon: reactIcon },
  { label: "Next.js", icon: globeIcon },
  { label: "Tailwind CSS", icon: windIcon },
  { label: "Electron", icon: laptopIcon },
  { label: "Radix UI & Zod", icon: packageIcon },
]

const backendSkills = [
  { label: "Node.js", icon: serverIcon },
  { label: "REST APIs", icon: globeIcon },
  { label: "MySQL", icon: databaseIcon },
  { label: "PostgreSQL", icon: databaseIcon },
  { label: "SQLite", icon: packageIcon },
  { label: "Supabase", icon: cloudServerIcon },
]

const securitySkills = [
  { label: "RBAC", icon: shieldIcon },
  { label: "OAuth 2.0 (PKCE)", icon: keyIcon },
  { label: "RSA", icon: lockIcon },
  { label: "Webhook verification", icon: cloudServerIcon },
]

const devopsSkills = [
  { label: "Docker", icon: dockerIcon },
  { label: "Kubernetes (k3s)", icon: cloudServerIcon },
  { label: "Helm & Terraform", icon: packageIcon },
  { label: "GitHub Actions", icon: githubIcon },
  { label: "Git", icon: gitBranchIcon },
]

const testingSkills = [
  { label: "Vitest", icon: testTubeIcon },
  { label: "k6 Load Testing", icon: speedFastIcon },
  { label: "Prometheus & Grafana", icon: chartLineIcon },
]

const automationSkills = [
  { label: "OpenAI API", icon: cpuIcon },
  { label: "Zapier", icon: zapIcon },
]

const projects = [
  {
    name: "SynapseState",
    subtitle: "Node.js · PostgreSQL · k3s · Vitest · k6",
    github: "https://github.com/adityapawar112/SynapseState",
    live: "https://github.com/adityapawar112/SynapseState/releases",
    features: [
      "Provisioned containerized infrastructure on k3s using Terraform and Helm to deploy the Node.js control plane and PostgreSQL; configured automated database migrations, remote state locking, and non-root container deployments.",
      "Built multi-stage CI/CD pipelines in GitHub Actions with Docker Buildx and Trivy vulnerability scans; automated multi-package test runs with PostgreSQL 16 service containers and published versioned images to GitHub Container Registry (GHCR).",
      "Engineered k6 load-testing suites and Prometheus monitoring to benchmark in-memory flag lookups and stress-test state synchronization across 100 concurrent workers; verified cluster-wide lease propagation under 0.5 s with zero dropped requests.",
      "Wrote Vitest integration and conformance test suites validating cryptographic signature verification, payload canonicalization, and expiry boundaries; tested local file fallbacks to maintain overrides during network partitions and automated PR promotion.",
    ],
    technologies: [
      { label: "Node.js", icon: serverIcon },
      { label: "TypeScript", icon: codeIcon },
      { label: "PostgreSQL", icon: databaseIcon },
      { label: "Docker", icon: dockerIcon },
      { label: "k3s", icon: cloudServerIcon },
      { label: "Vitest", icon: testTubeIcon },
      { label: "k6", icon: speedFastIcon },
      { label: "Prometheus", icon: chartLineIcon },
    ],
    media: [
      {
        src: "/projects/synapsestate/control-plane-architecture.webp",
        alt: "SynapseState control plane and in-process state delivery architecture",
      },
      {
        src: "/projects/synapsestate/k6-load-benchmark.webp",
        alt: "k6 load testing telemetry: 100 concurrent workers, sub-0.5s propagation, 0 dropped requests",
      },
      {
        src: "/projects/synapsestate/k3s-cluster-deployment.webp",
        alt: "k3s containerized cluster pods, Helm charts, and Prometheus metrics",
      },
      {
        src: "/projects/synapsestate/demo-shop-evaluation.webp",
        alt: "Live OpenFeature flag evaluation and in-process targeting engine in demo-shop",
      },
      {
        src: "/projects/synapsestate/vitest-crypto-coverage.webp",
        alt: "Vitest test runner and V8 code coverage: 20 test files passed, 199 tests, 99.4% coverage",
      },
      {
        src: "/projects/synapsestate/github-actions-cicd.webp",
        alt: "GitHub Actions CI/CD matrix: multi-arch Docker Buildx, Trivy scans, and GHCR publishing",
      },
      {
        src: "/projects/synapsestate/openfeature-provider-lifecycle.webp",
        alt: "OpenFeature custom OverrideProvider evaluation lifecycle and 99ns hot-path resolution",
      },
      {
        src: "/projects/synapsestate/postgres-schema-state-machine.webp",
        alt: "PostgreSQL 16 relational model, atomic leases, and SHA-256 hash-chained audit ledger",
      },
    ],
  },
  {
    name: "ScaleERP-Desktop",
    subtitle: "Electron · React · SQLite",
    github: "https://github.com/adityapawar112/ScaleERP-Desktop",
    live: "https://scale-erp.vercel.app/",
    features: [
      "Built an offline-first inventory and billing desktop app with Electron, React, and SQLite; designed a 28-table schema with ledger-reversal safeguards and implemented FTS5 indexing for sub-millisecond local search across 10,000+ items.",
      "Secured desktop IPC boundaries using Electron context bridges and typed channels, isolating the React UI from direct OS calls and validating all SQLite queries inside the main process.",
      "Implemented Google Drive backup and restore with OAuth 2.0 PKCE, encrypted token storage, a durable upload queue with exponential-backoff retries, and SHA-256-verified SQLite snapshots for reliable recovery.",
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
      {
        src: "/projects/scalerp-desktop/whatsapp-manager.webp",
        alt: "ScaleERP WhatsApp manager",
      },
      {
        src: "/projects/scalerp-desktop/add-transaction.webp",
        alt: "ScaleERP add transaction form",
      },
      {
        src: "/projects/scalerp-desktop/custom-bills.webp",
        alt: "ScaleERP custom invoice settings",
      },
      {
        src: "/projects/scalerp-desktop/invoice-preview.webp",
        alt: "ScaleERP supplier invoice preview",
      },
      {
        src: "/projects/scalerp-desktop/marathi-dashboard.webp",
        alt: "ScaleERP dashboard in Marathi",
      },
      {
        src: "/projects/scalerp-desktop/reports-analysis.webp",
        alt: "ScaleERP reports and analysis",
      },
    ],
  },
  {
    name: "ScaleERP-Web",
    subtitle: "Next.js · React · Supabase",
    github: "https://github.com/adityapawar112/ScaleERP-Web",
    live: "https://scale-erp.vercel.app/",
    features: [
      "Built the Next.js 15 cloud portal and licensing control plane connected to Supabase PostgreSQL; implemented RSA-signed offline key verification with a 30-day grace period, device quotas, and interactive pricing with i18n localization.",
      "Hardened REST APIs with schema validation, structured error responses, rate limiting, device-quota enforcement, and security audit logging.",
      "Handled client heartbeat ingestion to record workstation telemetry, audit active device allocations, and detect clock-rollback anomalies.",
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
      {
        src: "/projects/scalerp-web/landing-scalererp-web.webp",
        alt: "ScaleERP website landing page",
      },
      {
        src: "/projects/scalerp-web/features-scalererp-web.webp",
        alt: "ScaleERP website platform page",
      },
    ],
  },
]

function SectionHeading({
  action,
  className,
  description,
  icon,
  title,
  tutorialTarget,
}: {
  action?: ReactNode
  className?: string
  description: string
  icon: string
  title: string
  tutorialTarget?: string
}) {
  return (
    <div
      className={`section-heading${action ? " section-heading-with-action" : ""}${className ? ` ${className}` : ""}`}
      data-tutorial-target={tutorialTarget}
    >
      <PixelIcon className="section-heading-icon" source={icon} />
      <div className="section-heading-text">
        <div aria-level={2} className="section-title" role="heading">
          {title}
        </div>
        <div className="section-description">{description}</div>
      </div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  )
}

export function AboutSection({ playSound }: SectionProps) {
  const [mode, setMode] = useState<"professional" | "cat">("professional")
  const isCatMode = mode === "cat"
  const conversations = isCatMode ? catConversations : professionalConversations

  const selectMode = (nextMode: "professional" | "cat") => {
    if (nextMode === mode) return
    setMode(nextMode)
    playSound("ding", 0.2)
  }

  return (
    <div className="content-section">
      <SectionHeading
        className="about-section-heading"
        action={
          <div
            aria-label="About conversation mode"
            className="about-mode-toggle"
            role="group"
          >
            <Button
              aria-label="Use HR mode"
              aria-pressed={!isCatMode}
              className="about-mode-button"
              onClick={() => selectMode("professional")}
              onPointerEnter={() => playSound("boop", 0.1)}
              title="HR mode"
              variant={!isCatMode ? "default" : "ghost"}
            >
              <PixelIcon source={briefcaseIcon} />
              <span>HR</span>
            </Button>
            <Button
              aria-label="Use Cat mode"
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
              <span>Cat</span>
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
                <div
                  aria-label="Byte the pixel cat"
                  className="pixel-cat"
                  role="img"
                >
                  <span className="cat-ear cat-ear-left" />
                  <span className="cat-ear cat-ear-right" />
                  <span className="cat-eye cat-eye-left" />
                  <span className="cat-eye cat-eye-right" />
                  <span className="cat-nose" />
                </div>
              ) : (
                <div
                  aria-label="Recruiter"
                  className="human-avatar recruiter-avatar"
                  role="img"
                >
                  HR
                </div>
              )}
              <div className="dialogue-box">
                <div className="dialogue-speaker">
                  {isCatMode ? "Cat" : "Recruiter"}
                </div>
                <div className="dialogue-copy">{exchange.question}</div>
                <span aria-hidden="true" className="dialogue-next" />
              </div>
            </div>
            <div className="dialogue-row dialogue-row-reverse">
              <div
                aria-label="Aditya Pawar"
                className="human-avatar"
                role="img"
              >
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
  )
}

export function StartSection({
  onStartTutorial,
  playSound,
}: StartSectionProps) {
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
            Follow the guide through each menu chapter. You can leave the
            tutorial at any time.
          </div>
        </div>
        <Button
          className="tutorial-launch-button"
          onClick={() => {
            playSound("chord", 0.25)
            onStartTutorial()
          }}
        >
          Begin tutorial
        </Button>
      </div>
    </div>
  )
}

function openProjectLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

export function ProjectsSection({ playSound }: SectionProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(0)
  const [mediaIndexes, setMediaIndexes] = useState(() => projects.map(() => 0))

  const moveCarousel = (projectIndex: number, direction: number) => {
    setMediaIndexes((current) =>
      current.map((mediaIndex, index) => {
        if (index !== projectIndex) return mediaIndex
        return (
          (mediaIndex + direction + projects[index].media.length) %
          projects[index].media.length
        )
      }),
    )
    playSound("ding", 0.15)
  }

  return (
    <div className="content-section content-section-wide">
      <SectionHeading
        description="Flagship distributed systems, offline-first desktop software, and cloud licensing engines."
        icon={trophyIcon}
        title="Project Quest Log"
        tutorialTarget="section-projects"
      />
      <div className="project-list">
        {projects.map((project, projectIndex) => {
          const activeMedia = mediaIndexes[projectIndex]

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
                        playSound("chord", 0.3)
                        openProjectLink(project.github)
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
                        playSound("chord", 0.3)
                        openProjectLink(project.live)
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
                    )
                    playSound("ding", 0.2)
                  }}
                  variant="ghost"
                >
                  <span className="project-identity">
                    <span className="card-title">{project.name}</span>
                  </span>
                  <span className="project-trigger-hint">
                    <span>
                      {expandedProject === projectIndex
                        ? "Hide details"
                        : "View details"}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`quest-chevron${
                        expandedProject === projectIndex ? " is-open" : ""
                      }`}
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
                        <div
                          className="project-carousel-dots"
                          aria-hidden="true"
                        >
                          {project.media.map((media, mediaIndex) => (
                            <span
                              className={
                                mediaIndex === activeMedia ? "is-active" : ""
                              }
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
          )
        })}
      </div>
    </div>
  )
}

export function ExperienceSection({ playSound }: SectionProps) {
  const [expandedRole, setExpandedRole] = useState<number | null>(null)
  const [expandedPoints, setExpandedPoints] = useState<Set<string>>(
    () => new Set(),
  )

  const togglePoint = (pointId: string) => {
    setExpandedPoints((current) => {
      const next = new Set(current)
      if (next.has(pointId)) {
        next.delete(pointId)
      } else {
        next.add(pointId)
      }
      return next
    })
  }

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
            className={`timeline-entry${
              index % 2 ? " timeline-entry-right" : ""
            }`}
            key={`${event.title}-${index}`}
          >
            <div className="timeline-marker">{event.marker}</div>
            <div className="pixel-card timeline-card">
              <Button
                aria-expanded={expandedRole === index}
                className="timeline-position-trigger"
                onClick={() => {
                  playSound("ding", 0.2)
                  setExpandedRole((current) =>
                    current === index ? null : index,
                  )
                }}
                onPointerEnter={() => playSound("boop", 0.12)}
                variant="ghost"
              >
                <span className="card-title">{event.title}</span>
                <span
                  aria-hidden="true"
                  className={`quest-chevron${
                    expandedRole === index ? " is-open" : ""
                  }`}
                />
              </Button>

              <div
                aria-hidden={expandedRole !== index}
                className={`timeline-point-panel${
                  expandedRole === index ? " is-open" : ""
                }`}
              >
                <div className="timeline-point-list">
                  {event.points.map((point, pointIndex) => {
                    const pointId = `${index}-${pointIndex}`
                    const isExpanded = expandedPoints.has(pointId)

                    return (
                      <div className="timeline-point" key={point.description}>
                        <div className="timeline-point-heading">
                          <span>{point.title}</span>
                          <span>{point.metric}</span>
                        </div>
                        <div
                          className={`timeline-point-body${
                            isExpanded ? " is-expanded" : ""
                          }`}
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
                              playSound("ding", 0.16)
                              togglePoint(pointId)
                            }}
                            tabIndex={expandedRole === index ? 0 : -1}
                            variant="ghost"
                          >
                            {isExpanded ? "Show less" : "..."}
                          </Button>
                        </div>
                      </div>
                    )
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
  )
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
            <div className="card-subtitle">
              Fullstack Developer · Builder Class
            </div>
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
              <span className="equipment-slot">Cloud & DevOps</span>
              <div className="equipment-items">
                {devopsSkills.map((skill) => (
                  <span className="equipment-item" key={skill.label}>
                    <PixelIcon source={skill.icon} />
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="equipment-row">
              <span className="equipment-slot">Testing & QA</span>
              <div className="equipment-items">
                {testingSkills.map((skill) => (
                  <span className="equipment-item" key={skill.label}>
                    <PixelIcon source={skill.icon} />
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
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
              <span className="equipment-slot">Automation</span>
              <div className="equipment-items">
                {automationSkills.map((skill) => (
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
  )
}

export function NotFoundSection({
  onHome,
  playSound,
}: SectionProps & { onHome: () => void }) {
  return (
    <div className="content-section not-found-section">
      <div className="not-found-title">ERROR 404</div>
      <div className="section-title">Break out of here</div>
      <div className="section-description">
        That route fell outside the map. Clear the wall or return home.
      </div>
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
          playSound("ding")
          onHome()
        }}
        variant="default"
      >
        <PixelIcon source={homeIcon} />
        Return Home
      </Button>
    </div>
  )
}

const contactChannels = [
  {
    id: "email",
    title: "Direct Mail",
    subtitle: "contact.aditya.pawar@gmail.com",
    description:
      "Best channel for job opportunities, contracts, engineering discussions, and direct inquiries.",
    actionLabel: "Send Transmission",
    actionUrl: "mailto:contact.aditya.pawar@gmail.com",
    icon: mailIcon,
    copyValue: "contact.aditya.pawar@gmail.com",
  },
  {
    id: "linkedin",
    title: "LinkedIn Network",
    subtitle: "adityapawar112",
    description:
      "Professional background, career updates, collaborative connections, and peer recommendations.",
    actionLabel: "View Profile",
    actionUrl: "https://www.linkedin.com/in/adityapawar112/",
    icon: linkedinIcon,
  },
  {
    id: "github",
    title: "GitHub Repositories",
    subtitle: "@adityapawar112",
    description:
      "Production codebases, open-source utilities, offline-first architectures, and experiments.",
    actionLabel: "Open GitHub",
    actionUrl: "https://github.com/adityapawar112",
    icon: githubIcon,
  },
  {
    id: "resume",
    title: "Curriculum Vitae",
    subtitle: "Aditya Pawar - Fullstack Developer",
    description:
      "Comprehensive PDF detailing hands-on production engineering, tech stack, and achievements.",
    actionLabel: "View Resume (PDF)",
    actionUrl:
      "https://drive.google.com/file/d/1FUNXmA1O8GVfLJPOQnl_7lKeoMaarp54/view?usp=sharing",
    icon: fileTextIcon,
  },
]

const generalAttributions = [
  {
    title: "CraftPix Parallax Backgrounds",
    category: "Environment Pixel Art",
    author: "CraftPix.net",
    description:
      "All 52 layered looping pixel environments across Summer, Autumn, Winter, Forest, Mountains, Desert, Clouds, and Wasteland.",
    primaryUrl: "https://craftpix.net",
    primaryLabel: "CraftPix.net",
    secondaryUrl: "https://craftpix.net/file-licenses/",
    secondaryLabel: "CraftPix File Licenses",
  },
  {
    title: "8bitcn",
    category: "Design System & Primitives",
    author: "8bitcn",
    description:
      "Retro 8-bit component primitives and pixel-art aesthetics adapted for React and Tailwind CSS.",
    primaryUrl: "https://www.8bitcn.com/",
    primaryLabel: "8bitcn.com",
  },
  {
    title: "Google Fonts",
    category: "Typography",
    author: "Stefie Justprince & Oliver Schöndorfer",
    description:
      "Pixelify Sans (display titles and headlines) and Jersey 10 (body copy, retro stats, and metadata numbers).",
    primaryUrl:
      "https://fonts.google.com/share?selection.family=Jersey+10|Pixelify+Sans:wght@400..700",
    primaryLabel: "Google Fonts Selection",
  },
  {
    title: "Pixelarticons",
    category: "Icons & Cursors",
    author: "Gerrit Halfmann",
    description:
      "Open-source pixel-art SVG icon system and custom retro pixel sword / pointer cursor graphics.",
    primaryUrl: "https://pixelarticons.com/",
    primaryLabel: "pixelarticons.com",
  },
  {
    title: "Retro UI Sound Effects",
    category: "Interface Audio",
    author: "Ambroggio",
    description:
      "8-bit synthesized retro audio feedback (Boop for hover, Ding for action, Chord for checkpoint/redirect).",
    primaryUrl: "https://ambroggiomusic.itch.io/retro-ui-sfx",
    primaryLabel: "itch.io Sound Pack",
  },
  {
    title: "Web Engine & Deployment",
    category: "Web Infrastructure",
    author: "Open Source Ecosystem",
    description:
      "Built with React 19, TypeScript, Vite 8, Tailwind CSS v4, and deployed on Vercel with Web Analytics and Speed Insights.",
    primaryUrl: "https://vercel.com",
    primaryLabel: "Deployed on Vercel",
  },
]

export function ContactSection({ playSound }: SectionProps) {
  const [activeTab, setActiveTab] = useState<"contact" | "attributions">(
    "contact",
  )
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact.aditya.pawar@gmail.com")
      setCopiedEmail(true)
      playSound("ding", 0.2)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      // ignore
    }
  }

  const openExternal = (url: string) => {
    playSound("chord", 0.3)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const openMail = () => {
    playSound("chord", 0.3)
    window.location.href = "mailto:contact.aditya.pawar@gmail.com"
  }

  return (
    <div className="content-section">
      <SectionHeading
        className="contact-section-heading"
        action={
          <div
            aria-label="Contact section views"
            className="contact-tab-toggle"
            role="group"
          >
            <Button
              aria-label="Contact channels"
              aria-pressed={activeTab === "contact"}
              className="contact-tab-button"
              onClick={() => {
                setActiveTab("contact")
                playSound("ding", 0.2)
              }}
              onPointerEnter={() => playSound("boop", 0.1)}
              title="Contact channels"
              variant={activeTab === "contact" ? "default" : "ghost"}
            >
              <PixelIcon source={mailIcon} />
              <span>Contact</span>
            </Button>
            <Button
              aria-label="Credits and attributions"
              aria-pressed={activeTab === "attributions"}
              className="contact-tab-button"
              onClick={() => {
                setActiveTab("attributions")
                playSound("ding", 0.2)
              }}
              onPointerEnter={() => playSound("boop", 0.1)}
              title="Credits & Attributions"
              variant={activeTab === "attributions" ? "default" : "ghost"}
            >
              <PixelIcon source={heartIcon} />
              <span>Credits</span>
            </Button>
          </div>
        }
        description={
          activeTab === "contact"
            ? "Direct communication channels, resume, and availability."
            : "Open-source tools, sound effects, retro fonts, and pixel art attributions."
        }
        icon={contactIcon}
        title={activeTab === "contact" ? "Contact" : "Credits & Attributions"}
        tutorialTarget="section-contact"
      />

      {activeTab === "contact" ? (
        <>
          <div className="pixel-card contact-availability-card">
            <div className="card-topline">
              <span className="status-badge">Available Now</span>
              <span className="contact-location">
                Pune, India · Remote / On-Site
              </span>
            </div>
            <div className="card-title">Open for Engineering Roles</div>
            <div className="card-copy">
              Actively seeking full-time Fullstack, Frontend, or Backend
              developer roles. Experienced in building Next.js web applications,
              REST APIs, and offline-first desktop systems.
            </div>
          </div>

          <div className="contact-grid">
            {contactChannels.map((channel) => (
              <div className="pixel-card contact-card" key={channel.id}>
                <div>
                  <div className="contact-card-header">
                    <div className="contact-card-icon">
                      <PixelIcon source={channel.icon} />
                    </div>
                    <div>
                      <div className="card-title">{channel.title}</div>
                      <div className="card-subtitle">{channel.subtitle}</div>
                    </div>
                  </div>
                  <div className="card-copy">{channel.description}</div>
                </div>

                <div className="contact-card-actions">
                  <Button
                    className="contact-action-btn"
                    onClick={() => {
                      if (channel.id === "email") {
                        openMail()
                      } else {
                        openExternal(channel.actionUrl)
                      }
                    }}
                    onPointerEnter={() => playSound("boop", 0.1)}
                    variant="default"
                  >
                    <PixelIcon
                      source={
                        channel.id === "email" ? mailIcon : externalLinkIcon
                      }
                    />
                    {channel.actionLabel}
                  </Button>

                  {channel.copyValue && (
                    <Button
                      aria-label="Copy email address"
                      className="contact-copy-btn"
                      onClick={handleCopyEmail}
                      onPointerEnter={() => playSound("boop", 0.1)}
                      title="Copy email to clipboard"
                      variant="ghost"
                    >
                      <PixelIcon source={copiedEmail ? checkIcon : copyIcon} />
                      {copiedEmail ? "Copied!" : "Copy"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pixel-card attribution-banner-card">
            <div>
              <div className="card-title">Portfolio Credits & Attributions</div>
              <div className="card-copy">
                Explore the Golden Sun soundtrack links, 8bitcn UI primitives,
                Google Fonts, CraftPix backgrounds, and Ambroggio sound effects.
              </div>
            </div>
            <Button
              className="attribution-banner-btn"
              onClick={() => {
                setActiveTab("attributions")
                playSound("ding", 0.2)
              }}
              onPointerEnter={() => playSound("boop", 0.1)}
              variant="default"
            >
              <PixelIcon source={heartIcon} />
              View All Attributions
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="pixel-card attribution-intro-card">
            <div className="card-topline">
              <span className="status-badge">Credits</span>
              <span className="roadmap-detail">Heritage & Open Source</span>
            </div>
            <div className="card-title">Acknowledgments & Attributions</div>
            <div className="card-copy">
              Honoring the classic games, sound artists, font designers, and
              open-source packages that power this 16-bit retro experience.
            </div>
          </div>

          <div className="attribution-group">
            <div className="attribution-group-header">
              <div className="attribution-group-title">
                <PixelIcon source={musicIcon} />
                <span>Realm Background Music — Golden Sun & The Lost Age</span>
              </div>
              <div className="attribution-group-subtitle">
                Composed by Motoi Sakuraba · © Camelot Software Planning /
                Nintendo
              </div>
              <div className="attribution-group-desc">
                <span>
                  Soundtrack catalog and internal Battle Mode player reference:
                </span>
                <Button
                  className="inline-credit-link"
                  onClick={() =>
                    openExternal("https://goldensunwiki.net/wiki/Music")
                  }
                  onPointerEnter={() => playSound("boop", 0.1)}
                  variant="ghost"
                >
                  <PixelIcon source={externalLinkIcon} />
                  Golden Sun Wiki Music Page
                </Button>
              </div>
            </div>

            <div className="attribution-music-grid">
              {realmCategories.map((category) => {
                const track = realmMusicTracks[category.id]
                return (
                  <div
                    className="pixel-card attribution-music-card"
                    key={category.id}
                  >
                    <div className="music-card-header">
                      <span
                        className={`status-badge music-category-badge theme-${category.id}`}
                      >
                        {category.label}
                      </span>
                      <span className="music-badge-pill">
                        {track.badgeLabel}
                      </span>
                    </div>
                    <div className="music-card-title">{track.title}</div>
                    <div className="music-card-game">
                      {track.game === "GS"
                        ? "Golden Sun (GS)"
                        : "The Lost Age (TLA)"}
                    </div>
                    <Button
                      className="music-listen-btn"
                      onClick={() => openExternal(track.youtubeUrl)}
                      onPointerEnter={() => playSound("boop", 0.1)}
                      variant="ghost"
                    >
                      <PixelIcon source={externalLinkIcon} />
                      Listen on YouTube
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="attribution-group">
            <div className="attribution-group-header">
              <div className="attribution-group-title">
                <PixelIcon source={imageIcon} />
                <span>Art, Typography, UI Primitives & Audio</span>
              </div>
              <div className="attribution-group-subtitle">
                Digital assets and open-source frameworks powering the portfolio
              </div>
            </div>

            <div className="attribution-grid">
              {generalAttributions.map((resource) => (
                <div
                  className="pixel-card attribution-card"
                  key={resource.title}
                >
                  <div>
                    <div className="card-topline">
                      <span className="status-badge">{resource.category}</span>
                      <span className="roadmap-detail">{resource.author}</span>
                    </div>
                    <div className="card-title">{resource.title}</div>
                    <div className="card-copy">{resource.description}</div>
                  </div>

                  <div className="attribution-card-actions">
                    <Button
                      className="attribution-btn"
                      onClick={() => openExternal(resource.primaryUrl)}
                      onPointerEnter={() => playSound("boop", 0.1)}
                      variant="ghost"
                    >
                      <PixelIcon source={externalLinkIcon} />
                      {resource.primaryLabel}
                    </Button>

                    {resource.secondaryUrl && (
                      <Button
                        className="attribution-btn"
                        onClick={() => openExternal(resource.secondaryUrl)}
                        onPointerEnter={() => playSound("boop", 0.1)}
                        variant="ghost"
                      >
                        <PixelIcon source={externalLinkIcon} />
                        {resource.secondaryLabel}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-switch-footer">
            <Button
              onClick={() => {
                setActiveTab("contact")
                playSound("ding", 0.2)
              }}
              onPointerEnter={() => playSound("boop", 0.1)}
              variant="default"
            >
              <PixelIcon source={mailIcon} />← Back to Contact Transmissions
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
