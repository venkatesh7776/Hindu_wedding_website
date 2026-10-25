"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  /** "text" rises and fades; "image" unmasks from an inset clip. */
  variant?: "text" | "image";
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/** Reveals its content once when it scrolls into view. */
export function Reveal({ children, as: Tag = "div", variant = "text", delay = 0, className = "", style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${variant === "image" ? "reveal-image" : "reveal"} ${className}`}
      style={{ ...style, "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
