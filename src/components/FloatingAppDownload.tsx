import { Apple, X } from "lucide-react";
import { useState } from "react";

export const FloatingAppDownload = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Download our mobile app"
      className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-xs w-full"
    >
      <div className="bg-secondary border border-primary/40 rounded-xl shadow-racing p-5 relative">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss app download banner"
          className="absolute top-3 right-3 text-secondary-foreground/50 hover:text-secondary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded-sm"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Eyebrow */}
        <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-1">
          Now Available
        </p>

        {/* Heading */}
        <h2 className="text-lg font-bold text-secondary-foreground leading-snug mb-4">
          Download the GoKart App
        </h2>

        {/* Divider */}
        <div className="h-px bg-primary/20 mb-4" aria-hidden="true" />

        {/* Store buttons */}
        <div className="flex flex-col gap-2.5">
          {/* Google Play */}
          <a
            href="#"
            aria-label="Download GoKart on Google Play"
            className="flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] rounded-lg px-4 py-2.5 transition-all duration-200 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <svg
              className="h-6 w-6 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-widest opacity-75 font-medium">
                Get it on
              </div>
              <div className="text-sm font-bold leading-tight">Google Play</div>
            </div>
          </a>

          {/* App Store */}
          <a
            href="#"
            aria-label="Download GoKart on the App Store"
            className="flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] rounded-lg px-4 py-2.5 transition-all duration-200 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Apple className="h-6 w-6 shrink-0" aria-hidden="true" />
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-widest opacity-75 font-medium">
                Download on the
              </div>
              <div className="text-sm font-bold leading-tight">App Store</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
