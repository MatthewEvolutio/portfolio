"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";

function ImageFallback() {
  const [photoSrc, setPhotoSrc] = useState("/me.jpg");

  return (
    <Image
      src={photoSrc}
      alt="Matthew Horan"
      width={135}
      height={135}
      className="sm:w-[135px] sm:h-[135px] rounded-full object-cover ring-2 ring-(--accent) relative before:absolute before:-inset-2 before:rounded-full before:border before:border-(--accent)/20 hover:scale-[1.05] transition-all duration-300"
      onError={() => setPhotoSrc("/me-placeholder.svg")}
    />
  );
}

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If birthday hasn't occurred yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollHintBottom, setScrollHintBottom] = useState(24);

  // Calculate age based on birthday: May 13, 2002
  const myAge = calculateAge(new Date(2002, 4, 13)); // Month is 0-indexed, so 4 = May

  // Handle initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Add scroll and orientation event listeners
  useEffect(() => {
    let lastScroll = 0;
    let ticking = false;

    const computeHintPosition = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const gap = window.innerHeight - rect.bottom; // space between card bottom and viewport bottom
      const pos = Math.max(24, gap / 2); // at least 24px from bottom
      setScrollHintBottom(pos);
    };

    const handleScroll = () => {
      lastScroll = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setHasScrolled(lastScroll > 30);
          // Recompute hint position while near top
          if (lastScroll <= 30) computeHintPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      computeHintPosition();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    // Set initial orientation
    handleResize();
    // Initial compute
    computeHintPosition();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-background">
      <main className={`flex min-h-screen w-full max-w-full flex-col items-center sm:items-start px-4 transition-all duration-500 ease-out ${
        hasScrolled ? 'justify-start gap-8 py-5' : 'justify-center gap-0 py-0'
      } dark:bg-background`}>
        <div ref={heroRef}>
        <Card className={`group w-full ${
          !isLoaded ? 'opacity-0 translate-y-4' :
          hasScrolled ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-0 scale-105 opacity-100'
        }`}>
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:text-left">
            <div className="flex-1">
              <h1 className="max-w-s text-3xl font-semibold leading-10 tracking-tight dark:text-(--accent) mb-4">
                Matthew Horan Portfolio
              </h1>
              <Card variant="sub">
                <p className="max-w-md text-lg leading-8 dark:text-muted">
                  A motivated and curious Computing Student studying{" "}
                  <a
                    href="https://www.setu.ie/courses/bsc-hons-in-creative-computing"
                    className="font-medium dark:text-(--accent) transition-colors hover:text-(--accent-strong) hover:underline"
                  >
                    Bsc (Hons) in Creative Computing
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.setu.ie/"
                    className="font-medium dark:text-(--accent) transition-colors hover:text-(--accent-strong) hover:underline"
                  >
                    South East Technological University
                  </a>{" "}
                  in Waterford. With a passion for Web development, Graphic & UI/UX
                  design, and Video production.
                </p>
              </Card>
            </div>
            <div className="mt-4 sm:mt-0 shrink-0 flex flex-col items-center gap-4">
              <ImageFallback />
              <div className="flex gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)"
                >
                  <span
                    className="mask-icon w-6 h-6"
                    style={{ ['--icon-url' as any]: "url('/github.svg')" }}
                    aria-hidden="true"
                  />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)"
                >
                  <span
                    className="mask-icon w-6 h-6"
                    style={{ ['--icon-url' as any]: "url('/linkedin.svg')" }}
                    aria-hidden="true"
                  />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
              <Link href="/projects" className="home-action flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)">
                <span
                  className="mask-icon w-4 h-4"
                  style={{ ['--icon-url' as any]: "url('/vercel.svg')" }}
                  aria-hidden="true"
                />
                Projects
              </Link>
              <Link href="/contact" className="home-action flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)">
                <span
                  className="mask-icon w-4 h-4"
                  style={{ ['--icon-url' as any]: "url('/vercel.svg')" }}
                  aria-hidden="true"
                />
                Contact Me
              </Link>
          </div>
  </Card>
        </div>

        {/* Scroll hint: visible until user scrolls and hidden below sm breakpoint like nav links */}
        {!hasScrolled && (
          <div
            className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 z-50 flex-col items-center gap-2 pointer-events-none"
            style={{ bottom: scrollHintBottom }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              aria-hidden="true"
              className="w-10 h-10 text-(--accent) fill-current animate-bounce"
            >
              <path d="M12 16l-6-6h12z" />
            </svg>
            <span className="text-base text-(--muted)">Scroll</span>
          </div>
        )}
        {/* A bit about me card */}
        <Card className={`group w-full ${
          hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}>
          <h2 className="text-2xl font-semibold leading-8 tracking-tight dark:text-(--accent) mb-4">
            A bit about me
          </h2>
          <Card variant="sub">
            <p className="text-lg leading-8 dark:text-muted">
              I'm Matthew, a {myAge} year old computing student with a keen interest in building
              pleasant, accessible web experiences and visual graphics. I enjoy blending front-end
              engineering with UI/UX & visual design and video to tell
              stories and craft polished prototypes.
            </p>
            {/* <p className="mt-3 text-sm dark:text-muted">
              When I'm not coding I like to experiment with design systems,
              shoot and edit short videos, and explore creative tools.
            </p> */}
          </Card>
  </Card>

        {/* Skills & Technologies card */}
        <Card className={`group w-full ${
          hasScrolled ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}>
          <h2 className="text-2xl font-semibold leading-8 tracking-tight dark:text-(--accent) mb-4">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card variant="sub">
              <h3 className="text-lg font-medium mb-2 dark:text-(--accent)">Web Development</h3>
              <p className="text-sm dark:text-(--muted)">Angular, React, Next.js, Handlebars, TypeScript, Javascript, Tailwind, Bootstrap, Fomantic UI, Node.js, Github</p>
            </Card>
            <Card variant="sub">
              <h3 className="text-lg font-medium mb-2 dark:text-(--accent)">Design</h3>
              <p className="text-sm dark:text-(--muted)">Adobe XD, Draw.io, Photoshop, Photopea, Gimp, Illustrator, Acrobat, InDesign, Inkscape, Figma, P5.js</p>
            </Card>
            <Card variant="sub">
              <h3 className="text-lg font-medium mb-2 dark:text-(--accent)">Video Production</h3>
              <p className="text-sm dark:text-(--muted)">Open Broadcast Software (OBS), XSplit, Adobe Premiere Pro, After Effects, Sony Vegas Pro, Final Cut Pro</p>
            </Card>
          </div>
  </Card>
      </main>
    </div>
  )
}
