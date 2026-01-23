import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginError, setLoginError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [realStats, setRealStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    todayBookings: 0,
  });

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    } else {
      setCheckingAdmin(false);
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchDashboardStats();
    }
  }, [user, isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) {
      setCheckingAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch {
      setIsAdmin(false);
    } finally {
      setCheckingAdmin(false);
    }
  };

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
    } catch {
      // Silently handle error - stats will remain at default values
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoginError("Invalid credentials. Please try again.");
      } else {
        setLoginError("");
      }
    } catch {
      setLoginError("An error occurred. Please try again.");
    }
  };

  const handleLogout = async () => {
    await signOut();
    setActiveTab("dashboard");
    setIsAdmin(false);
    navigate("/");
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-racing">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You do not have admin privileges to access this page.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
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
