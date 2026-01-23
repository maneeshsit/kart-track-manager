import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CookiePreferences {
  analytics: boolean;
  preferences: boolean;
  advertising: boolean;
}

const COOKIE_CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: false,
    preferences: false,
    advertising: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setOpen(false);
  };

  const handleAcceptSelected = () => {
    savePreferences(preferences);
  };

  const handleRefuseAll = () => {
    savePreferences({
      analytics: false,
      preferences: false,
      advertising: false,
    });
  };

  const handleAcceptAll = () => {
    savePreferences({
      analytics: true,
      preferences: true,
      advertising: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-background p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-foreground italic">
            Cookie settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <p className="text-foreground text-sm leading-relaxed">
            Our website uses cookies which are necessary for running the website and for providing the services you request. We would also like to set the following optional cookies on your device. You can change these settings any time later by clicking "Change cookie settings" at the bottom of any page. For more information, please read our{" "}
            <a href="#" className="underline font-medium hover:text-primary">
              Cookie Information.
            </a>
          </p>

          <div className="space-y-6">
            {/* Analytics */}
            <div className="flex items-start gap-4">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked === true }))
                }
                className="mt-1 h-5 w-5 rounded border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="space-y-1">
                <label htmlFor="analytics" className="text-base font-semibold text-foreground cursor-pointer">
                  Analytics
                </label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We collect statistics to understand how many visitors we have, how our visitors interact with the site and how we can improve it. The collected data does not directly identify anyone.
                </p>
              </div>
            </div>

            {/* Preferences */}
            <div className="flex items-start gap-4">
              <Checkbox
                id="preferences"
                checked={preferences.preferences}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, preferences: checked === true }))
                }
                className="mt-1 h-5 w-5 rounded border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="space-y-1">
                <label htmlFor="preferences" className="text-base font-semibold text-foreground cursor-pointer">
                  Preferences
                </label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We store choices you have made so that they are remembered across visits in order to provide you a more personalized experience.
                </p>
              </div>
            </div>

            {/* Advertising and tracking */}
            <div className="flex items-start gap-4">
              <Checkbox
                id="advertising"
                checked={preferences.advertising}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, advertising: checked === true }))
                }
                className="mt-1 h-5 w-5 rounded border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="space-y-1">
                <label htmlFor="advertising" className="text-base font-semibold text-foreground cursor-pointer">
                  Advertising and tracking
                </label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your browsing behavior is tracked across websites by advertising and social network service providers. You may see tailored advertising and content on other websites based on your browsing profile.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleAcceptSelected}
              className="rounded-full border-2 border-foreground px-6 py-2 text-foreground hover:bg-muted font-medium"
            >
              Accept selected
            </Button>
            <Button
              variant="outline"
              onClick={handleRefuseAll}
              className="rounded-full border-2 border-foreground px-6 py-2 text-foreground hover:bg-muted font-medium"
            >
              Refuse all
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="rounded-full bg-accent px-6 py-2 text-accent-foreground hover:bg-accent/90 font-medium"
            >
              Accept all
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
