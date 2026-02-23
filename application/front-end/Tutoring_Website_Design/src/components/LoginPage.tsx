/**
 * LoginPage.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A full-page login component for user authentication in the LEMN platform. This page
 * provides a dedicated login interface with email and password fields, SFSU email
 * validation, and password visibility toggle. The page includes navigation back to
 * home and a link to switch to registration for new users. It uses a centered card
 * layout with gradient background for an appealing visual design.
 */

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { authAPI } from "../services/api";

interface LoginPageProps {
  onLogin: (email: string, token: string) => void;
  onSwitchToRegister: () => void;
  onBackToHome?: () => void;
  onNavigate?: (page: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  // Search props
  searchQuery?: string;
  selectedSubject?: string;
  subjects?: string[];
  onSearchQueryChange?: (query: string) => void;
  onSubjectChange?: (subject: string) => void;
}

export function LoginPage({ 
  onLogin, 
  onSwitchToRegister, 
  onBackToHome,
  onNavigate,
  isLoggedIn = false,
  onLogout = () => {},
  searchQuery,
  selectedSubject,
  subjects,
  onSearchQueryChange,
  onSubjectChange
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  if (!email.includes("@sfsu.edu")) {
    toast.error("Please use your SFSU email");
    return;
  }

  try {
    // Call the login API
    const response = await authAPI.login(email, password);

    localStorage.setItem("authToken", response.token);

    toast.success("Logged in successfully!");
    onLogin(email, response.token); // call the parent callback to update app state
  } catch (err: any) {
    toast.error(err.message || "Failed to login");
  }
};

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast.error("Please enter your email");
      return;
    }

    if (!resetEmail.includes("@sfsu.edu")) {
      toast.error("Please use your SFSU email");
      return;
    }

    toast.info("Password reset link will be sent to your email");
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={() => {}}
        onSignUp={onSwitchToRegister}
        onLogout={onLogout}
        onApply={() => onNavigate?.("apply")}
        onSearch={() => onNavigate?.("home")}
        onHome={() => onNavigate?.("home")}
        onDashboard={() => onNavigate?.("dashboard")}
        onProfile={() => onNavigate?.("profile")}
        onPosts={() => onNavigate?.("posts")}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={onSearchQueryChange}
        onSubjectChange={onSubjectChange}
      />

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl p-8 border">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-primary to-primary/80 p-3 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to continue to LEMN SFSU</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="block text-sm mb-2">SFSU Email</Label>
                <Input
                  type="email"
                  placeholder="your.email@sfsu.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="relative">
                <Label className="block text-sm mb-2">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 focus:border-primary transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
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
                className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                Sign In
              </Button>

              <p className="text-center text-muted-foreground text-sm pt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-primary hover:underline"
                >
                  Create account
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

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
    </div>
  );
}