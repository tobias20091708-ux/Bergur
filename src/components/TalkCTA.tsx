"use client";

import { setTopic } from "@/lib/topicStore";

export function TalkCTA({
  slug,
  label,
  className,
}: {
  slug: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href="#book"
      onClick={() => setTopic(slug)}
      className={
        className ??
        "rounded-md bg-accent px-7 py-3 text-sm font-medium text-foreground transition hover:bg-accent/90"
      }
    >
      {label}
    </a>
  );
}
