/**
 * LoginDialog.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A modal dialog component for quick user login without leaving the current page.
 * This is a legacy component kept for backward compatibility, though the full-page
 * LoginPage is now the primary login interface. The dialog provides a compact form
 * with email and password fields, password visibility toggle, and SFSU email validation.
 * It includes a link to switch to the sign-up dialog for new users.
 */

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, token:string) => void;
  onSwitchToSignUp: () => void;
}

export function LoginDialog({ open, onOpenChange, onLogin, onSwitchToSignUp }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@sfsu.edu")) {
      toast.error("Please use your SFSU email");
      return;
    }

    onLogin(email);
    onOpenChange(false);
    setEmail("");
    setPassword("");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast.error("Please enter your email address");
      return;
    }

    if (!resetEmail.includes("@sfsu.edu")) {
      toast.error("Please use your SFSU email");
      return;
    }

    // In production, this would send a password reset email via backend API
    toast.success(`Password reset link sent to ${resetEmail}`);
    setShowForgotPassword(false);
    setResetEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-center">Login to LEMN</DialogTitle>
            <DialogDescription className="sr-only">
              Login to your LEMN account using your SFSU email and password
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">SFSU Email</Label>
              <Input
                type="email"
                placeholder="you@sfsu.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 border-2 border-primary rounded-none"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 border-2 border-primary rounded-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-2">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-primary hover:bg-primary/90 rounded-none"
            >
              Login
            </Button>

            <p className="text-center text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onSwitchToSignUp();
                }}
                className="text-primary hover:underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </DialogContent>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your SFSU email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleForgotPassword} className="space-y-4 py-4">
            <div>
              <Label htmlFor="reset-email">SFSU Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="your.email@sfsu.edu"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}