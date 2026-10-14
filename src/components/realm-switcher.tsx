import { useEffect, useMemo, useRef, useState } from "react";
import closeIcon from "pixelarticons/svg/close.svg?url";
import eyeOffIcon from "pixelarticons/svg/eye-off.svg?url";
import monitorIcon from "pixelarticons/svg/monitor.svg?url";
import volumeIcon from "pixelarticons/svg/volume-2.svg?url";
import volumeMutedIcon from "pixelarticons/svg/volume-x.svg?url";

import { realmCategories, realms, type Realm, type RealmCategoryId } from "../data/realms";
import type { UiSound } from "../hooks/use-ui-sounds";
import { Button } from "./ui/8bit-button";
import { PixelIcon } from "./ui/pixel-icon";

interface RealmSwitcherProps {
  activeRealm: Realm;
  isCrtEnabled: boolean;
  isMuted: boolean;
  onRealmChange: (realm: Realm) => void;
  onToggleCrt: () => void;
  onToggleMuted: () => void;
  playSound: (sound: UiSound, volume?: number) => void;
}

export function RealmSwitcher({
  activeRealm,
  isCrtEnabled,
  isMuted,
  onRealmChange,
  onToggleCrt,
  onToggleMuted,
  playSound,
}: RealmSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRealmHint, setShowRealmHint] = useState(true);
  const [activeCategory, setActiveCategory] = useState<RealmCategoryId>(activeRealm.category);
  const controlsRef = useRef<HTMLDivElement>(null);

  const visibleRealms = useMemo(
    () => realms.filter((realm) => realm.category === activeCategory),
    [activeCategory],
  );


  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        playSound("ding");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        playSound("ding");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, playSound]);

  const toggleOpen = () => {
    setShowRealmHint(false);
    setActiveCategory(activeRealm.category);
    setIsOpen((current) => {
      playSound("ding");
      return !current;
    });
  };

  const selectCategory = (category: RealmCategoryId) => {
    setActiveCategory(category);
    playSound("ding", 0.22);
  };

  const selectRealm = (realm: Realm) => {
    onRealmChange(realm);
    setIsOpen(false);
    playSound("chord", 0.38);
  };

  return (
    <div className="realm-controls" ref={controlsRef}>
      <div className="control-row">
        <Button
          aria-controls="realm-popover"
          aria-expanded={isOpen}
          className="control-button realm-trigger"
          data-tutorial-target="realm-switcher"
          onClick={toggleOpen}
          variant="default"
        >
          <span aria-hidden="true" className="pixel-cat realm-cat">
            <span className="cat-ear cat-ear-left" />
            <span className="cat-ear cat-ear-right" />
            <span className="cat-eye cat-eye-left" />
            <span className="cat-eye cat-eye-right" />
            <span className="cat-nose" />
          </span>
          <span className="control-copy">
            <span className="control-label">Realm</span>
            <span className="control-value">{activeRealm.name}</span>
          </span>
        </Button>

        <div aria-label="Display and sound controls" className="utility-controls" role="group">
          <Button
            aria-label={isMuted ? "Unmute interface sounds" : "Mute interface sounds"}
            aria-pressed={isMuted}
            className="utility-control-button"
            onClick={onToggleMuted}
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
            variant="ghost"
          >
            {isMuted ? (
              <PixelIcon className="control-icon" source={volumeMutedIcon} />
            ) : (
              <PixelIcon className="control-icon" source={volumeIcon} />
            )}
          </Button>

          <Button
            aria-label={isCrtEnabled ? "Turn off CRT scanlines" : "Turn on CRT scanlines"}
            aria-pressed={isCrtEnabled}
            className="utility-control-button"
            onClick={() => {
              onToggleCrt();
              playSound("ding", 0.2);
            }}
            title={isCrtEnabled ? "Disable CRT scanlines" : "Enable CRT scanlines"}
            variant="ghost"
          >
            <PixelIcon className="control-icon" source={isCrtEnabled ? monitorIcon : eyeOffIcon} />
          </Button>
        </div>
      </div>

      {showRealmHint && !isOpen && (
        <div
          aria-live="polite"
          className="realm-hint"
          onClick={() => {
            setShowRealmHint(false);
            playSound("ding", 0.16);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowRealmHint(false);
              playSound("ding", 0.16);
            }
          }}
          role="button"
          tabIndex={0}
          title="Click to dismiss"
        >
          Switch realms, meow
        </div>
      )}

      {isOpen && (
        <section
          aria-label="Choose a parallax realm"
          className={`realm-popover theme-${activeCategory}`}
          id="realm-popover"
          role="dialog"
        >
          <div className="popover-header">
            <div>
              <div className="popover-title">Realm Archive</div>
              <div className="popover-subtitle">52 looping worlds · choose your atmosphere</div>
            </div>
            <Button
              aria-label="Close realm archive"
              className="popover-close"
              onClick={toggleOpen}
              variant="ghost"
            >
              <PixelIcon source={closeIcon} />
            </Button>
          </div>

          <div aria-label="Realm categories" className="category-tabs" role="tablist">
            {realmCategories.map((category) => (
              <Button
                aria-selected={activeCategory === category.id}
                className={`category-tab theme-${category.id}`}
                key={category.id}
                onClick={() => selectCategory(category.id)}
                onPointerEnter={() => playSound("boop", 0.14)}
                role="tab"
                variant={activeCategory === category.id ? "default" : "ghost"}
              >
                {category.label}
                <span>{realms.filter((realm) => realm.category === category.id).length}</span>
              </Button>
            ))}
          </div>

          <div className="realm-grid">
            {visibleRealms.map((realm) => {
              const isSelected = activeRealm.id === realm.id;

              return (
                <Button
                  aria-pressed={isSelected}
                  className={`realm-option${isSelected ? " is-selected" : ""}`}
                  key={realm.id}
                  onClick={() => selectRealm(realm)}
                  onPointerEnter={() => playSound("boop", 0.12)}
                  variant="ghost"
                >
                  <span className="realm-thumbnail">
                    <img
                      alt=""
                      decoding="async"
                      draggable="false"
                      loading="lazy"
                      src={`/realms/${realm.id}/preview.webp`}
                    />
                    <span className="realm-layer-count">{realm.layerCount} layers</span>
                  </span>
                  <span className="realm-option-name">{realm.name}</span>
                </Button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
