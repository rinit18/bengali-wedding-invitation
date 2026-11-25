import { useCallback, useEffect, useRef, useState } from 'react';

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPausedRef = useRef(false);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      userPausedRef.current = true;
      setPlaying(false);
    } else {
      userPausedRef.current = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  useEffect(() => {
    const onPlayTrigger = () => {
      if (!userPausedRef.current) tryPlay();
    };
    window.addEventListener('gaatchhora:play-music', onPlayTrigger);
    return () => window.removeEventListener('gaatchhora:play-music', onPlayTrigger);
  }, [tryPlay]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={`bgm-btn ${playing ? 'is-playing' : 'is-paused'}`}
        onClick={toggle}
        aria-label={playing ? 'সঙ্গীত থামান' : 'সঙ্গীত বাজান'}
        title={playing ? 'সঙ্গীত থামান' : 'সঙ্গীত বাজান'}
      >
        {playing ? (
          <span className="bgm-equalizer" aria-hidden="true">
            <span className="bgm-bar" />
            <span className="bgm-bar" />
            <span className="bgm-bar" />
            <span className="bgm-bar" />
          </span>
        ) : (
          <svg
            className="bgm-muted-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    </>
  );
}
