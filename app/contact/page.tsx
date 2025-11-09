"use client";

import Card from "../components/Card";
import { assetUrl } from "@/lib/utils";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Create mailto link as fallback
    const mailtoLink = `mailto:matthewhoran27@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
      `From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      setSubmitStatus("success");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-start justify-center font-sans dark:bg-background px-4 py-12">
      <main className="w-full max-w-3xl flex flex-col gap-8">
        <Card className="w-full">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight dark:text-(--accent) mb-6">
            Get in Touch
          </h1>

          {/* Contact Info Card */}
          <Card variant="sub" className="mb-6">
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--accent)/20">
                  <svg className="w-5 h-5 dark:text-(--accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a
                  href="mailto:matthewhoran27@gmail.com"
                  className="text-lg dark:text-(--accent) hover:text-(--accent-strong) transition-colors"
                >
                  matthewhoran27@gmail.com
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--accent)/20">
                  <svg className="w-5 h-5 dark:text-(--accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/MatthewEvolutio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)"
                    aria-label="GitHub"
                  >
                    <span
                      className="mask-icon w-5 h-5"
                      style={{ ['--icon-url' as any]: `url('${assetUrl("/github.svg")}')` }}
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-[#002b36] transition-all duration-300 hover:scale-[1.05] hover:bg-(--btn-hover) dark:bg-(--accent) dark:text-[#002b36] dark:hover:bg-(--accent-strong)"
                    aria-label="LinkedIn"
                  >
                    <span
                      className="mask-icon w-5 h-5"
                      style={{ ['--icon-url' as any]: `url('${assetUrl("/linkedin.svg")}')` }}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card variant="sub">
            <h2 className="text-xl font-semibold dark:text-(--accent) mb-4">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium dark:text-(--muted) mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-(--accent)/30 bg-background/50 dark:text-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent) transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium dark:text-(--muted) mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-(--accent)/30 bg-background/50 dark:text-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent) transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium dark:text-(--muted) mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-(--accent)/30 bg-background/50 dark:text-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent) transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-foreground text-[#002b36] dark:bg-(--accent) dark:text-[#002b36] font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-(--btn-hover) dark:hover:bg-(--accent-strong) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="text-sm dark:text-(--accent)">
                  Your email client should open with the message. If not, please email me directly.
                </p>
              )}
            </form>
          </Card>
        </Card>
      </main>
    </div>
  );
}