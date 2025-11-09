"use client";

import Card from "../components/Card";
import { assetUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string | undefined;
  const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string | undefined;
  const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string | undefined;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState<string | null>(null);

  // Initialize EmailJS once on mount when key is present
  useEffect(() => {
    if (emailJsPublicKey) {
      try {
        emailjs.init(emailJsPublicKey);
      } catch (e) {
        console.warn("EmailJS init failed", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget; // capture before any awaits
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      if (!(emailJsPublicKey && emailJsServiceId && emailJsTemplateId)) {
        setErrorText("Email service is not configured.");
        setSubmitStatus("error");
        return;
      }

      const result = await emailjs.send(emailJsServiceId, emailJsTemplateId, {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      });
      console.log("EmailJS result", result);

      // Treat any resolved result as success; SDK rejects on actual failure
      setFormData({ name: "", email: "", message: "" });
      formEl?.reset();
      setErrorText(null);
      setSubmitStatus("success");
    } catch (err: any) {
      console.error("Contact form submit failed", err);
      const text = err?.text || err?.message || "Unknown error";
      setErrorText(typeof text === "string" ? text : JSON.stringify(text));
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Config hint if EmailJS not fully set */}
            {!(emailJsPublicKey && emailJsServiceId && emailJsTemplateId) && (
              <div className="mb-4 rounded-lg border border-(--accent)/30 bg-background/60 p-3 text-sm dark:text-(--muted)">
                <p className="mb-1">Email form is using a fallback until EmailJS is fully configured.</p>
                <p>
                  Add <code className="px-1 rounded bg-black/10">NEXT_PUBLIC_EMAILJS_PUBLIC_KEY</code> and
                  <code className="px-1 ml-1 rounded bg-black/10">NEXT_PUBLIC_EMAILJS_TEMPLATE_ID</code>
                  {emailJsServiceId ? '' : ' and '}
                  {!emailJsServiceId && (
                    <code className="px-1 ml-1 rounded bg-black/10">NEXT_PUBLIC_EMAILJS_SERVICE_ID</code>
                  )}
                  {' '}in your environment to send directly from the site.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium dark:text-(--accent) mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-(--accent)/30 bg-background/50 dark:text-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent) transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium dark:text-(--accent) mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-(--accent)/30 bg-background/50 dark:text-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent) transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium dark:text-(--accent) mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
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
                className="home-action w-full sm:w-auto px-8 py-3 rounded-full bg-foreground text-[#002b36] dark:bg-(--accent) dark:text-[#002b36] font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-(--btn-hover) dark:hover:bg-(--accent-strong) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="text-sm dark:text-(--accent)">Thanks! Your message was sent. I’ll get back to you shortly.</p>
              )}
              {submitStatus === "error" && (
                <div className="text-sm text-red-600">
                  <p>Sorry, something went wrong sending your message.</p>
                  {errorText && <p className="mt-1 opacity-80">Details: {errorText}</p>}
                </div>
              )}
            </form>
          </Card>
        </Card>
      </main>
    </div>
  );
}