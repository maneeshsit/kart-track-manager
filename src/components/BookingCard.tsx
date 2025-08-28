import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, DollarSign } from "lucide-react";

interface BookingCardProps {
  time: string;
  available: boolean;
  price: number;
  maxParticipants: number;
  onBook: (time: string) => void;
}

export const BookingCard = ({ time, available, price, maxParticipants, onBook }: BookingCardProps) => {
  return (
    <Card className={`transform transition-all duration-300 hover:scale-105 ${
      available ? 'hover:shadow-racing border-primary/20' : 'opacity-60'
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          {time}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Max {maxParticipants} racers</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>${price}/hour</span>
          </div>
        </div>
        <Button 
          variant={available ? "racing" : "secondary"} 
          disabled={!available}
          onClick={() => onBook(time)}
          className="w-full"
        >
          {available ? "Book Now" : "Unavailable"}
        </Button>
      </CardContent>
    </Card>
  );
};