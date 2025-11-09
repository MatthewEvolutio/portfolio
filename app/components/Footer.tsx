import Link from "next/link";
import Image from "next/image";
import { assetUrl } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left section - Name and copyright */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Link href="/" className="text-xl font-semibold dark:text-(--accent) transition-colors hover:text-(--accent-strong)">
              Matthew Horan
            </Link>
            <p className="text-sm dark:text-(--muted)">
              © {new Date().getFullYear()} Matthew Horan. All rights reserved.
            </p>
          </div>

          {/* Middle section - Navigation links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/" className="dark:text-(--muted) transition-colors hover:text-(--accent)">
              Home
            </Link>
            <Link href="/projects" className="dark:text-(--muted) transition-colors hover:text-(--accent)">
              Projects
            </Link>
            <Link href="/work" className="dark:text-(--muted) transition-colors hover:text-(--accent)">
              Work
            </Link>
            <Link href="/hobbies" className="dark:text-(--muted) transition-colors hover:text-(--accent)">
              Hobbies
            </Link>
            <Link href="/contact" className="dark:text-(--muted) transition-colors hover:text-(--accent)">
              Contact
            </Link>
          </nav>

          {/* Right section - Social links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/MatthewEvolutio"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)"
              aria-label="GitHub"
            >
              <Image
                src={assetUrl("/github.svg")}
                alt="GitHub"
                width={20}
                height={20}
                className="social-icon brightness-0 dark:brightness-0"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/matthew-horan-9a4216202/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)"
              aria-label="LinkedIn"
            >
              <Image
                src={assetUrl("/linkedin.svg")}
                alt="LinkedIn"
                width={20}
                height={20}
                className="social-icon brightness-0 dark:brightness-0"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
