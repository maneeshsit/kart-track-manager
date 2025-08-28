import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingCard } from "@/components/BookingCard";
import { Flag, Clock, Trophy, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/gokart-hero.jpg";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Generate time slots from 9 AM to 6 PM
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return {
      time: `${hour}:00 - ${hour + 1}:00`,
      available: Math.random() > 0.3, // Random availability for demo
      price: 45 + (i * 5), // Increasing price throughout the day
      maxParticipants: 8,
    };
  });

  const handleBooking = (time: string) => {
    toast({
      title: "Booking Confirmed! 🏁",
      description: `Your GoKart session for ${time} has been booked successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flag className="h-8 w-8 text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold">
              Go<span className="text-primary">Kart</span>
            </h1>
            <Flag className="h-8 w-8 text-accent" />
          </div>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Experience the thrill of high-speed racing on our professional tracks
          </p>
          <Button 
            variant="racing" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Your Race
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Why Choose Our Track?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-racing transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Professional Track</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Race on our world-class track designed for maximum excitement and safety
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-racing transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Flexible Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Open daily from 9:00 AM to 6:00 PM for your racing convenience
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-racing transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Group Racing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Perfect for groups, parties, and competitive racing with friends
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div id="booking" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Book Your Session</h2>
            <p className="text-muted-foreground mb-6">Select your preferred time slot</p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-border rounded-md px-4 py-2 bg-background"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeSlots.map((slot) => (
              <BookingCard
                key={slot.time}
                time={slot.time}
                available={slot.available}
                price={slot.price}
                maxParticipants={slot.maxParticipants}
                onBook={handleBooking}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 GoKart Racing. Experience the speed. Feel the adrenaline.
          </p>
          <div className="mt-4">
            <Button variant="link" onClick={() => window.location.href = '/admin'}>
              Admin Dashboard
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
