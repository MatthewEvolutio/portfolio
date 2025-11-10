import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ParticlesThemeClient from "./components/ParticlesThemeClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matthew Horan Portfolio",
  description: "A portfolio showcasing the projects and work experience of Matthew Horan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
  {/* Animated particles background for theme-particles */}
  <ParticlesThemeClient />
        <div className="w-full flex-1 flex flex-col">
          <div className="w-full max-w-3xl mx-auto px-8 pt-8 md:pt-16 flex-1">
            <Nav />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
// (removed extra closing brace)


}
