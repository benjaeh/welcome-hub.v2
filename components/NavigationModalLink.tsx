'use client';

import React from "react";
import { ChevronRight, X } from "lucide-react";

type NavigationModalLinkProps = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  embedUrl?: string;
  externalUrl?: string;
  returnAfterMs?: number;
  returnTo?: string;
  closeLabel?: string;
  fallbackTitle?: string;
  fallbackBody?: string;
  fallbackActionLabel?: string;
};

export default function NavigationModalLink({
  title,
  icon: Icon,
  className,
  embedUrl,
  externalUrl,
  returnAfterMs,
  returnTo = "/",
  closeLabel = "Close",
  fallbackTitle = "Having trouble viewing this page?",
  fallbackBody = "Some sites block embedded views. You can open it in a new tab.",
  fallbackActionLabel = "Open in browser",
}: NavigationModalLinkProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const titleId = React.useId();

  const openExternal = React.useCallback(
    (url?: string) => {
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
      if (returnAfterMs && returnAfterMs > 0) {
        window.setTimeout(() => {
          window.location.assign(returnTo);
        }, returnAfterMs);
      }
    },
    [returnAfterMs, returnTo]
  );

  const handleCardClick = () => {
    if (embedUrl) {
      setIsOpen(true);
      return;
    }
    openExternal(externalUrl);
  };

  const handleFallbackOpen = () => {
    const fallbackUrl = externalUrl ?? embedUrl;
    openExternal(fallbackUrl);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const cardClasses =
    className ??
    "flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md";

  return (
    <>
      <button type="button" aria-label={title} onClick={handleCardClick} className={cardClasses}>
        <span className="flex items-center gap-2">
          <span className="rounded-xl bg-teal-50 p-2 text-teal-600">
            <Icon className="w-4 h-4" />
          </span>
          {title}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </button>

      {isOpen && embedUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex h-[min(82vh,720px)] w-full max-w-6xl flex-col rounded-3xl bg-white p-4 md:p-6 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 id={titleId} className="text-lg font-semibold text-slate-900">
                {title}
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <X className="h-4 w-4" />
                {closeLabel}
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title={title}
                src={embedUrl}
                className="h-full w-full"
                loading="eager"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <div className="space-y-0.5">
                <p className="font-semibold">{fallbackTitle}</p>
                <p className="text-xs text-slate-600">{fallbackBody}</p>
              </div>
              <button
                type="button"
                onClick={handleFallbackOpen}
                className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                {fallbackActionLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
