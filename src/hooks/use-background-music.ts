import { useEffect, useRef } from "react";
import { realmMusicTracks } from "../data/realm-music";
import type { RealmCategoryId } from "../data/realms";

const BGM_VOLUME = 0.15;

interface UseBackgroundMusicOptions {
  category: RealmCategoryId;
  isMuted: boolean;
}

export function useBackgroundMusic({ category, isMuted }: UseBackgroundMusicOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentCategoryRef = useRef<RealmCategoryId | null>(null);
  const isMutedRef = useRef(isMuted);
  isMutedRef.current = isMuted;

  // Initialize the audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = BGM_VOLUME;
    audioRef.current = audio;

    const unlockPlayback = () => {
      if (audioRef.current && !isMutedRef.current && audioRef.current.paused && audioRef.current.src) {
        void audioRef.current.play().catch(() => undefined);
      }
    };

    window.addEventListener("pointerdown", unlockPlayback, { once: true });
    window.addEventListener("keydown", unlockPlayback, { once: true });
    window.addEventListener("touchstart", unlockPlayback, { once: true });
    window.addEventListener("click", unlockPlayback, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockPlayback);
      window.removeEventListener("keydown", unlockPlayback);
      window.removeEventListener("touchstart", unlockPlayback);
      window.removeEventListener("click", unlockPlayback);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Update track when category changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentCategoryRef.current === category && audio.src) {
      return;
    }

    currentCategoryRef.current = category;
    const track = realmMusicTracks[category];
    if (!track) return;

    const nextSrc = `/music/${encodeURIComponent(track.fileName)}`;

    audio.src = nextSrc;
    audio.currentTime = 0;
    audio.volume = BGM_VOLUME;

    if (!isMuted) {
      void audio.play().catch(() => {
        // Handled by interaction unlock listener
      });
    }
  }, [category, isMuted]);

  // Handle mute toggling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    if (isMuted) {
      audio.pause();
    } else {
      void audio.play().catch(() => undefined);
    }
  }, [isMuted]);
}
