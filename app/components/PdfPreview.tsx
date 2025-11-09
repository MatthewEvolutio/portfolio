"use client";

import { assetUrl } from "@/lib/utils";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { useRef } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface PdfPreviewProps {
  filePath: string; // relative to public; will be passed through assetUrl
  height?: number; // px height of the preview container
}

// A scrollable, themed PDF preview showing the full document inside a fixed-height box
export default function PdfPreview({ filePath, height = 480 }: PdfPreviewProps) {
  const fileUrl = assetUrl(filePath);
  // Use a CDN worker by default to avoid bundling issues in static export
  const workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
  const lastWheelRef = useRef<number>(0);

  // Plugin: page navigation (must be called unconditionally at render time)
  const navPlugin = pageNavigationPlugin();
  const { CurrentPageLabel, GoToNextPage, GoToPreviousPage, NumberOfPages, jumpToNextPage, jumpToPreviousPage } = navPlugin;


  return (
    <div
      className="rounded-lg border-2 border-(--accent)/40 bg-(--background) shadow-lg shadow-(--accent)/10"
      style={{ height }}
    >
      <div className="flex flex-col h-full">
        {/* Controls */}
        <div
          className="flex items-center justify-between gap-4 px-3 py-2 border-b border-(--accent)/20 bg-(--background)"
          onClick={(e) => e.stopPropagation()}
        >
          <GoToPreviousPage>
            {({ onClick, isDisabled }) => (
              <button
                type="button"
                onClick={onClick}
                disabled={isDisabled}
                aria-label="Previous page"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-(--accent) text-(--accent-on) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--accent-strong) transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </GoToPreviousPage>
          <div className="text-sm dark:text-(--muted) flex items-center gap-1">
            Page <CurrentPageLabel /> / <NumberOfPages />
          </div>
          <GoToNextPage>
            {({ onClick, isDisabled }) => (
              <button
                type="button"
                onClick={onClick}
                disabled={isDisabled}
                aria-label="Next page"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-(--accent) text-(--accent-on) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--accent-strong) transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </GoToNextPage>
        </div>

        {/* Viewer */}
        <Worker workerUrl={workerUrl}>
          <div
            className="flex-1 overflow-auto themed-scrollbar pdf-preview flex items-start justify-center"
            onWheel={(e) => {
              // Allow normal scroll if page taller than container; if fully visible, use wheel to flip pages
              const container = e.currentTarget;
              const canScroll = container.scrollHeight > container.clientHeight;
              if (canScroll) return; // let browser scroll (will do nothing if not scrollable)
              const now = Date.now();
              if (now - lastWheelRef.current < 250) return;
              lastWheelRef.current = now;
              if (e.deltaY > 30) {
                jumpToNextPage();
              } else if (e.deltaY < -30) {
                jumpToPreviousPage();
              }
            }}
          >
            <Viewer
              fileUrl={fileUrl}
              defaultScale={SpecialZoomLevel.PageFit}
              plugins={[navPlugin]}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
}
