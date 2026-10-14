import { useCallback, useEffect, useRef, useState } from "react";

const sounds = {
  boop: "/UI-SFX/Boop.mp3",
  chord: "/UI-SFX/Chord.mp3",
  ding: "/UI-SFX/Ding.mp3",
} as const;

export type UiSound = keyof typeof sounds;

export function useUiSounds() {
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem("portfolio-muted") === "true");
  const audioCache = useRef(new Map<UiSound, HTMLAudioElement>());

  useEffect(() => {
    localStorage.setItem("portfolio-muted", String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    (Object.keys(sounds) as UiSound[]).forEach((sound) => {
      if (!audioCache.current.has(sound)) {
        const audio = new Audio(sounds[sound]);
        audio.preload = "auto";
        audioCache.current.set(sound, audio);
      }
    });
  }, []);

  const playRaw = useCallback((sound: UiSound, volume = 0.32) => {
    let audio = audioCache.current.get(sound);

    if (!audio) {
      audio = new Audio(sounds[sound]);
      audio.preload = "auto";
      audioCache.current.set(sound, audio);
    }

    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    void audio.play().catch(() => undefined);
  }, []);

  const playSound = useCallback(
    (sound: UiSound, volume?: number) => {
      if (!isMuted) playRaw(sound, volume);
    },
    [isMuted, playRaw],
  );

  const toggleMuted = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      playRaw("ding");
      return;
    }

    playRaw("ding");
    setIsMuted(true);
  }, [isMuted, playRaw]);

  return { isMuted, playSound, toggleMuted };
}
