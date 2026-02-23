/**
 * ProfilePage.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A user profile management page where logged-in users can view and edit their personal
 * information on the LEMN platform. This page displays user details including name, email,
 * major, academic year, bio, phone number, and profile picture. Users can edit their
 * information with inline editing functionality and save changes. The page features a
 * clean card-based layout with sections for basic info, academic details, and contact
 * information.
 */

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, BookOpen } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userEmail?: string;
}

export function ProfilePage({ onNavigate, isLoggedIn, onLogout, userEmail }: ProfilePageProps) {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState(userEmail || "john.doe@sfsu.edu");
  const [major, setMajor] = useState("Computer Science");
  const [year, setYear] = useState("3rd Year");
  const [bio, setBio] = useState("Hi, I'm a computer science major passionate about software development and helping others learn.");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSave = () => {
    // In a real app, this would save to backend
    toast.success("Profile updated successfully!");
  };

  const handleImageUpload = () => {
    // In a real app, this would open file picker and upload image
    toast.info("Image upload feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogin={() => onNavigate("login")}
        onSignUp={() => onNavigate("register")}
        onLogout={onLogout}
        onApply={() => onNavigate("apply")}
        onSearch={() => onNavigate("home")}
        onHome={() => onNavigate("home")}
        onDashboard={() => onNavigate("dashboard")}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32 border-4 border-primary/20">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback className="bg-secondary text-2xl">
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleImageUpload}
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-center mb-1">{name}</h3>
                <p className="text-sm text-muted-foreground text-center">{email}</p>
              </div>
            </Card>
          </div>

          {/* Profile Information Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Major */}
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="major"
                      type="text"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your major"
                    />
                  </div>
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g., 3rd Year"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    {bio.length}/500 characters
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => onNavigate("dashboard")}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}