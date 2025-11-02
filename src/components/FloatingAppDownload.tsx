import { Apple } from "lucide-react";
import { Button } from "./ui/button";

export const FloatingAppDownload = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-card border border-border rounded-lg shadow-racing p-6 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          {/* Left text section */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-primary tracking-tight">
              Download the App
            </h3>
          </div>
          
          {/* Right buttons section */}
          <div className="flex flex-col gap-3">
            {/* Google Play Button */}
            <a 
              href="#" 
              className="flex items-center gap-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-4 py-2.5 transition-all hover:shadow-glow"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wide">GET IT ON</div>
                <div className="text-base font-semibold leading-tight">Google Play</div>
              </div>
            </a>
            
            {/* App Store Button */}
            <a 
              href="#" 
              className="flex items-center gap-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-4 py-2.5 transition-all hover:shadow-glow"
            >
              <Apple className="h-7 w-7" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wide">Download on the</div>
                <div className="text-base font-semibold leading-tight">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
