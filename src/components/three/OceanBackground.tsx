"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

function GradientFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#1a3a5c]" />
  );
}

const OceanScene = dynamic(
  () => import("./OceanScene").then((mod) => mod.OceanScene),
  { ssr: false, loading: GradientFallback }
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function subscribe(callback: () => void) {
  // Force a re-check shortly after mount so the client's real WebGL
  // support value replaces the SSR-only `false` snapshot, rather than
  // relying solely on React's implicit post-hydration re-sync.
  const id = setTimeout(callback, 0);
  return () => clearTimeout(id);
}

function getServerSnapshot() {
  return false;
}

export function OceanBackground() {
  const webglOk = useSyncExternalStore(subscribe, supportsWebGL, getServerSnapshot);

  return (
    <div className="pointer-events-none absolute inset-0">
      {webglOk ? <OceanScene /> : <GradientFallback />}
    </div>
  );
}
