import { Calendar, BarChart3, Users, Settings, DollarSign, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const AdminSidebar = ({ activeTab, onTabChange, onLogout }: AdminSidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-secondary h-screen p-4 space-y-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary">GoKart Admin</h2>
        <p className="text-sm text-muted-foreground">Racing Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "racing" : "ghost"}
              className="w-full justify-start"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};