import { useEffect, useRef, useCallback } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

/**
 * useScrollReveal — IntersectionObserver-based scroll reveal hook.
 *
 * Applies `scroll-hidden` on mount (opacity:0 + translateY) and swaps to
 * `scroll-visible` when the element enters the viewport. The CSS animation
 * is driven by @keyframes in index.css so it never conflicts with the
 * global `* { transition-property }` rule.
 *
 * @param options.delay  Stagger delay in ms (read via --reveal-delay CSS var)
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
    delay = 0,
  } = options;

  const nodeRef = useRef<T | null>(null);

  const setRef = useCallback(
    (node: T | null) => {
      // Disconnect any previous observer (e.g. during fast re-renders)
      if (nodeRef.current) {
        (nodeRef.current as any)._scrollObs?.disconnect();
        clearTimeout((nodeRef.current as any)._revealTimer);
      }
      nodeRef.current = node;
      if (!node) return;

      // Stagger delay via CSS custom property
      if (delay > 0) {
        node.style.setProperty('--reveal-delay', `${delay}ms`);
      }

      // ── Robust visibility ────────────────────────────────────────────────
      // Content must never be left invisible. Reveal immediately if the
      // element is already in the initial viewport, and fall back to a timed
      // reveal if IntersectionObserver is unavailable or never fires.
      const revealNow = () => {
        node.classList.remove('scroll-hidden');
        node.classList.add('scroll-visible');
      };

      if (typeof IntersectionObserver === 'undefined') {
        revealNow();
        return;
      }

      const rect = node.getBoundingClientRect();
      const inInitialViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inInitialViewport) {
        revealNow();
      } else {
        node.classList.add('scroll-hidden');
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            revealNow();
            if (once) observer.disconnect();
          } else if (!once) {
            node.classList.remove('scroll-visible');
            node.classList.add('scroll-hidden');
          }
        },
        { threshold, rootMargin }
      );

      (node as any)._scrollObs = observer;
      observer.observe(node);

      // Safety net: never leave content permanently hidden (e.g. observer
      // misfires or the node is off-screen at mount). Reveal within a short
      // window so the page can never render as a black/blank screen.
      const timer = window.setTimeout(() => {
        if (node.classList.contains('scroll-hidden')) revealNow();
      }, 2500);
      (node as any)._revealTimer = timer;
    },
    [threshold, rootMargin, once, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      (nodeRef.current as any)?._scrollObs?.disconnect();
      clearTimeout((nodeRef.current as any)?._revealTimer);
    };
  }, []);

  return setRef;
}
