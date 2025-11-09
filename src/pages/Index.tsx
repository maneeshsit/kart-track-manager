import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingCard } from "@/components/BookingCard";
import { TermsAndConditions } from "@/components/TermsAndConditions";
import { Flag, Clock, Trophy, Users, LogIn, LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/gokart-hero.jpg";
import { FloatingAppDownload } from "@/components/FloatingAppDownload";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

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

  const handleBooking = async (time: string, price: number) => {
    if (!user) {
      toast({
        title: "Login Required 🏁",
        description: "Please login to book your racing session.",
      });
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          booking_date: selectedDate,
          time_slot: time,
          participants: 1,
          total_price: price,
        });

      if (error) throw error;

      toast({
        title: "Booking Confirmed! 🏁",
        description: `Your GoKart session for ${time} has been booked successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "See you soon! 🏁",
      description: "You've been logged out successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-racing">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Floating App Download */}
      <FloatingAppDownload />
      
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flag className="h-6 w-6 text-primary" />
            <span className="text-white font-bold text-xl">
              Go<span className="text-primary">Kart</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/auth")}
                className="text-black border-white/20 hover:bg-white/10"
              >
                <LogIn className="h-4 w-4 mr-2 text-black" />
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

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
          <div className="space-y-4">
            <Button 
              variant="racing" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Your Race
            </Button>
            {!user && (
              <div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-black border-white/20 hover:bg-white/10 ml-4"
                  onClick={() => navigate("/auth")}
                >
                  Login to Book
                </Button>
              </div>
            )}
          </div>
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

      {/* Terms and Conditions */}
      <TermsAndConditions />

      {/* Footer */}
      <footer className="bg-secondary py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 GoKart Racing. Experience the speed. Feel the adrenaline.
          </p>
          <div className="mt-4 space-x-4">
            <Button variant="link" onClick={() => window.location.href = '/admin'}>
              Admin Dashboard
            </Button>
            {!user && (
              <Button variant="link" onClick={() => navigate("/auth")}>
                Join the Track
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
