import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const TermsAndConditions = () => {
  return (
    <div className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-racing">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Terms & Conditions
            </CardTitle>
            <p className="text-muted-foreground">
              Please read our terms and conditions before racing with us
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Safety Requirements</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• All drivers must be at least 12 years old</li>
                <li>• Closed-toe shoes are mandatory - no sandals or flip-flops</li>
                <li>• Long hair must be tied back securely</li>
                <li>• Loose clothing and jewelry are not permitted on the track</li>
                <li>• Helmets and safety equipment will be provided and must be worn at all times</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Booking & Payment</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• All bookings require full payment at time of reservation</li>
                <li>• Cancellations must be made at least 24 hours in advance for full refund</li>
                <li>• Late arrivals (more than 15 minutes) may result in session forfeiture</li>
                <li>• Group bookings (6+ people) receive a 10% discount</li>
                <li>• Prices are subject to change during peak hours and holidays</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Track Rules</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Maximum speed limits will be enforced based on driver experience</li>
                <li>• Aggressive driving, bumping, or dangerous behavior will result in immediate removal</li>
                <li>• Follow all marshal instructions and track signals</li>
                <li>• No alcohol or drugs permitted before or during racing</li>
                <li>• Drivers under 18 require parental consent</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Liability</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Participants race at their own risk</li>
                <li>• GoKart Racing is not responsible for personal injuries or property damage</li>
                <li>• All participants must sign a waiver before racing</li>
                <li>• Medical conditions that may affect driving ability must be disclosed</li>
                <li>• We reserve the right to refuse service to anyone</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                By booking a session with GoKart Racing, you agree to all terms and conditions listed above.
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};