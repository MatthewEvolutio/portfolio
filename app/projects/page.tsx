"use client";

import Card from "../components/Card";

export default function Projects() {
  return (
    <div className="flex min-h-screen items-start justify-center font-sans dark:bg-background px-4 py-12">
      <main className="w-full max-w-5xl flex flex-col gap-8">
        <Card className="w-full">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight dark:text-(--accent) mb-6">
            Projects & Categories
          </h1>
          <p className="text-lg leading-8 dark:text-muted mb-8 max-w-3xl">
            Explore the different areas I focus on. Each category represents a set of skills and
            creative disciplines I enjoy working with.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="sub" className="group">
              <h2 className="text-xl font-medium mb-2 dark:text-(--accent)">Graphic Design</h2>
              <p className="text-sm dark:text-(--muted)">
                Branding, layout, posters, typography & visual identity systems.
              </p>
            </Card>
            <Card variant="sub" className="group">
              <h2 className="text-xl font-medium mb-2 dark:text-(--accent)">Web Development</h2>
              <p className="text-sm dark:text-(--muted)">
                Front‑end engineering, responsive UI, accessibility & performance.
              </p>
            </Card>
            <Card variant="sub" className="group">
              <h2 className="text-xl font-medium mb-2 dark:text-(--accent)">Audio Production</h2>
              <p className="text-sm dark:text-(--muted)">
                Recording, mixing, sound design & voiceover polishing techniques.
              </p>
            </Card>
            <Card variant="sub" className="group">
              <h2 className="text-xl font-medium mb-2 dark:text-(--accent)">Digital Imaging</h2>
              <p className="text-sm dark:text-(--muted)">
                Photo editing, compositing, retouching & colour grading workflows.
              </p>
            </Card>
            <Card variant="sub" className="group">
              <h2 className="text-xl font-medium mb-2 dark:text-(--accent)">Video Production</h2>
              <p className="text-sm dark:text-(--muted)">
                Editing, motion graphics, storytelling & multi‑platform delivery.
              </p>
            </Card>
          </div>
        </Card>
      </main>
    </div>
  );
}