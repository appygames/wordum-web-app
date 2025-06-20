import { useCallback, useEffect } from "react";

export function useSound(enabled: boolean) {
  const play = useCallback(
    (src: string) => {
      if (!enabled) return;
      const audio = new Audio(src);
      audio.play();
    },
    [enabled]
  );

  useEffect(() => {
    const sounds = [
      "/sounds/click.mp3",
      "/sounds/place.mp3",
      "/sounds/you-win.mp3",
      "/sounds/lose.wav",
      "/sounds/error.mp3",
    ];
    sounds.forEach((src) => {
      const audio = new Audio(src);
      audio.load();
    });
  }, []);

  return play;
}
