"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function SpaceBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 140, links: { opacity: 0.5 } } },
    },
    particles: {
      color: { value: "#10b981" },
      links: { color: "#10b981", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 0.6, direction: "none", outModes: { default: "out" } },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
  }), []);

  if (init) return <Particles id="tsparticles" options={options as any} className="absolute inset-0 -z-10" />;
  return null;
}
