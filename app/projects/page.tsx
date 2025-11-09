"use client";

import Card from "../components/Card";
import Image from "next/image";
import { assetUrl } from "@/lib/utils";

export default function Projects() {
  return (
    <div className="flex min-h-screen items-start justify-center font-sans dark:bg-background px-4 py-12">
      <main className="w-full max-w-5xl flex flex-col gap-8">
        <Card className="w-full">
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
                <p className="text-sm dark:text-(--muted) mb-4">
                  A comprehensive collection of my graphic design work, including branding, layout, and visual identity projects.
                </p>
                <a
                  href={assetUrl("/projects/graphicdesign/Portfolio.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--accent) text-[#002b36] hover:bg-(--accent-strong) transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Portfolio
                </a>
              </Card>
            </div>
          </div>

          {/* Digital Imaging Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold dark:text-(--accent) mb-4">Digital Imaging</h2>
            <div className="flex flex-col gap-6">
              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Album Cover Design</h3>
                <div className="mb-3 rounded-lg overflow-hidden bg-background/50">
                  <Image
                    src={assetUrl("/projects/digitalimage/Album cover.PNG")}
                    alt="Album Cover Design"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-sm dark:text-(--muted)">
                  Creative album artwork featuring photo manipulation and compositing techniques.
                </p>
              </Card>

              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Business Card Design</h3>
                <div className="mb-3 rounded-lg overflow-hidden bg-background/50">
                  <Image
                    src={assetUrl("/projects/digitalimage/Business card.PNG")}
                    alt="Business Card Design"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-sm dark:text-(--muted)">
                  Professional business card design with attention to typography and layout.
                </p>
              </Card>

              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Tramore Postcard</h3>
                <div className="mb-3 rounded-lg overflow-hidden bg-background/50">
                  <Image
                    src={assetUrl("/projects/digitalimage/Tramore Postcard.png")}
                    alt="Tramore Postcard"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-sm dark:text-(--muted)">
                  Scenic postcard design showcasing photo retouching and colour grading.
                </p>
              </Card>

              <Card variant="sub">
                <h3 className="text-lg font-medium mb-3 dark:text-(--accent)">Complete Portfolio</h3>
                <p className="text-sm dark:text-(--muted) mb-4">
                  View the full A1 portfolio featuring all digital imaging projects and detailed case studies.
                </p>
                <a
                  href={assetUrl("/projects/digitalimage/A1 Portfolio Matthew.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--accent) text-[#002b36] hover:bg-(--accent-strong) transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Full Portfolio
                </a>
              </Card>
            </div>
          </div>

          {/* Other Categories */}
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
      </main>
    </div>
  );
}