// Centralized EmailJS public configuration
// IMPORTANT: These are public values intended for client-side use (safe to expose)
// Prefer reading from NEXT_PUBLIC_* at build time; optionally fallback to literals for GitHub Pages static export

export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "rSZLcluJXDDqodOwl";
export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_nohplj5";
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_jwtl92o";
