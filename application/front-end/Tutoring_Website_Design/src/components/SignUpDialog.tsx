/**
 * SignUpDialog.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A modal dialog component for quick user registration without leaving the current page.
 * This is a legacy component kept for backward compatibility, though the full-page
 * RegisterPage is now the primary registration interface. The dialog provides a compact
 * sign-up form with fields for name, email, password, and phone number. It includes
 * SFSU email validation, password visibility toggle, and a link to switch to the login
 * dialog for existing users.
 */

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Label } from "./ui/label";

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUp: (email: string) => void;
  onSwitchToLogin: () => void;
}

export function SignUpDialog({ open, onOpenChange, onSignUp, onSwitchToLogin }: SignUpDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@sfsu.edu")) {
      toast.error("Please use your SFSU email");
      return;
    }

    onSignUp(email);
    onOpenChange(false);
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
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
            <DialogTitle className="text-center">Sign Up for LEMN</DialogTitle>
            <DialogDescription className="sr-only">
              Create a new LEMN account using your SFSU email and personal information
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 border-2 border-primary rounded-none"
              />
            </div>

            {/* Password field with visibility toggle */}
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

            <div>
              <Label htmlFor="email">SFSU Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="SFSU Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 border-2 border-primary rounded-none"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-14 border-2 border-primary rounded-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-primary hover:bg-primary/90 rounded-none"
            >
              Sign Up
            </Button>

            <p className="text-center text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onSwitchToLogin();
                }}
                className="text-primary hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}