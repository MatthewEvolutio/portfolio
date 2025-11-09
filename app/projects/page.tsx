"use client";

import Card from "../components/Card";
import dynamic from "next/dynamic";
const PdfPreview = dynamic(() => import("../components/PdfPreview"), { ssr: false });
import Image from "next/image";
import { assetUrl } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export default function Projects() {
  const [activePdf, setActivePdf] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeWebApp, setActiveWebApp] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const nodeIframeRef = useRef<HTMLIFrameElement | null>(null);
  const modalIframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync current theme to embedded Node app via postMessage
  useEffect(() => {
    const iframe = nodeIframeRef.current;
    if (!iframe) return;

    const getThemeClass = () => {
      const classes = Array.from(document.body.classList);
      // Find one of our known theme classes
      const found = classes.find((c) => c.startsWith('theme-')) || '';
      return found;
    };

    const gatherVars = () => {
      const cs = getComputedStyle(document.body);
      const keys = ['--background', '--foreground', '--accent', '--accent-strong', '--accent-on', '--muted', '--btn-hover'];
      const vars: Record<string, string> = {};
      keys.forEach(k => {
        vars[k] = cs.getPropertyValue(k).trim();
      });
      return vars;
    };

    const postTheme = () => {
      try {
        const themeClass = getThemeClass();
        const vars = gatherVars();
        iframe.contentWindow?.postMessage({ type: 'set-theme', themeClass, vars }, '*');
      } catch {}
    };

    // Initial post
    const onLoad = () => postTheme();
    iframe.addEventListener('load', onLoad);

    // Observe body class changes (ThemeSwitcher updates body classes)
    const observer = new MutationObserver(postTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Also listen to storage changes (if theme is changed in another tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme-index') postTheme();
    };
    window.addEventListener('storage', onStorage);

    // Post once after a tick as well
    const t = setTimeout(postTheme, 100);

    return () => {
      clearTimeout(t);
      iframe.removeEventListener('load', onLoad);
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Sync theme to modal iframe as well
  useEffect(() => {
    const iframe = modalIframeRef.current;
    if (!iframe || !activeWebApp) return;

    const getThemeClass = () => {
      const classes = Array.from(document.body.classList);
      return classes.find((c) => c.startsWith('theme-')) || '';
    };

    const gatherVars = () => {
      const cs = getComputedStyle(document.body);
      const keys = ['--background', '--foreground', '--accent', '--accent-strong', '--accent-on', '--muted', '--btn-hover'];
      const vars: Record<string, string> = {};
      keys.forEach(k => {
        vars[k] = cs.getPropertyValue(k).trim();
      });
      return vars;
    };

    const postTheme = () => {
      try {
        const themeClass = getThemeClass();
        const vars = gatherVars();
        iframe.contentWindow?.postMessage({ type: 'set-theme', themeClass, vars }, '*');
      } catch {}
    };

    const onLoad = () => postTheme();
    iframe.addEventListener('load', onLoad);

    const observer = new MutationObserver(postTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme-index') postTheme();
    };
    window.addEventListener('storage', onStorage);

    const t = setTimeout(postTheme, 100);

    return () => {
      clearTimeout(t);
      iframe.removeEventListener('load', onLoad);
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, [activeWebApp]);

  return (
    <div className="flex items-start justify-center font-sans dark:bg-background -mt-2 mb-8">
      <main className="flex w-full max-w-5xl flex-col items-center sm:items-start px-4 gap-8">
        <Card className={`w-full transition-all duration-500 origin-top ${
          hasScrolled ? 'scale-100' : 'scale-105'
        }`}>
          <h1 className="text-3xl font-semibold leading-10 tracking-tight dark:text-(--accent) mb-6">
            Projects & Portfolio
          </h1>
          <p className="text-lg leading-8 dark:text-muted mb-8 max-w-3xl">
            A collection of my work across graphic design, digital imaging, and web development.
          </p>

          {/* Graphic Design Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold dark:text-(--accent) mb-4">Graphic Design</h2>
            <div className="flex flex-col gap-6">
              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Portfolio PDF</h3>
                <div
                  className="mb-4 cursor-pointer"
                  onClick={() => setActivePdf(assetUrl("/projects/graphicdesign/Portfolio.pdf"))}
                >
                  <PdfPreview filePath="/projects/graphicdesign/Portfolio.pdf" height={480} />
                </div>
                <p className="text-sm dark:text-(--muted) mb-4">
                  A comprehensive collection of my graphic design work, including branding, layout, and visual identity projects.
                </p>
                <button
                  onClick={() => setActivePdf(assetUrl("/projects/graphicdesign/Portfolio.pdf"))}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-(--accent) text-(--accent-on) hover:bg-(--accent-strong) transition-all text-base font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Portfolio
                </button>
              </Card>
            </div>
          </div>

          {/* Digital Imaging Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold dark:text-(--accent) mb-4">Digital Imaging</h2>
            <div className="flex flex-col gap-6">
              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Album Cover Design</h3>
                <div
                  className="mb-3 rounded-lg overflow-hidden bg-background/50 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setActiveImage(assetUrl("/projects/digitalimage/Album cover.PNG"))}
                >
                  <Image
                    src={assetUrl("/projects/digitalimage/Album cover.PNG")}
                    alt="Album Cover Design"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-sm dark:text-(--muted) mb-4">
                  Creative album artwork featuring photo manipulation and compositing techniques.
                </p>
                <button
                  onClick={() => setActiveImage(assetUrl("/projects/digitalimage/Album cover.PNG"))}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-(--accent) text-(--accent-on) hover:bg-(--accent-strong) transition-all text-base font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Image
                </button>
              </Card>

              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Business Card Design</h3>
                <div
                  className="mb-3 rounded-lg overflow-hidden bg-background/50 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setActiveImage(assetUrl("/projects/digitalimage/Business card.PNG"))}
                >
                  <Image
                    src={assetUrl("/projects/digitalimage/Business card.PNG")}
                    alt="Business Card Design"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-sm dark:text-(--muted) mb-4">
                  Professional business card design with attention to typography and layout.
                </p>
                <button
                  onClick={() => setActiveImage(assetUrl("/projects/digitalimage/Business card.PNG"))}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-(--accent) text-(--accent-on) hover:bg-(--accent-strong) transition-all text-base font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Image
                </button>
              </Card>

              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Tramore Postcard</h3>
                <div
                  className="mb-3 rounded-lg overflow-hidden bg-background/50 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setActiveImage(assetUrl("/projects/digitalimage/Tramore Postcard.png"))}
                >
                  <Image
                    src={assetUrl("/projects/digitalimage/Tramore Postcard.png")}
                    alt="Tramore Postcard"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-sm dark:text-(--muted) mb-4">
                  Scenic postcard design showcasing photo retouching and colour grading.
                </p>
                <button
                  onClick={() => setActiveImage(assetUrl("/projects/digitalimage/Tramore Postcard.png"))}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-(--accent) text-(--accent-on) hover:bg-(--accent-strong) transition-all text-base font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Image
                </button>
              </Card>

              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Complete Portfolio</h3>
                <div
                  className="mb-4 cursor-pointer"
                  onClick={() => setActivePdf(assetUrl("/projects/digitalimage/A1 Portfolio Matthew.pdf"))}
                >
                  <PdfPreview filePath="/projects/digitalimage/A1 Portfolio Matthew.pdf" height={480} />
                </div>
                <p className="text-sm dark:text-(--muted) mb-4">
                  View the full A1 portfolio featuring all digital imaging projects and detailed case studies.
                </p>
                <button
                  onClick={() => setActivePdf(assetUrl("/projects/digitalimage/A1 Portfolio Matthew.pdf"))}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-(--accent) text-(--accent-on) hover:bg-(--accent-strong) transition-all text-base font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Full Portfolio
                </button>
              </Card>
            </div>
          </div>

          {/* Other Categories */}
          <div>
            <h2 className="text-2xl font-semibold dark:text-(--accent) mb-4">Web Development</h2>
            <div className="flex flex-col gap-6 mb-8">
              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Node.js Web Application</h3>
                <div className="mb-4 rounded-lg overflow-hidden bg-background/50 border border-(--accent)/20">
                  <iframe
                    ref={nodeIframeRef}
                    src="https://webapp-phi-sooty.vercel.app/start"
                    className="w-full h-[600px] border-0 themed-scrollbar"
                    title="Node.js Web Application"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
                <p className="text-sm dark:text-(--muted) mb-4">
                  Full-stack web application built with Node.js, Handlebars templating, and Fomantic UI for a modern, responsive interface.
                </p>
                <button
                  onClick={() => setActiveWebApp(true)}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-(--accent) text-(--accent-on) hover:bg-(--accent-strong) transition-all text-base font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Full Site
                </button>
              </Card>
            </div>
          </div>

          {/* Other Skills */}
          <div>
            <h2 className="text-2xl font-semibold dark:text-(--accent) mb-4">Other Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="sub" className="group">
                <h3 className="text-xl font-medium mb-2 dark:text-(--accent)">Web Development</h3>
                <p className="text-sm dark:text-(--muted)">
                  Front‑end engineering, responsive UI, accessibility & performance.
                </p>
              </Card>
              <Card variant="sub" className="group">
                <h3 className="text-xl font-medium mb-2 dark:text-(--accent)">Audio Production</h3>
                <p className="text-sm dark:text-(--muted)">
                  Recording, mixing, sound design & voiceover polishing techniques.
                </p>
              </Card>
              <Card variant="sub" className="group">
                <h3 className="text-xl font-medium mb-2 dark:text-(--accent)">Video Production</h3>
                <p className="text-sm dark:text-(--muted)">
                  Editing, motion graphics, storytelling & multi‑platform delivery.
                </p>
              </Card>
            </div>
          </div>
        </Card>

        {/* PDF Viewer Modal */}
        {activePdf && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-background/80 p-4"
            onClick={() => setActivePdf(null)}
          >
            <div
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 w-full h-full bg-background rounded-lg overflow-hidden shadow-2xl ring-2 ring-(--accent)">
                <iframe
                  src={activePdf}
                  className="w-full h-full"
                  title="PDF Viewer"
                />
              </div>
              <button
                onClick={() => setActivePdf(null)}
                className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-background text-(--accent) hover:bg-(--accent) hover:text-background transition-all shadow-lg ring-2 ring-(--accent)"
                aria-label="Close PDF viewer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Image Viewer Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-background/80 p-4"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 w-full h-full bg-(--background) rounded-lg overflow-hidden shadow-2xl ring-2 ring-(--accent) flex items-center justify-center p-4">
                <Image
                  src={activeImage}
                  alt="Full size preview"
                  width={2000}
                  height={2000}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-background text-(--accent) hover:bg-(--accent) hover:text-background transition-all shadow-lg ring-2 ring-(--accent)"
                aria-label="Close image viewer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Web App Viewer Modal */}
        {activeWebApp && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-background/80 p-4"
            onClick={() => setActiveWebApp(false)}
          >
            <div
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 w-full h-full bg-background rounded-lg overflow-hidden shadow-2xl ring-2 ring-(--accent)">
                <iframe
                  ref={modalIframeRef}
                  src="https://webapp-phi-sooty.vercel.app/start"
                  className="w-full h-full border-0"
                  title="Node.js Web Application - Full View"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
              <button
                onClick={() => setActiveWebApp(false)}
                className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-background text-(--accent) hover:bg-(--accent) hover:text-background transition-all shadow-lg ring-2 ring-(--accent)"
                aria-label="Close web app viewer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}