/**
 * RegisterPage.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A full-page registration component for new user sign-up in the LEMN platform. This page
 * provides a comprehensive registration form with fields for name, email, password, and
 * password confirmation. It includes SFSU email validation, password strength requirements,
 * password visibility toggles, and a terms of service acceptance checkbox. The page uses
 * a centered card layout with gradient background to maintain visual consistency with the
 * login page.
 */

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { authAPI } from "../services/api";

interface RegisterPageProps {
  onRegister: (email: string) => void;
  onSwitchToLogin: () => void;
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

export function RegisterPage({ 
  onRegister, 
  onSwitchToLogin, 
  onBackToHome,
  onNavigate,
  isLoggedIn = false,
  onLogout = () => {},
  searchQuery,
  selectedSubject,
  subjects,
  onSearchQueryChange,
  onSubjectChange
}: RegisterPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!firstName || !lastName || !email || !password) {
    toast.error("Please fill in all fields");
    return;
  }
  console.log("form submitted");
  if (!email.includes("@sfsu.edu")) {
    toast.error("Please use your SFSU email");
    return;
  }

  const phoneToSend = phone.trim() === "" ? null : phone;

  if (!acceptTerms) {
    toast.error("Please accept the terms and conditions");
    return;
  }
  try {
    await authAPI.signup(firstName, lastName, email, password, phoneToSend);
    toast.success("Account created successfully!");
    onRegister(email);
  } catch (err: any) {
    toast.error(err.message || "Failed to register");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={onSwitchToLogin}
        onSignUp={() => {}}
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

      {/* Registration Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl p-8 border">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-primary to-primary/80 p-3 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="mb-2">Create Account</h1>
              <p className="text-muted-foreground">Join LEMN SFSU and start learning</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="block text-sm mb-2">First Name</Label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 border-2 focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex-1">
                  <Label className="block text-sm mb-2">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 border-2 focus:border-primary transition-colors"
                  />
                </div>
              </div>


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
                  placeholder="Create a strong password"
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

              <div>
                <Label className="block text-sm mb-2">Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  I accept the terms and conditions
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                Create Account
              </Button>

              <p className="text-center text-muted-foreground text-sm pt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}