import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Upload } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TutorApplicationPageProps {
  onApply: (course: string, resume: File) => void;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  // Search props
  searchQuery?: string;
  selectedSubject?: string;
  subjects?: string[];
  onSearchQueryChange?: (query: string) => void;
  onSubjectChange?: (subject: string) => void;
}

export function TutorApplicationPage({
  onApply,
  onNavigate,
  isLoggedIn,
  onLogout,
  searchQuery,
  selectedSubject,
  subjects,
  onSearchQueryChange,
  onSubjectChange,
}: TutorApplicationPageProps) {
  const [availability, setAvailability] = useState("");
  const [subject, setSubject] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Ensure that all required fields are filled
  if (!course || !resume) {
    return;
  }

  console.log("hi");

  setIsSubmitting(true); // Disable button during submission

  try {
    // Get the Authorization token from local storage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication failed. Please log in.");
    }

    // Create a FormData instance to handle form data (text fields + file upload)
    const formData = new FormData();

    formData.append("courseTitle", courseTitle);
    
    // Append text data to FormData
    formData.append("course", course);

    formData.append("department", subject);
    
    // Append the resume file to FormData
    formData.append("cv", resume);


    try {
      // Send POST request with fetch using FormData
      const response = await fetch("http://3.133.58.251:3010/api/apply", {
        method: "POST",
        headers: {
          'Authorization': token
        },
        body: formData, // Send FormData (including file)
      });

      console.log(response);

      // Check if the response is not OK
      if (!response.ok) {
        const errorText = await response.text(); // Read the error message from the response
        console.error("Failed to submit application:", errorText);
        return;
      }

      const result = await response.json();
      console.log("Application result:", result);

      // Optionally, reset the form
      setSubject("");
      setCourse("");
      setCourseTitle("");
      setAvailability("");
      setFirstName("");
      setLastName("");
      setResume(null);
      setFileName("");
    } catch (error: any) {
      console.error("Failed to submit tutor application:", error);
    } finally {
      setIsSubmitting(false); // Enable button after submission
    }
  } catch (err: any) {
    console.error("Failed to handle form submission:", err);
    setIsSubmitting(false); // Enable button in case of error
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={() => onNavigate("login")}
        onSignUp={() => onNavigate("register")}
        onLogout={onLogout}
        onApply={() => onNavigate("apply")}
        onSearch={() => onNavigate("home")}
        onHome={() => onNavigate("home")}
        onDashboard={() => onNavigate("dashboard")}
        onProfile={() => onNavigate("profile")}
        onPosts={() => onNavigate("posts")}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={onSearchQueryChange}
        onSubjectChange={onSubjectChange}
      />

      {/* Application Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="bg-card rounded-2xl shadow-xl p-8 border">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-primary to-primary/80 p-3 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="mb-2">Become a Tutor</h1>
              <p className="text-muted-foreground">Share your knowledge and help others succeed</p>
              
              {/* Review Timeline Notice */}
              <div className="mt-4 bg-secondary border border-border rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">
                    Applications will be reviewed within 24-48 hours. We'll get back to you soon!
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              

              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="course">
                  First Name
                </Label>
                <Input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-input-background border-2 focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="course">
                  Last Name
                </Label>
                <Input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="Enter your first name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-input-background border-2 focus:border-primary transition-colors"
                  required
                />
              </div>


              {/* Course */}
              <div className="space-y-2">
                <Label htmlFor="course">
                  Course Title *
                </Label>
                <Input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="e.g., Software Engineering, Operating Systems"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="bg-input-background border-2 focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Course */}
              <div className="space-y-2">
                <Label htmlFor="course">
                  Course *
                </Label>
                <Input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="e.g., CSC 648, MATH 226"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="bg-input-background border-2 focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Upload CV/Resume */}
              <div className="space-y-2">
                <Label htmlFor="resume">
                  Upload CV/Resume *
                </Label>
                <div className="relative">
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />

                  {/* Subject Dropdown */}
                <Select value={subject} onValueChange={setSubject}>
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
                    {/* <DropdownMenuSeparator /> */}
                  </SelectContent>
                </Select>


                      <br />
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-input-background border-2 rounded-md cursor-pointer hover:bg-secondary transition-colors"
                  >
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {fileName || "Choose file (PDF, DOC, DOCX)"}
                    </span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting} // Disable button during submission
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
