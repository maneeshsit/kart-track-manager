import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminDashboard } from "@/components/AdminDashboard";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (email: string, password: string) => {
    // Demo credentials - in production, use proper authentication
    if (email === "admin@gokart.com" && password === "racing123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("dashboard");
  };

  const mockStats = {
    totalBookings: 1247,
    totalRevenue: 52380,
    activeUsers: 342,
    todayBookings: 23,
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />
      <div className="flex-1 overflow-auto">
        {activeTab === "dashboard" && <AdminDashboard stats={mockStats} />}
        {activeTab === "bookings" && (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary">Bookings Management</h1>
            <p className="text-muted-foreground">Manage all GoKart bookings</p>
          </div>
        )}
        {activeTab === "payments" && (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary">Payment Reports</h1>
            <p className="text-muted-foreground">View payment history and analytics</p>
          </div>
        )}
        {activeTab === "users" && (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary">User Management</h1>
            <p className="text-muted-foreground">Manage customer accounts</p>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary">Settings</h1>
            <p className="text-muted-foreground">Configure system settings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;