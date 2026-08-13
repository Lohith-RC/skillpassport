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
  const isVisibleRef = useRef(false);

  const setRef = useCallback(
    (node: T | null) => {
      // Disconnect any previous observer (e.g. during fast re-renders)
      if (nodeRef.current) {
        (nodeRef.current as any)._scrollObs?.disconnect();
      }
      nodeRef.current = node;
      if (!node) return;

      // Stagger delay via CSS custom property
      if (delay > 0) {
        node.style.setProperty('--reveal-delay', `${delay}ms`);
      }

      // ── BUG FIX: apply initial hidden state so the element starts invisible ──
      node.classList.add('scroll-hidden');

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisibleRef.current) {
            isVisibleRef.current = true;
            node.classList.add('scroll-visible');
            node.classList.remove('scroll-hidden');
            if (once) observer.disconnect();
          } else if (!once && !entry.isIntersecting) {
            isVisibleRef.current = false;
            node.classList.remove('scroll-visible');
            node.classList.add('scroll-hidden');
          }
        },
        { threshold, rootMargin }
      );

      (node as any)._scrollObs = observer;
      observer.observe(node);
    },
    [threshold, rootMargin, once, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      (nodeRef.current as any)?._scrollObs?.disconnect();
    };
  }, []);

  return setRef;
}
