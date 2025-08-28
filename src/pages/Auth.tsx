import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Flag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        setError(error.message);
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Check your email",
            description: "Please check your email and click the confirmation link to complete registration.",
          });
        }
      } else {
        if (!isLogin) {
          toast({
            title: "Account created! 🏁",
            description: "Please check your email to confirm your account.",
          });
        } else {
          toast({
            title: "Welcome back! 🏁",
            description: "You've successfully logged in to GoKart Racing.",
          });
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-racing p-4">
      <Card className="w-full max-w-md shadow-racing">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flag className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">
              Go<span className="text-accent">Kart</span> Racing
            </CardTitle>
            <Flag className="h-6 w-6 text-accent" />
          </div>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back to the track!" : "Join the racing community"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              variant="racing" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login to Race" : "Join the Track"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-primary"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;