"use client";

import { useSyncExternalStore } from "react";

const TARGET = new Date("2026-10-03T00:00:00").getTime();

function formatRemaining() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  return `${days} dage, ${hours} timer og ${minutes} minutter`;
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 30000);
  return () => clearInterval(id);
}

function getServerSnapshot() {
  return null;
}

export function Countdown() {
  const text = useSyncExternalStore(subscribe, formatRemaining, getServerSnapshot);

  if (!text) return null;

  return <span>{text}</span>;
}
