/**
 * Navbar.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * The navigation bar component that appears at the top of every page in the LEMN platform.
 * This component provides primary navigation controls and displays the current authentication
 * state of the user. It includes links to major features (Search Tutors, Apply as Tutor,
 * Dashboard, Posts) and handles user authentication actions (Login, Sign Up, Logout).
 * The navbar is responsive and adapts to different screen sizes, hiding some navigation
 * links on mobile devices. For logged-in users, it displays a dropdown menu with profile
 * access and account management options.
 */

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { User, LogOut, Search, MessageSquare } from "lucide-react";

/**
 * Props interface for the Navbar component
 * Defines all the callbacks and state needed for navigation and authentication
 */
interface NavbarProps {
  isLoggedIn: boolean;       // Whether user is currently authenticated
  userEmail?: string;        // Email of logged-in user (shown in dropdown)
  onLogin: () => void;       // Callback to show login page/dialog
  onSignUp: () => void;      // Callback to show registration page/dialog
  onLogout: () => void;      // Callback to log user out
  onApply?: () => void;      // Optional: Navigate to tutor application page
  onSearch?: () => void;     // Optional: Navigate to tutor search page
  onHome?: () => void;       // Optional: Navigate to home page
  onDashboard?: () => void;  // Optional: Navigate to user dashboard
  onProfile?: () => void;    // Optional: Navigate to user profile
  onPosts?: () => void;      // Optional: Navigate to posts/announcements page
  onTeam?: () => void;    // Optional: Navigate to team page
  // Search bar props (only shown on home page)
  searchQuery?: string;
  selectedSubject?: string;
  subjects?: string[];
  onSearchQueryChange?: (query: string) => void;
  onSubjectChange?: (subject: string) => void;
  showSearchBar?: boolean;   // Control whether to show the search bar
}

/**
 * Navbar Component
 * 
 * The main navigation bar that appears at the top of every page in the LEMN platform.
 * Provides access to all major features and displays authentication state.
 * 
 * Features:
 * - Logo/brand name with click-to-home functionality
 * - Navigation links (Search Tutors, Apply as Tutor, Dashboard, Posts)
 * - User authentication buttons (Login/Sign Up when logged out)
 * - User profile dropdown menu (when logged in)
 * - Responsive design (hides some links on mobile)
 */
export function Navbar({
  isLoggedIn,
  userEmail,
  onLogin,
  onSignUp,
  onLogout,
  onApply,
  onSearch,
  onHome,
  onDashboard,
  onProfile,
  onPosts,
  onTeam,
  searchQuery,
  selectedSubject,
  subjects,
  onSearchQueryChange,
  onSubjectChange,
  showSearchBar
}: NavbarProps) {
  return (
    <nav className="border-b bg-card">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Top Row - Main Navigation */}
        <div className="flex items-center gap-4 h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => {
              if(!isLoggedIn) {
                onHome?.();
              }
            }}
            className="flex-shrink-0 hover:opacity-80 transition-opacity mr-2"
          >
            <span className="tracking-wider text-xl text-primary font-extrabold">LEMN SFSU</span>
          </button>

          {/* Navigation Links - Left side */}
          <div className="hidden lg:flex items-center gap-6 mr-4">
            {onApply && (
              <button
                onClick={onApply}
                className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Apply as Tutor
              </button>
            )}
            {onDashboard && (
              <button
                onClick={onDashboard}
                className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Dashboard
              </button>
            )}
            {onPosts && (
              <button
                onClick={onPosts}
                className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                <MessageSquare className="h-4 w-4" />
                Posts
              </button>
            )}
            { (
              <button
                onClick={onTeam}
                className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap">
                Team
              </button>
            )}
          </div>

          {/* Amazon-style Search Bar - Takes up most of the space */}
          {subjects && onSearchQueryChange && onSubjectChange && (
            <div className="flex-1 max-w-2xl">
              <div className="flex border-2 border-primary rounded-lg overflow-hidden bg-card hover:border-primary/80 transition-colors">
                {/* Subject Dropdown */}
                <Select value={selectedSubject} onValueChange={onSubjectChange}>
                  <SelectTrigger className="w-[160px] border-0 rounded-none bg-secondary hover:bg-secondary/80 transition-colors">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => {
                      if (typeof subject === "string") {
                        return (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        );
                      } else {
                        // It's an object { Subject_id, Subject_name }
                        return (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        );
                      }
                    })}
                    <DropdownMenuSeparator />
                  </SelectContent>
                </Select>

                {/* Search Input */}
                <div className="flex-1 flex items-center">
                  <Input
                    type="text"
                    placeholder="Search for subjects..."
                    value={searchQuery}
                    onChange={(e) => {console.log(e.target.value);onSearchQueryChange(e.target.value)}}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                  />
                </div>

                {/* Search Icon Button */}
                <button
                  className="px-4 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
                  onClick={onSearch}
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Right Section - Auth Controls */}
          <div className="flex items-center gap-3 ml-auto">
            {isLoggedIn ? (
              /* Logged In State */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-secondary">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm hidden sm:inline">{userEmail}</span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={onProfile}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  {/* Mobile-only menu items */}
                  <div className="lg:hidden">
                    {onSearch && (
                      <DropdownMenuItem onClick={onSearch}>
                        <Search className="mr-2 h-4 w-4" />
                        <span>Search Tutors</span>
                      </DropdownMenuItem>
                    )}
                    {onApply && (
                      <DropdownMenuItem onClick={onApply}>
                        <span>Apply as Tutor</span>
                      </DropdownMenuItem>
                    )}
                    {onDashboard && (
                      <DropdownMenuItem onClick={onDashboard}>
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    )}
                    {onPosts && (
                      <DropdownMenuItem onClick={onPosts}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Posts</span>
                      </DropdownMenuItem>
                    )}
                    {onTeam && (
                      <DropdownMenuItem onClick={onTeam}>
                        <span>Team</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                  </div>

                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Logged Out State */
              <>
                <Button variant="ghost" onClick={onLogin}>
                  Login
                </Button>
                <Button onClick={onSignUp} className="bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}