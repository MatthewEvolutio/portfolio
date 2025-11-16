"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("./ParticlesBackground"), { ssr: false });

export default function ParticlesThemeClient() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => {
      setShow(document.body.classList.contains("theme-particles"));
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  if (!show) return null;
  return <ParticlesBackground />;
}
