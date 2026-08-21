"use client";

// Module-level external store so a Foredrag CTA can preselect a topic in the
// Booking form without lifting state through the server-rendered page tree
// or triggering a full navigation. Same useSyncExternalStore convention as
// CursorSpotlight/Countdown — see CLAUDE.md "Known gotchas".
let topic: string | null = null;
const listeners = new Set<() => void>();

export function setTopic(value: string) {
  topic = value;
  for (const listener of listeners) listener();
}

export function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getSnapshot() {
  return topic;
}

export function getServerSnapshot() {
  return null;
}
