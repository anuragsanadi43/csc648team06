import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { TutorCard } from "./components/TutorCard";
import { LoginDialog } from "./components/LoginDialog";
import { SignUpDialog } from "./components/SignUpDialog";
import { MessageDialog } from "./components/MessageDialog";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { TutorApplicationPage } from "./components/TutorApplicationPage";
import { DashboardPage } from "./components/DashboardPage";
import { ProfilePage } from "./components/ProfilePage";
import { PostingPage } from "./components/PostingPage";
import { AboutUsPage } from "./components/AboutUsPage";
import { AboutMemberPage } from "./components/AboutMemberPage";
import { Footer } from "./components/Footer";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { tutorAPI, subjectAPI, authAPI } from "./services/api";
import { useAuth } from "./AuthContext";
import { log } from "console";



/**
 * App.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * This is the main application component for the LEMN tutoring platform.
 * It serves as the root component that manages global application state including
 * user authentication, page routing, and tutor search functionality. The component
 * integrates with backend APIs for tutor and subject data, implements client-side
 * routing between different pages (home, login, register, dashboard, etc.), and
 * provides a seamless user experience with search filters and messaging capabilities.
 * 
 * Key Responsibilities:
 * - User authentication state management (login/logout/signup)
 * - Client-side routing and navigation between pages
 * - Tutor search and filtering (by subject and text query)
 * - Backend API integration with graceful fallback to mock data
 * - Coordination of all major features and components
 */

/**
 * Interface representing a tutor in the LEMN system
 * Contains all essential information about a tutor that students need to see
 */
interface Tutor {
  id: string;  // Unique identifier for the tutor (corresponds to 'id' in MySQL)
  name: string;      // First name (extracted from 'name' in MySQL)
  image?: string;          // Profile image (optional)
  sessionsCompleted: number; // Number of sessions completed (from MySQL)
  subjects: string[];      // Array of subjects (from 'subjects' in MySQL)
  onMessage: () => void;   // Callback function when the "Message" button is clicked
}


/**
 * Type definition for all available pages in the application
 * Used for type-safe navigation throughout the app
 */
type Page = "home" | "login" | "register" | "apply" | "dashboard" | "profile" | "posts" | "aboutus" | "about-member";

/**
 * Main App Component
 * 
 * This is the root component of the LEMN tutoring platform that manages:
 * - User authentication state (logged in/out)
 * - Page navigation and routing
 * - Tutor search and filtering functionality
 * - Communication with backend API
 * - Integration of all sub-components (Navbar, pages, dialogs)
 */
export default function App() {
  // === Authentication State ===
  const { token, email, login, logout, } = useAuth();
  const isLoggedIn = !!token;
  // Tracks whether a user is currently logged in
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Stores the logged-in user's email (used as unique identifier)
  const [userEmail, setUserEmail] = useState("");

  const [loggedInUserDetails, setLoggedInUserDetails] = useState("");

  // === Navigation State ===
  // Controls which page is currently being displayed
  const [currentPage, setCurrentPage] = useState<Page>("home");
  // Tracks which team member is currently being viewed
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // === Search and Filter State ===
  // User's text search query for finding specific tutors or subjects
  const [searchQuery, setSearchQuery] = useState("");
  // Currently selected subject filter (e.g., "Calculus", "Computer Science")
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");

  // === Dialog/Modal State ===
  // Controls visibility of the quick login dialog (not full-page)
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  // Controls visibility of the quick sign-up dialog (not full-page)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  // Stores the tutor that user clicked "Message" on
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  // Controls visibility of the messaging dialog
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  // === Backend Integration State ===
  // Array of tutors fetched from backend (or mock data as fallback)
  const [tutors, setTutors] = useState<Tutor[]>([]);
  // Array of available subjects for the dropdown filter
  const [subjects, setSubjects] = useState<string[]>(["All Subjects"]);
  // Loading indicator for async API calls
  const [isLoading, setIsLoading] = useState(false);
  // Error message from failed API calls (currently not displayed to user)
  const [error, setError] = useState<string | null>(null);


  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if (token) {
  //     // Optional: decode token to get email
  //     // For now, just trust it exists
  //     setIsLoggedIn(true);

  //     // If you stored email separately:
  //     const savedEmail = localStorage.getItem("userEmail");
  //     if (savedEmail) {
  //       setUserEmail(savedEmail);
  //     }
  //   }
  // }, []);

  /**
   * Effect Hook: Load available subjects when app first mounts
   * This populates the subject dropdown filter with all available subjects
   */
  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchTutorsBySubject();
  }, [selectedSubject]);

  useEffect(() => {
  if (isLoggedIn) {
    setCurrentPage("dashboard");
  }
}, [isLoggedIn]);

  const updateSelectedSubjectCode = (str: string) => {
    switch(str) {
      case "All Subjects":
        setSelectedSubjectCode("");
        break;
      case "Mathematics":
        setSelectedSubjectCode("MATH");
        break;
      case "Computer Science":
        setSelectedSubjectCode("CS");
        break;
      case "Physics":
        setSelectedSubjectCode("PHYS");
        break;
      case "Chemistry":
        setSelectedSubjectCode("CHEM");
        break;
      case "Business":
        setSelectedSubjectCode("BUS");
        break;
    }
  }

  const handleSelectedSubjectChange = (value: string) => {

    if(value === "All Subjects") {
      setSelectedSubject("");
    } else {
      setSelectedSubject(value);
    }
  }

  const fetchTutorsBySubject = async () => {

    console.log("calling fetchTutorsBySubject");

    setIsLoading(true);
    setError(null);
    setSearchQuery("");

    // var query = "";

    console.log("query: " + selectedSubject);

    try {
      const response = await fetch("http://3.133.58.251:3010/api/search/tutorBySubject?q=" + selectedSubject);

      if(!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // parse response to JSON
      const data = await response.json();

      setTutors(data);

      console.log(data)


    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch tutors";
      setError(errorMessage);
      console.error("Failed to fetch tutors:", err);

      // Fallback to mock data if backend is not available
      //toast.error("Using sample data - backend not connected");
      
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Effect Hook: Fetch tutors whenever search criteria changes
   * Triggers a new search when user types in search box or changes subject filter
   * Dependencies: searchQuery, selectedSubject
   */

  const fetchSubjects = async () => {

    console.log("fetching subjects");
    try {
      const response = await fetch("http://3.133.58.251:3010/api/subjects");

      if(!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // parse response to JSON
      const data = await response.json();

      const subjectNames: string[] = data.map((subject: any) => subject.Subject_name);


      setSubjects(["All Subjects", ...subjectNames]);


    } catch (err) {
      console.error("Failed to fetch subjects:", err);
      // Fallback to default subjects if backend is not available
      setSubjects([
        "All Subjects",
        "Calculus",
        "Linear Algebra",
        "Statistics",
        "Computer Science",
        "Python",
        "Java",
        "Biology",
        "Chemistry",
        "Anatomy",
        "Economics",
        "Finance",
        "Accounting",
        "English",
        "Literature",
        "Writing",
        "Physics",
        "Engineering",
        "Mathematics",
      ]);
    }
  };

  /**
   * Fetches all available subjects from the backend API
   * Falls back to a hardcoded list if backend is unavailable
   * This ensures the app works even without backend connection
   */


  /**
   * Fetches tutors based on current search query and subject filter
   * Shows loading state during fetch and falls back to mock data if backend fails
   * This allows the app to function with or without a live backend
   */

  useEffect(() => {
    fetchTutors();
  }, []);


  useEffect(() => {
    fetchTutors();
  }, [searchQuery]);


  const fetchTutors = async () => {
    setIsLoading(true);
    setError(null);
    console.log("calling fetch tutors");

    try {

      var response;
      if(selectedSubjectCode !== "" && searchQuery !== "") {
        response = await fetch("http://3.133.58.251:3010/api/search/tutors?q=" + searchQuery);
      } else if(selectedSubjectCode === "" && searchQuery !== "") {
        response = await fetch("http://3.133.58.251:3010/api/search/tutors?q=" + searchQuery);
      } else if(selectedSubjectCode !== "") {
        response = await fetch("http://3.133.58.251:3010/api/search/tutorBySubject?q=" + selectedSubject);
        console.log("selectedSubjectCode: " + selectedSubjectCode + ", searchQuery: " + searchQuery); 
      }
      else {
        response = await fetch("http://3.133.58.251:3010/api/search/tutors?q=" + searchQuery);
      }


      if(!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // parse response to JSON
      const data = await response.json();

      setTutors(data);

      console.log(data)


    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch tutors";
      setError(errorMessage);
      console.error("Failed to fetch tutors:", err);

      // Fallback to mock data if backend is not available
      //toast.error("Using sample data - backend not connected");
      
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles successful user login
   * Updates authentication state and redirects to home page
   * Shows success notification to user
   * 
   * @param email - The email address of the logged-in user
   * @param token - JWT token acquired on login
   */
  const handleLogin = async (email: string, token: string) => {
    login(token, email);

    // setIsLoggedIn(true);
    //setUserEmail(email);
    setCurrentPage("dashboard");

    try {
      const response = await fetch("http://3.133.58.251:3010/api/users?q=" + email);

      if(!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // parse response to JSON
      const data = await response.json();

      // const subjectNames: string[] = data.map((subject: any) => subject.Subject_name);

      setLoggedInUserDetails(data[0]);

      //console.log(loggedInUserId, typeof loggedInUserId);


      // setSubjects(["All Subjects", ...subjectNames]);


    } catch (err) {

    }
  };


  /**
   * Handles successful user registration
   * Automatically logs in the new user and redirects to home
   * 
   * @param email - The email address of the newly registered user
   */
  const handleSignUp = (email: string, token: string) => {
    login(token, email);
    setCurrentPage("home");
  };

  /**
   * Handles user logout
   * Clears authentication state and redirects to home page
   * Shows logout confirmation to user
   */
  const handleLogout = () => {
    logout();
    setCurrentPage("home");
  };

  /**
   * Opens the full-page login screen
   * Used by navbar when user clicks "Login" button
   */
  const openLoginDialog = () => {
    setCurrentPage("login");
  };

  /**
   * Opens the full-page registration screen
   * Used by navbar when user clicks "Sign Up" button
   */
  const openSignUpDialog = () => {
    setCurrentPage("register");
  };

  /**
   * Handles when a user clicks "Message" button on a tutor card
   * If not logged in: redirects to login page with error message
   * If logged in: opens the message dialog for that specific tutor
   * 
   * @param tutor - The tutor object that user wants to message
   */
  const handleMessageTutor = (tutor: Tutor) => {
    if (!isLoggedIn) {
      // Protect messaging feature - only logged-in users can message tutors
      setCurrentPage("login");
      return;
    }
    // Store selected tutor and show message dialog
    setSelectedTutor(tutor);
    setShowMessageDialog(true);
  };

  /**
   * Handles tutor application submission
   * Requires user to be logged in before applying
   * Shows success message and redirects to home
   * 
   * @param subject - The subject the user wants to tutor
   * @param course - The specific course code
   */
  const handleTutorApplication = (subject: string, course: string) => {
    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage("home");
  };

  /**
   * Handles navigation to the Dashboard page
   * Implements authentication guard - redirects to login if not authenticated
   */
  const handleDashboardAccess = () => {
    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage("dashboard");
  };

  /**
   * Handles navigation to the Tutor Application page
   * Implements authentication guard - only logged-in users can apply
   */
  const handleApplyAccess = () => {
    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage("apply");
  };

  /**
   * Handles navigation to the Profile page
   * Implements authentication guard - only logged-in users have profiles
   */
  const handleProfileAccess = () => {
    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage("profile");
  };

  /**
   * Handles navigation to the Posts/Announcements page
   * Implements authentication guard - only logged-in users can view posts
   */
  const handlePostsAccess = () => {
    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage("posts");
  };

  // === CONDITIONAL RENDERING BASED ON CURRENT PAGE ===
  // The following section renders different full-page components based on currentPage state
  // This implements a simple client-side routing system without React Router

  // Render full-page login screen
  if (currentPage === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentPage("register")}
        onBackToHome={() => setCurrentPage("home")}
        onNavigate={(page) => setCurrentPage(page as Page)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // Render full-page registration screen
  if (currentPage === "register") {
    return (
      <RegisterPage
        onRegister={handleSignUp}
        onSwitchToLogin={() => setCurrentPage("login")}
        onBackToHome={() => setCurrentPage("home")}
        onNavigate={(page) => setCurrentPage(page as Page)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // Render tutor application form page
  if (currentPage === "apply") {
    return (
      <TutorApplicationPage
        onApply={handleTutorApplication}
        onNavigate={(page) => setCurrentPage(page as Page)}
        isLoggedIn={isLoggedIn}
        userEmail={email}
        onLogout={handleLogout}
        //userEmail={userEmail}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // Render user dashboard (posts, messages, profile management)
  if (currentPage === "dashboard") {
    return (
      <DashboardPage
        onNavigate={(page) => setCurrentPage(page as Page)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userEmail={email}
        loggedInUserDetails={loggedInUserDetails}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        tutors={tutors}
        isLoading={isLoading}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // Render user profile page
  if (currentPage === "profile") {
    return (
      <ProfilePage
        onNavigate={(page) => setCurrentPage(page as Page)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userEmail={email}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // Render posts/announcements page (Canvas-style discussion board)
  if (currentPage === "posts") {
    return (
      <PostingPage
        onNavigate={(page) => setCurrentPage(page as Page)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userEmail={email}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // Render About Us page (Team Grid)
  if (currentPage === "aboutus") {
    return (
      <AboutUsPage
        onNavigate={(page) => setCurrentPage(page as Page)}
        onSelectMember={(memberId) => {
          setSelectedMemberId(memberId);
          setCurrentPage("about-member");
        }}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // Render individual About Member page
  if (currentPage === "about-member" && selectedMemberId) {
    return (
      <AboutMemberPage
        memberId={selectedMemberId}
        onBack={() => setCurrentPage("aboutus")}
        onNavigate={(page) => setCurrentPage(page as Page)}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />
    );
  }

  // === RENDER HOME PAGE (DEFAULT) ===
  // This is the main landing page showing tutor search and listings
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation bar - appears on all pages */}
      <Navbar
        isLoggedIn={isLoggedIn}
        userEmail={email}
        onLogin={openLoginDialog}
        onSignUp={openSignUpDialog}
        onLogout={handleLogout}
        onApply={handleApplyAccess}
        onSearch={() => setCurrentPage("home")}
        onHome={() => setCurrentPage("home")}
        onDashboard={handleDashboardAccess}
        onProfile={handleProfileAccess}
        onPosts={handlePostsAccess}
        onTeam={() => setCurrentPage("aboutus")}
        showSearchBar={true}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={setSearchQuery}
        onSubjectChange={(e) => {
          handleSelectedSubjectChange(e);
        }}
      />

      {/* Legacy login dialog - kept for backward compatibility */}
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLogin={handleLogin}
        onSwitchToSignUp={() => {
          setShowLoginDialog(false);
          setShowSignUpDialog(true);
        }}
      />

      {/* Legacy sign-up dialog - kept for backward compatibility */}
      <SignUpDialog
        open={showSignUpDialog}
        onOpenChange={setShowSignUpDialog}
        onSignUp={handleSignUp}
        onSwitchToLogin={() => {
          setShowSignUpDialog(false);
          setShowLoginDialog(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section - Main heading */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Find Your Perfect Tutor at SFSU</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced peer tutors across all subjects. Get personalized help and excel in
            your classes.
          </p>
        </div>

        {/* Search Results Count - Shows how many tutors match current filters */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {isLoading ? "Searching..." : `${tutors.length} items found`}
          </p>
        </div>

        {/* Loading State - Shows spinner while fetching tutors from server */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Success State - Grid of tutor cards when data is loaded */}
        {!isLoading && tutors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <TutorCard
                id={tutor.id}
                name={tutor.name}
                image={tutor.image}
                sessionsCompleted={tutor.sessionsCompleted}
                subjects={tutor.subjects}
                isLoggedIn={isLoggedIn}
                onMessage={tutor.onMessage}
              />
            ))}
          </div>
        )}

        {/* Empty State - Shown when no tutors match search criteria */}
        {tutors.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tutors found matching your search criteria.</p>
            {/* Clear filters button to reset search */}
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("All Subjects");
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </main>

      {/* Footer - Shows course identification "CSC 648 SEC 03 Fall 2025 Team 06" */}
      <Footer />

      {/* Message Dialog - Modal for messaging a selected tutor */}
      {/* Only renders when a tutor is selected and dialog is open */}
      {selectedTutor && (
        <MessageDialog
          open={showMessageDialog}
          onOpenChange={setShowMessageDialog}
          tutorName={selectedTutor.name}
          tutorImage={selectedTutor.image}
          tutorSubjects={selectedTutor.subjects}
          
          onSendMessage={() => {
            toast.success("Message sent successfully!");
          }}
        />
      )}
    </div>
  );
}