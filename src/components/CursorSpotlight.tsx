"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(event: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--spot-x", `${event.clientX}px`);
      el.style.setProperty("--spot-y", `${event.clientY}px`);
      el.style.opacity = "1";
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(245,240,235,0.07), transparent 70%)",
      }}
    />
  );
}
