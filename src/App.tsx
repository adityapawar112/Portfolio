import { useCallback, useEffect, useRef, useState } from "react";
import arrowLeftIcon from "pixelarticons/svg/arrow-left.svg?url";
import fileTextIcon from "pixelarticons/svg/file-text.svg?url";
import githubIcon from "pixelarticons/svg/github.svg?url";
import linkedinIcon from "pixelarticons/svg/linkedin.svg?url";
import mailIcon from "pixelarticons/svg/mail.svg?url";

import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  NotFoundSection,
  ProjectsSection,
  SkillsSection,
  StartSection,
  type PortfolioSectionId,
} from "./components/portfolio-sections";
import { PortfolioTutorial } from "./components/portfolio-tutorial";
import { RealmSwitcher } from "./components/realm-switcher";
import { Button } from "./components/ui/8bit-button";
import { PixelIcon } from "./components/ui/pixel-icon";
import { realms, type RealmCategoryId } from "./data/realms";
import { useBackgroundMusic } from "./hooks/use-background-music";
import { useUiSounds } from "./hooks/use-ui-sounds";
import { initializeAnalytics, trackPageView } from "./lib/analytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const menuItems = [
  {
    id: "start",
    label: "Start",
    description: "Begin the adventure",
  },
  {
    id: "about",
    label: "About Me",
    description: "Summary",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Tools, languages & systems",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Where I have shipped",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Selected builds",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Channels & credits",
  },
] as const satisfies ReadonlyArray<{
  id: PortfolioSectionId;
  label: string;
  description: string;
}>;

const initialRealm = realms.find((realm) => realm.id === "forest-and-trees-3") ?? realms[0];

function getLayerDuration(index: number, layerCount: number) {
  if (layerCount === 1) return "70s";

  // Keep the approved eight-layer curve unchanged. Other scene sizes use
  // stronger spacing between adjacent layers so their motion stays distinct.
  if (layerCount === 8) {
    return `${Math.round(520 / 1.48 ** index)}s`;
  }

  const depthFromFront = layerCount - 1 - index;
  const fastestDuration = layerCount > 8 ? 18 : 20;
  const layerRatio = layerCount <= 4 ? 2.05 : layerCount <= 7 ? 1.65 : 1.46;

  return `${Math.round(fastestDuration * layerRatio ** depthFromFront)}s`;
}

function getRouteFromHash(): PortfolioSectionId | "404" | null {
  const route = window.location.hash.slice(1);
  if (!route) return null;
  return menuItems.some((item) => item.id === route) ? (route as PortfolioSectionId) : "404";
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<PortfolioSectionId | "404" | null>(
    getRouteFromHash,
  );
  const [activeRealm, setActiveRealm] = useState(initialRealm);
  const [previewCategory, setPreviewCategory] = useState<RealmCategoryId | null>(null);
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorialCheckpoint, setTutorialCheckpoint] = useState<number | null>(null);
  const [isCrtEnabled, setIsCrtEnabled] = useState(
    () => localStorage.getItem("portfolio-crt") !== "false",
  );
  const [analyticsConsent, setAnalyticsConsent] = useState<"accepted" | "declined" | null>(() => {
    const savedConsent = localStorage.getItem("portfolio-analytics-consent");
    return savedConsent === "accepted" || savedConsent === "declined" ? savedConsent : null;
  });
  const menuRef = useRef<HTMLElement>(null);
  const { isMuted, playSound, toggleMuted } = useUiSounds();

  const effectiveCategory = previewCategory ?? activeRealm.category;
  useBackgroundMusic({
    category: effectiveCategory,
    isMuted,
  });

  const selectItem = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const navigateToSection = useCallback((section: PortfolioSectionId) => {
    window.history.pushState(null, "", `#${section}`);
    setActiveSection(section);
  }, []);

  const returnHome = useCallback(() => {
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
    setActiveSection(null);
  }, []);

  const showTutorialView = useCallback((section: Exclude<PortfolioSectionId, "start"> | null) => {
    const destination = section
      ? `${window.location.pathname}${window.location.search}#${section}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", destination);
    setActiveSection(section);
  }, []);

  const startTutorial = useCallback(() => {
    showTutorialView(null);
    setIsTutorialActive(true);
  }, [showTutorialView]);

  useEffect(() => {
    const handleHashChange = () => setActiveSection(getRouteFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-crt", String(isCrtEnabled));
  }, [isCrtEnabled]);

  useEffect(() => {
    let isActive = true;
    const startedAt = performance.now();
    const fallbackTimer = window.setTimeout(() => {
      if (isActive) setIsLoading(false);
    }, 3000);

    const layers = Array.from({ length: initialRealm.layerCount }, (_, index) => {
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = `/realms/${initialRealm.id}/layer-${index + 1}.webp`;
      });
    });

    void Promise.all(layers).then(() => {
      const remainingDelay = Math.max(0, 900 - (performance.now() - startedAt));
      window.setTimeout(() => {
        if (isActive) setIsLoading(false);
      }, remainingDelay);
    });

    return () => {
      isActive = false;
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (analyticsConsent !== "accepted") return;
    initializeAnalytics();
    trackPageView(`${window.location.pathname}${window.location.hash}`);
  }, [activeSection, analyticsConsent]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeSection || isTutorialActive) return;
      if (document.getElementById("realm-popover")) return;
      if (!["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;

      event.preventDefault();

      if (event.key === "Enter") {
        playSound(menuItems[selectedIndex].id === "start" ? "chord" : "ding");
        if (menuItems[selectedIndex].id === "start") {
          startTutorial();
        } else {
          navigateToSection(menuItems[selectedIndex].id);
        }
        return;
      }

      playSound("boop", 0.2);
      setSelectedIndex((current) => {
        if (event.key === "ArrowDown") {
          return (current + 1) % menuItems.length;
        }

        return (current - 1 + menuItems.length) % menuItems.length;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeSection,
    isTutorialActive,
    navigateToSection,
    playSound,
    selectedIndex,
    startTutorial,
  ]);

  useEffect(() => {
    if (activeSection) return;
    const activeButton = menuRef.current?.querySelector<HTMLButtonElement>(
      `[data-menu-index="${selectedIndex}"]`,
    );
    activeButton?.focus({ preventScroll: true });
  }, [activeSection, selectedIndex]);

  const sectionContent = (() => {
    switch (activeSection) {
      case "start":
        return <StartSection onStartTutorial={startTutorial} playSound={playSound} />;
      case "about":
        return <AboutSection playSound={playSound} />;
      case "skills":
        return <SkillsSection />;
      case "experience":
        return <ExperienceSection playSound={playSound} />;
      case "projects":
        return <ProjectsSection playSound={playSound} />;
      case "contact":
        return <ContactSection playSound={playSound} />;
      case "404":
        return <NotFoundSection onHome={returnHome} playSound={playSound} />;
      default:
        return null;
    }
  })();

  return (
    <main
      className={`portfolio-shell theme-${activeRealm.category}${isCrtEnabled ? " crt-enabled" : ""}`}
    >
      <div aria-hidden="true" className="parallax-scene" key={activeRealm.id}>
        {Array.from({ length: activeRealm.layerCount }, (_, index) => (
          <div
            className="parallax-layer"
            key={`${activeRealm.id}-${index}`}
            style={
              {
                "--layer-image": `url("/realms/${activeRealm.id}/layer-${index + 1}.webp")`,
                "--layer-duration": getLayerDuration(index, activeRealm.layerCount),
                "--layer-index": index,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div aria-hidden="true" className="scene-light" />
      <div aria-hidden="true" className="crt-scanlines" />

      <RealmSwitcher
        activeRealm={activeRealm}
        isCrtEnabled={isCrtEnabled}
        isMuted={isMuted}
        onPreviewCategoryChange={setPreviewCategory}
        onRealmChange={setActiveRealm}
        onToggleCrt={() => setIsCrtEnabled((current) => !current)}
        onToggleMuted={toggleMuted}
        playSound={playSound}
      />

      {activeSection ? (
        <section aria-label="Portfolio section" className="section-shell">
          {activeSection !== "404" && (
            <Button
              className="section-back"
              onClick={() => {
                playSound("ding");
                returnHome();
              }}
              variant="default"
            >
              <PixelIcon source={arrowLeftIcon} />
              Main Menu
            </Button>
          )}
          <div className="section-scroll">{sectionContent}</div>
        </section>
      ) : (
        <>
          <section aria-labelledby="portfolio-title" className="title-lockup">
            <div className="title-kicker">Portfolio</div>
            <div aria-level={1} className="portfolio-title" id="portfolio-title" role="heading">
              Aditya Pawar
            </div>
            <div className="portfolio-subtitle">Fullstack Developer</div>
            <div aria-hidden="true" className="title-rule">
              <span />
            </div>
          </section>

          <section aria-label="Portfolio navigation" className="menu-panel">
            <div className="menu-heading">Select a chapter</div>
            <nav aria-label="Main menu" className="menu-list" ref={menuRef}>
              {menuItems.map((item, index) => {
                const isSelected = selectedIndex === index;

                return (
                  <Button
                    aria-current={isSelected ? "page" : undefined}
                    className={`menu-button${item.id === "start" ? " menu-button-start" : ""}`}
                    data-menu-index={index}
                    data-tutorial-target={`menu-${item.id}`}
                    key={item.label}
                    onClick={() => {
                      selectItem(index);
                      playSound(item.id === "start" ? "chord" : "ding");
                      if (item.id === "start") {
                        startTutorial();
                      } else {
                        navigateToSection(item.id);
                      }
                    }}
                    onFocus={() => selectItem(index)}
                    onPointerEnter={() => {
                      selectItem(index);
                      playSound("boop", 0.16);
                    }}
                    tabIndex={isSelected ? 0 : -1}
                    variant={isSelected ? "default" : "ghost"}
                  >
                    <span aria-hidden="true" className="menu-cursor" />
                    <span className="menu-label">{item.label}</span>
                  </Button>
                );
              })}
            </nav>

            <div aria-live="polite" className="menu-status">
              <span className="status-label">{menuItems[selectedIndex].description}</span>
            </div>
          </section>

          <div aria-label="Social links" className="footer-meta footer-meta-left" role="group">
            <Button
              aria-label="Email Aditya Pawar"
              className="social-link"
              onClick={() => {
                playSound("chord", 0.3);
                window.location.href = "mailto:contact.aditya.pawar@gmail.com";
              }}
              title="Email"
              variant="ghost"
            >
              <PixelIcon source={mailIcon} />
            </Button>
            <Button
              aria-label="Open Aditya Pawar on LinkedIn"
              className="social-link"
              onClick={() => {
                playSound("chord", 0.3);
                window.open(
                  "https://www.linkedin.com/in/adityapawar112/",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              title="LinkedIn"
              variant="ghost"
            >
              <PixelIcon source={linkedinIcon} />
            </Button>
            <Button
              aria-label="Open Aditya Pawar on GitHub"
              className="social-link"
              onClick={() => {
                playSound("chord", 0.3);
                window.open("https://github.com/adityapawar112", "_blank", "noopener,noreferrer");
              }}
              title="GitHub"
              variant="ghost"
            >
              <PixelIcon source={githubIcon} />
            </Button>
            <Button
              aria-label="Open Aditya Pawar's resume"
              className="social-link"
              data-tutorial-target="resume-link"
              onClick={() => {
                playSound("chord", 0.3);
                window.open(
                  "https://drive.google.com/file/d/1FUNXmA1O8GVfLJPOQnl_7lKeoMaarp54/view?usp=sharing",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              title="Resume"
              variant="ghost"
            >
              <PixelIcon source={fileTextIcon} />
            </Button>
            <span className="footer-availability">Available now · Pune / Remote</span>
          </div>
        </>
      )}

      {!isLoading && analyticsConsent === null && (
        <section
          aria-label="Analytics cookie preferences"
          aria-live="polite"
          className="cookie-banner pixel-card"
        >
          <div className="cookie-copy">
            <div className="card-title">Optional analytics</div>
            <div className="card-copy">
              Allow anonymous usage data to help improve this portfolio. No advertising trackers.
            </div>
          </div>
          <div className="cookie-actions">
            <Button
              onClick={() => {
                localStorage.setItem("portfolio-analytics-consent", "declined");
                setAnalyticsConsent("declined");
                playSound("ding", 0.18);
              }}
              variant="ghost"
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem("portfolio-analytics-consent", "accepted");
                setAnalyticsConsent("accepted");
                playSound("ding", 0.18);
              }}
              variant="default"
            >
              Accept
            </Button>
          </div>
        </section>
      )}

      {isTutorialActive && (
        <PortfolioTutorial
          initialStep={tutorialCheckpoint ?? 0}
          onClose={() => {
            setIsTutorialActive(false);
            setTutorialCheckpoint(null);
            showTutorialView(null);
          }}
          onPause={(step) => {
            setTutorialCheckpoint(step);
            setIsTutorialActive(false);
          }}
          onViewChange={showTutorialView}
          playSound={playSound}
        />
      )}

      {!isTutorialActive && tutorialCheckpoint !== null && (
        <Button
          className="tutorial-resume-trigger"
          onClick={() => {
            playSound("ding", 0.18);
            setIsTutorialActive(true);
          }}
        >
          Resume guide
          <span aria-hidden="true">{tutorialCheckpoint + 1}/10</span>
        </Button>
      )}

      {isLoading && (
        <div aria-label="Loading portfolio" aria-live="polite" className="loading-screen" role="status">
          <div className="loading-emblem">AP</div>
          <div className="loading-title">Loading Realm</div>
          <div aria-hidden="true" className="loading-track">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="loading-copy">Preparing pixels...</div>
        </div>
      )}

      {analyticsConsent === "accepted" && (
        <>
          <Analytics
            route={activeSection ? `/#${activeSection}` : "/"}
            path={activeSection ? `/#${activeSection}` : "/"}
          />
          <SpeedInsights route={activeSection ? `/#${activeSection}` : "/"} />
        </>
      )}
    </main>
  );
}
