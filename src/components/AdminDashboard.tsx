import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react";

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  todayBookings: number;
}

interface AdminDashboardProps {
  stats: DashboardStats;
}

export const AdminDashboard = ({ stats }: AdminDashboardProps) => {
  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-accent",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Today's Bookings",
      value: stats.todayBookings,
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">GoKart Racing Analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-racing transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Booking #{i}001</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString()} - {10 + i}:00 AM
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${50 + i * 10}</p>
                    <p className="text-sm text-primary">Confirmed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 9 }, (_, i) => {
                const hour = i + 9;
                const revenue = Math.floor(Math.random() * 300) + 100;
                return (
                  <div key={hour} className="flex items-center justify-between">
                    <span className="text-sm">{hour}:00 - {hour + 1}:00</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-racing h-2 rounded-full"
                          style={{ width: `${(revenue / 400) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">${revenue}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};