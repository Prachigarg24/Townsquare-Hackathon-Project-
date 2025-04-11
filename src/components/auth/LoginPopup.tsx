
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, UserCircle, Lock } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface LoginPopupProps {
  onFullLogin: () => void;
}

const LoginPopup = ({ onFullLogin }: LoginPopupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an authentication API
    if (email && password) {
      toast({
        title: "Login successful",
        description: "Welcome back to TownSquare!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Please enter your email and password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-1">
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="popup-email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <UserCircle size={18} />
            </div>
            <Input
              id="popup-email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="popup-password">Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Lock size={18} />
            </div>
            <Input
              id="popup-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              className="absolute inset-y-0 right-0 px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="popup-remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => {
                setRememberMe(checked as boolean);
              }}
            />
            <Label htmlFor="popup-remember" className="text-sm cursor-pointer">Remember me</Label>
          </div>
          <a href="#" className="text-sm text-primary hover:underline">Forgot?</a>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" type="button" onClick={onFullLogin}>
            Full Sign In
          </Button>
          <Button type="submit">Quick Sign In</Button>
        </DialogFooter>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-primary font-medium hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
