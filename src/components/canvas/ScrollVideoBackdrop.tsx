import React, { useEffect, useRef, useState } from 'react';

export interface ScrollVideoBackdropProps {
  /** Locally served video asset, e.g. /video/hero-particles.mp4 */
  src: string;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * ScrollVideoBackdrop — Awwwards-style scroll-driven video.
 *
 * Behaviour, in order of what the visitor perceives:
 *  1. At rest (top of page) the loop plays on its own, so the hero breathes.
 *  2. The moment they scroll, playback pauses and the scroll position becomes
 *     the playhead ("scroll-based video scrubbing").
 *  3. Over the first viewport the frame also scales up slightly for depth,
 *     then the whole layer fades out before the content sections arrive, so
 *     the video never fights body copy for contrast.
 *
 * Performance: one rAF-throttled scroll listener, no React re-render per
 * frame (CSS custom property only). Reduced motion gets a static first frame
 * with no scrub, no scale, and no autoplay.
 *
 * Contrast: `--video-strength` is a theme token — the light theme runs the
 * clip at 45% so dark text keeps its 4.5:1, the dark theme runs it full.
 */
export const ScrollVideoBackdrop: React.FC<ScrollVideoBackdropProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let lastTime = -1;

    const apply = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const y = window.scrollY;

      // Scrub across exactly one viewport — the hero's own traversal.
      const scrubP = clamp(y / vh, 0, 1);
      // Fade out across the back half of that viewport so the stats strip
      // and feature grid inherit a clean canvas.
      const fadeP = clamp((y - vh * 0.55) / (vh * 0.5), 0, 1);

      video.style.setProperty('--video-fade', String(1 - fadeP));
      video.style.visibility = fadeP >= 1 ? 'hidden' : 'visible';
      if (reduce) return;

      video.style.transform = `scale(${(1 + scrubP * 0.15).toFixed(4)})`;

      const atRest = y < 12;
      if (atRest) {
        if (video.paused) video.play().catch(() => { /* autoplay blocked */ });
        lastTime = -1;
        return;
      }

      // Handing control to the scroll: stop the ambient loop, scrub instead.
      if (!video.paused) video.pause();

      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      const t = scrubP * (d - 0.04);
      if (Math.abs(t - lastTime) > 0.04) {
        lastTime = t;
        try { video.currentTime = t; } catch { /* seek raced a load */ }
      }
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };

    video.addEventListener('loadedmetadata', schedule);
    video.addEventListener('error', () => setFailed(true));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      video.removeEventListener('loadedmetadata', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [src]);

  if (failed) return null; // asset missing/offline → the WebGL card still carries the hero

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
        className="video-layer absolute inset-0 w-full h-full object-cover"
      />
      {/* Scrim keeps headline contrast above the footage in both themes */}
      <div className="video-scrim absolute inset-0" />
      {/* Dissolve into the next section so there is no hard video edge */}
      <div className="video-dissolve absolute inset-x-0 bottom-0 h-40" />
    </div>
  );
};

export default ScrollVideoBackdrop;
