import { useEffect, useState, type CSSProperties } from "react";
import arrowLeftIcon from "pixelarticons/svg/arrow-left.svg?url";
import arrowRightIcon from "pixelarticons/svg/arrow-right.svg?url";
import fileTextIcon from "pixelarticons/svg/file-text.svg?url";
import mailIcon from "pixelarticons/svg/mail.svg?url";
import xIcon from "pixelarticons/svg/x.svg?url";

import type { UiSound } from "../hooks/use-ui-sounds";
import type { PortfolioSectionId } from "./portfolio-sections";
import { Button } from "./ui/8bit-button";
import { PixelIcon } from "./ui/pixel-icon";

type TutorialView = Exclude<PortfolioSectionId, "start"> | null;

interface TutorialStep {
  view: TutorialView;
  target: string;
  label: string;
  title: string;
  copy: string;
  prompt: string;
}

interface TargetRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

interface PortfolioTutorialProps {
  initialStep: number;
  onClose: () => void;
  onPause: (step: number) => void;
  onViewChange: (view: TutorialView) => void;
  playSound: (sound: UiSound, volume?: number) => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    view: null,
    target: "menu-about",
    label: "Quest marker",
    title: "Begin with the player story",
    copy: "Aditya is a Pune-based full-stack developer building Next.js applications, REST APIs, and offline-first desktop tools. He also explores street photography, game development, novels, and manga.",
    prompt: "Enter About Me",
  },
  {
    view: "about",
    target: "section-about",
    label: "Chapter 01 · About",
    title: "Dialogue reveals the character",
    copy: "The page introduces Aditya’s production experience, practical approach to managing over-engineering, creative interests, and education across Information Technology, Data Science, IAL, and IGCSE.",
    prompt: "Return to the map",
  },
  {
    view: null,
    target: "menu-skills",
    label: "New quest marker",
    title: "Inspect the character sheet",
    copy: "The working stack centers on TypeScript, JavaScript, SQL, React, Next.js, Electron, Node.js, relational databases, secure authentication, testing, CI, and workflow automation.",
    prompt: "Enter Skills",
  },
  {
    view: "skills",
    target: "section-skills",
    label: "Chapter 02 · Skills",
    title: "Tools are grouped by purpose",
    copy: "Aditya works across frontend interfaces, REST services, MySQL, PostgreSQL, SQLite, and Supabase, with experience in RBAC, OAuth PKCE, RSA licensing, webhook verification, Vitest, and GitHub Actions.",
    prompt: "Return to the map",
  },
  {
    view: null,
    target: "menu-experience",
    label: "New quest marker",
    title: "Follow the production timeline",
    copy: "At Ioncure Tech, Aditya shipped multi-tenant conference platforms, secure payment infrastructure, role-based access systems, production websites, hiring automation, and internal onboarding documentation.",
    prompt: "Enter Experience",
  },
  {
    view: "experience",
    target: "section-experience",
    label: "Chapter 03 · Experience",
    title: "Open each milestone for evidence",
    copy: "The work supported more than 20 events and 1,000 users, processed over $50K, reduced conference setup from four hours to ten minutes, and automated applicant processing.",
    prompt: "Return to the map",
  },
  {
    view: null,
    target: "menu-projects",
    label: "Boss quest located",
    title: "The strongest work is in the quest log",
    copy: "ScaleERP combines an offline-first Electron inventory and billing application with a Next.js and Supabase control plane for licensing, releases, telemetry, and documentation.",
    prompt: "Enter Projects",
  },
  {
    view: "projects",
    target: "section-projects",
    label: "Chapter 04 · Projects",
    title: "ScaleERP is the featured campaign",
    copy: "The system includes a 28-table SQLite schema, sub-50 ms search across 10,000 items, RSA-signed offline licenses, encrypted Google Drive backups, hardened APIs, and automated release checks.",
    prompt: "Reach the final checkpoint",
  },
  {
    view: null,
    target: "resume-link",
    label: "Tutorial complete",
    title: "The full save file is here",
    copy: "Aditya is a full-stack developer with production experience across TypeScript applications, desktop software, API security, payment systems, database design, automation, and collaborative delivery.",
    prompt: "One last secret",
  },
  {
    view: null,
    target: "realm-switcher",
    label: "Bonus checkpoint",
    title: "Choose the world around the work",
    copy: "The portfolio includes 52 animated pixel environments across Summer, Autumn, Winter, Forest, Mountains, Desert, Clouds, and Wasteland, with persistent sound and CRT preferences.",
    prompt: "Finish tutorial",
  },
];

const resumeUrl =
  "https://drive.google.com/file/d/1FUNXmA1O8GVfLJPOQnl_7lKeoMaarp54/view?usp=sharing";

function getStepDuration(step: TutorialStep) {
  const wordCount = `${step.title} ${step.copy}`.trim().split(/\s+/).length;
  return Math.min(22_000, Math.max(11_000, (wordCount / 130) * 60_000 + 2_500));
}

function getCalloutPosition(rect: TargetRect) {
  const gutter = 24;
  const edge = 16;
  const width = Math.min(352, window.innerWidth - edge * 2);
  const estimatedHeight = 300;
  const clampLeft = (value: number) =>
    Math.max(edge, Math.min(value, window.innerWidth - width - edge));
  const clampTop = (value: number) =>
    Math.max(edge, Math.min(value, window.innerHeight - estimatedHeight - edge));

  if (rect.left >= width + gutter + edge) {
    return {
      direction: "right",
      left: rect.left - width - gutter,
      top: clampTop(rect.top + rect.height / 2 - estimatedHeight / 2),
      width,
    };
  }

  if (window.innerWidth - rect.right >= width + gutter + edge) {
    return {
      direction: "left",
      left: rect.right + gutter,
      top: clampTop(rect.top + rect.height / 2 - estimatedHeight / 2),
      width,
    };
  }

  if (rect.top >= estimatedHeight + gutter + edge) {
    return {
      direction: "down",
      left: clampLeft(rect.left + rect.width / 2 - width / 2),
      top: rect.top - estimatedHeight - gutter,
      width,
    };
  }

  return {
    direction: "up",
    left: clampLeft(rect.left + rect.width / 2 - width / 2),
    top: clampTop(rect.bottom + gutter),
    width,
  };
}

export function PortfolioTutorial({
  initialStep,
  onClose,
  onPause,
  onViewChange,
  playSound,
}: PortfolioTutorialProps) {
  const [stepIndex, setStepIndex] = useState(initialStep);
  const [elapsed, setElapsed] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [matchedTarget, setMatchedTarget] = useState<string | null>(null);
  const [activePosition, setActivePosition] = useState<ReturnType<typeof getCalloutPosition> | null>(() => {
    if (typeof window === "undefined") return null;
    const width = Math.min(352, window.innerWidth - 32);
    return {
      direction: "up",
      left: Math.max(16, (window.innerWidth - width) / 2),
      top: Math.max(16, (window.innerHeight - 300) / 2),
      width,
    };
  });

  const step = tutorialSteps[stepIndex];
  const stepDuration = getStepDuration(step);

  useEffect(() => {
    onViewChange(step.view);
  }, []);

  useEffect(() => {
    let active = true;

    const updateTarget = () => {
      if (!active) return;
      const target = document.querySelector<HTMLElement>(
        `[data-tutorial-target="${step.target}"]`,
      );
      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const rectData: TargetRect = {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width,
      };

      setTargetRect(rectData);
      setMatchedTarget(step.target);
      setActivePosition(getCalloutPosition(rectData));
    };

    updateTarget();
    const frame = window.requestAnimationFrame(updateTarget);
    const timer1 = window.setTimeout(updateTarget, 80);
    const timer2 = window.setTimeout(updateTarget, 200);
    window.addEventListener("resize", updateTarget);
    window.addEventListener("scroll", updateTarget, true);

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("scroll", updateTarget, true);
    };
  }, [step.target, step.view]);

  const moveToStep = (nextIndex: number) => {
    const boundedIndex = Math.max(0, Math.min(nextIndex, tutorialSteps.length - 1));
    const nextStep = tutorialSteps[boundedIndex];
    setElapsed(0);
    setStepIndex(boundedIndex);
    onViewChange(nextStep.view);
    playSound("ding", 0.2);
  };

  const goNext = () => {
    if (stepIndex === tutorialSteps.length - 1) {
      playSound("chord", 0.25);
      onClose();
      return;
    }
    moveToStep(stepIndex + 1);
  };

  useEffect(() => {
    setElapsed(0);
    const startedAt = performance.now();
    const progressTimer = window.setInterval(() => {
      setElapsed(Math.min(performance.now() - startedAt, stepDuration));
    }, 100);
    const advanceTimer = window.setTimeout(goNext, stepDuration);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(advanceTimer);
    };
  }, [stepIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "Enter" || event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft" && stepIndex > 0) {
        event.preventDefault();
        moveToStep(stepIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const isStepReady = matchedTarget === step.target;
  const overlayStyle = targetRect
    ? ({
        "--tutorial-height": `${targetRect.height}px`,
        "--tutorial-left": `${targetRect.left}px`,
        "--tutorial-top": `${targetRect.top}px`,
        "--tutorial-width": `${targetRect.width}px`,
      } as CSSProperties)
    : undefined;
  const calloutStyle = activePosition
    ? ({
        "--tutorial-callout-left": `${activePosition.left}px`,
        "--tutorial-callout-top": `${activePosition.top}px`,
        "--tutorial-callout-width": `${activePosition.width}px`,
      } as CSSProperties)
    : undefined;

  return (
    <div aria-label="Guided portfolio tutorial" className="tutorial-layer" role="dialog">
      <div aria-hidden="true" className="tutorial-guard" />
      {isStepReady && targetRect && (
        <div aria-hidden="true" className="tutorial-spotlight" style={overlayStyle} />
      )}

      <div
        aria-live="polite"
        className={`tutorial-callout tutorial-arrow-${activePosition?.direction ?? "up"}${
          isStepReady ? " is-ready" : ""
        }`}
        style={calloutStyle}
      >
        <div className="tutorial-callout-topline">
          <span className="tutorial-step-label">{step.label}</span>
          <Button
            aria-label="Exit tutorial"
            className="tutorial-close"
            onClick={() => {
              playSound("ding", 0.16);
              onClose();
            }}
            title="Exit tutorial"
            variant="ghost"
          >
            <PixelIcon source={xIcon} />
          </Button>
        </div>

        <div
          aria-label={`${Math.round((elapsed / stepDuration) * 100)}% until next tutorial step`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round((elapsed / stepDuration) * 100)}
          className="tutorial-timer"
          role="progressbar"
        >
          <span
            style={
              {
                "--tutorial-time": `${Math.min((elapsed / stepDuration) * 100, 100)}%`,
              } as CSSProperties
            }
          />
        </div>

        <div aria-level={2} className="tutorial-title" role="heading">
          {step.title}
        </div>
        <div className="tutorial-copy">{step.copy}</div>

        {step.target === "resume-link" && (
          <div className="tutorial-final-actions">
            <Button
              onClick={() => {
                playSound("chord", 0.25);
                window.open(resumeUrl, "_blank", "noopener,noreferrer");
              }}
              variant="ghost"
            >
              <PixelIcon source={fileTextIcon} />
              Open resume
            </Button>
            <Button
              onClick={() => {
                playSound("chord", 0.25);
                window.location.href = "mailto:contact.aditya.pawar@gmail.com";
              }}
              variant="ghost"
            >
              <PixelIcon source={mailIcon} />
              Email
            </Button>
          </div>
        )}

        <div className="tutorial-footer">
          <div className="tutorial-buttons-row">
            <Button
              className="tutorial-explore"
              onClick={() => {
                playSound("ding", 0.16);
                onPause(stepIndex);
              }}
              variant="ghost"
            >
              Explore freely
            </Button>
            <div className="tutorial-step-nav">
              <Button
                aria-label="Previous tutorial step"
                className={`tutorial-previous${stepIndex === 0 ? " is-disabled" : ""}`}
                disabled={stepIndex === 0}
                onClick={() => {
                  if (stepIndex > 0) moveToStep(stepIndex - 1);
                }}
                variant="ghost"
              >
                <PixelIcon source={arrowLeftIcon} />
              </Button>
              <Button className="tutorial-next" onClick={goNext}>
                <span>{step.prompt}</span>
                <PixelIcon source={arrowRightIcon} />
              </Button>
            </div>
          </div>

          <div
            aria-label={`Tutorial step ${stepIndex + 1} of ${tutorialSteps.length}`}
            className="tutorial-steps-bar"
          >
            {tutorialSteps.map((tutorialStep, index) => (
              <span
                className={index <= stepIndex ? "is-complete" : ""}
                key={tutorialStep.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
