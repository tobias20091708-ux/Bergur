"use client";

import { setTopic } from "@/lib/topicStore";

export function TalkCTA({ slug, label }: { slug: string; label: string }) {
  return (
    <a
      href="#book"
      onClick={() => setTopic(slug)}
      className="rounded-md bg-accent px-7 py-3 text-sm font-medium text-foreground transition hover:bg-accent/90"
    >
      {label}
    </a>
  );
}
