"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Nav() {
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoSrc, setPhotoSrc] = useState("/me.jpg");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
  <nav className="w-full flex items-center justify-between pt-0 pb-20 relative">
      <div
        className="relative h-12 w-56 flex items-center justify-start"
        onMouseEnter={() => setShowPhoto(true)}
        onMouseLeave={() => setShowPhoto(false)}
      >
        <Link href="/" className="flex items-center justify-center w-full h-full">
          <span
            className={`text-2xl font-semibold text-black dark:text-(--accent) transition-all duration-300 ${
              showPhoto ? "opacity-0 -translate-y-1" : "opacity-100"
            }`}
          >
            Matthew Horan
          </span>
        </Link>

        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none ${
            showPhoto ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={photoSrc}
            alt="Matthew Horan"
            width={100}
            height={100}
            className="rounded-full object-cover ring-2 ring-(--accent)"
            onError={() => setPhotoSrc("/me-placeholder.svg")}
          />
        </div>
      </div>

      {/* Hamburger menu button for mobile */}
      <button
        className="sm:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-current dark:text-(--accent) transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-current dark:text-(--accent) transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-current dark:text-(--accent) transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile dropdown menu */}
      <div className={`sm:hidden absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl transition-all duration-300 z-50 ${mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        <div className="bg-background rounded-2xl shadow-lg border ring-2 ring-(--accent) hover:shadow-xl hover:ring-(--accent-strong) transition-all duration-500 relative before:absolute before:-inset-1 before:rounded-[20px] before:border before:border-(--accent)/20 before:-z-10">
          <ul className="flex flex-col py-2">
            <li>
              <Link
                href="/"
                className="block px-6 py-3 dark:text-(--accent) hover:bg-(--accent)/10 transition-all duration-300 hover:scale-[1.02] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="block px-6 py-3 dark:text-(--accent) hover:bg-(--accent)/10 transition-all duration-300 hover:scale-[1.02] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/hobbies"
                className="block px-6 py-3 dark:text-(--accent) hover:bg-(--accent)/10 transition-all duration-300 hover:scale-[1.02] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hobbies
              </Link>
            </li>
            <li>
              <Link
                href="/work"
                className="block px-6 py-3 dark:text-(--accent) hover:bg-(--accent)/10 transition-all duration-300 hover:scale-[1.02] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block px-6 py-3 dark:text-(--accent) hover:bg-(--accent)/10 transition-all duration-300 hover:scale-[1.02] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {/* Theme Switcher for mobile */}
            <li className="px-6 py-3">
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop navigation */}
  <ul className="hidden sm:flex items-center gap-4 text-base">
        <li
          className="hover:scale-[1.1] transition-all duration-300 relative"
          onMouseEnter={() => setHoveredLink("home")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link href="/" className="text-zinc-800 dark:text-(--accent) flex items-center justify-center">
            <span className={`transition-all duration-300 ${hoveredLink === "home" ? "opacity-0 -translate-y-1" : "opacity-100"}`}>
              Home
            </span>
            <svg className={`absolute w-6 h-6 transition-all duration-300 ${hoveredLink === "home" ? "opacity-100" : "opacity-0"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
        </li>
        <li
          className="hover:scale-[1.05] transition-all duration-300 py-1 relative"
          onMouseEnter={() => setHoveredLink("projects")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link href="/projects" className="text-zinc-800 dark:text-(--accent) flex items-center justify-center">
            <span className={`transition-all duration-300 ${hoveredLink === "projects" ? "opacity-0 -translate-y-1" : "opacity-100"}`}>
              Projects
            </span>
            <svg className={`absolute w-6 h-6 transition-all duration-300 ${hoveredLink === "projects" ? "opacity-100" : "opacity-0"}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </Link>
        </li>
        <li
          className="hover:scale-[1.1] transition-all duration-300 relative"
          onMouseEnter={() => setHoveredLink("hobbies")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link href="/hobbies" className="text-zinc-800 dark:text-(--accent) flex items-center justify-center">
            <span className={`transition-all duration-300 ${hoveredLink === "hobbies" ? "opacity-0 -translate-y-1" : "opacity-100"}`}>
              Hobbies
            </span>
            <svg className={`absolute w-6 h-6 transition-all duration-300 ${hoveredLink === "hobbies" ? "opacity-100" : "opacity-0"}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </Link>
        </li>
        <li
          className="hover:scale-[1.05] transition-all duration-300 py-1 relative"
          onMouseEnter={() => setHoveredLink("work")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link href="/work" className="text-zinc-800 dark:text-(--accent) flex items-center justify-center">
            <span className={`transition-all duration-300 ${hoveredLink === "work" ? "opacity-0 -translate-y-1" : "opacity-100"}`}>
              Work
            </span>
            <svg className={`absolute w-6 h-6 transition-all duration-300 ${hoveredLink === "work" ? "opacity-100" : "opacity-0"}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
            </svg>
          </Link>
        </li>
        <li
          className="hover:scale-[1.05] transition-all duration-300 py-1 relative"
          onMouseEnter={() => setHoveredLink("contact")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link href="/contact" className="text-zinc-800 dark:text-(--accent) flex items-center justify-center">
            <span className={`transition-all duration-300 ${hoveredLink === "contact" ? "opacity-0 -translate-y-1" : "opacity-100"}`}>
              Contact
            </span>
            <svg className={`absolute w-6 h-6 transition-all duration-300 ${hoveredLink === "contact" ? "opacity-100" : "opacity-0"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </Link>
        </li>
        {/* Theme Switcher for desktop */}
        <li className="ml-4">
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
}
