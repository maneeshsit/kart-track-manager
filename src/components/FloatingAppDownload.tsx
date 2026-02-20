import { Apple } from "lucide-react";
import { Button } from "./ui/button";

export const FloatingAppDownload = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-secondary border border-primary/30 rounded-lg shadow-racing p-5 backdrop-blur-sm">
        <div className="flex items-center gap-5">
          {/* Left text section */}
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-0.5">Mobile</p>
            <h3 className="text-xl font-bold text-secondary-foreground tracking-tight leading-tight">
              Download<br />the App
            </h3>
          </div>

          <div className="w-px h-12 bg-primary/30" />
          
          {/* Right buttons section */}
          <div className="flex flex-col gap-2.5">
            {/* Google Play Button */}
            <a 
              href="#" 
              className="flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-all hover:shadow-glow"
            >
              <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-widest opacity-80">GET IT ON</div>
                <div className="text-sm font-bold leading-tight">Google Play</div>
              </div>
            </a>
            
            {/* App Store Button */}
            <a 
              href="#" 
              className="flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-all hover:shadow-glow"
            >
              <Apple className="h-6 w-6 shrink-0" />
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-widest opacity-80">DOWNLOAD ON THE</div>
                <div className="text-sm font-bold leading-tight">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
