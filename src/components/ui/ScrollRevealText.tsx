import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface ScrollRevealTextProps {
  text: string;
  /** Element to render. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  /** Per-word stagger in ms. */
  stagger?: number;
  className?: string;
  wordClassName?: string;
}

/**
 * ScrollReveal text (React Bits `ScrollReveal` pattern): words unblur and
 * rise into place the first time the heading enters the viewport.
 *
 * Accessibility: the heading carries `aria-label={text}` and the animated
 * word spans are `aria-hidden`, so screen readers get one clean string
 * instead of a hundred fragments. Reduced motion renders the final state.
 */
export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  as: Tag = 'h2',
  stagger = 55,
  className,
  wordClassName,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    // Safety net: never leave a heading invisible.
    const timer = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref as any} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={cn('inline-block rb-word', shown && 'rb-word-in', wordClassName)}
            style={{ transitionDelay: `${i * stagger}ms` }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </Tag>
  );
};

export default ScrollRevealText;
