import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginError, setLoginError] = useState("");
  const [realStats, setRealStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    todayBookings: 0,
  });

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      // Get total bookings
      const { count: totalBookings } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      // Get total revenue
      const { data: revenueData } = await supabase
        .from('bookings')
        .select('total_price');
      
      const totalRevenue = revenueData?.reduce((sum, booking) => sum + Number(booking.total_price), 0) || 0;

      // Get today's bookings
      const today = new Date().toISOString().split('T')[0];
      const { count: todayBookings } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('booking_date', today);

      // Get active users (users with profiles)
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      setRealStats({
        totalBookings: totalBookings || 0,
        totalRevenue: Math.round(totalRevenue),
        activeUsers: activeUsers || 0,
        todayBookings: todayBookings || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    // Demo credentials for admin access
    if (email === "admin@gokart.com" && password === "racing123") {
      setLoginError("");
      // In a real app, you'd have proper admin authentication
    } else {
      setLoginError("Invalid admin credentials");
    }
  };

  const handleLogout = async () => {
    await signOut();
    setActiveTab("dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-racing">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // For demo purposes, check for demo admin credentials or any logged-in user
  const isAdminLoggedIn = user && (user.email === "admin@gokart.com" || user);

  if (!isAdminLoggedIn) {
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
        {activeTab === "dashboard" && <AdminDashboard stats={realStats} />}
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