import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Plus, Filter, BookOpen, X, Pin, MoreVertical, ThumbsUp, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

/**
 * PostingPage.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A Canvas-style discussion board and announcements page for course-related posts and
 * communication. This page mimics the familiar Canvas LMS announcement system where
 * instructors can post important updates and students can create discussion threads.
 * Features include creating posts, viewing posts sorted by pinned status, adding comments/
 * replies, liking posts and comments, filtering by course, and distinguishing between
 * Tutor and Student roles with visual badges. Pinned posts appear at the top for
 * important announcements. The interface promotes academic collaboration and communication.
 */

/**
 * Props interface for the PostingPage component
 */
interface PostingPageProps {
  onNavigate: (page: string) => void;  // Callback for page navigation
  isLoggedIn: boolean;                 // Whether user is authenticated
  onLogout: () => void;                // Callback to log user out
  userEmail?: string;                  // Email of logged-in user
  // Search props
  searchQuery?: string;
  selectedSubject?: string;
  subjects?: string[];
  onSearchQueryChange?: (query: string) => void;
  onSubjectChange?: (subject: string) => void;
}

/**
 * Interface representing a comment on a post
 * Comments are replies/discussions under a main post
 */
interface Comment {
  id: string;            // Unique identifier for the comment
  author: string;        // Name of comment author
  authorEmail: string;   // Email of comment author
  content: string;       // Text content of the comment
  timestamp: Date;       // When comment was created
  likes: number;         // Number of likes on the comment
}

/**
 * Interface representing a post/announcement
 * Posts are the main content items in the discussion board
 */
interface Post {
  id: string;                       // Unique identifier for the post
  title: string;                    // Post headline/title
  content: string;                  // Main text content of the post
  author: string;                   // Name of post author
  authorEmail: string;              // Email of post author
  authorRole: "Tutor" | "Student";  // Role badge (Tutor posts stand out visually)
  timestamp: Date;                  // When post was created
  isPinned: boolean;                // Pinned posts appear at top (important announcements)
  likes: number;                    // Number of likes on the post
  comments: Comment[];              // Array of comments/replies
  course?: string;                  // Optional: Which course this post belongs to
  status: "pending" | "posted";     // Post status
}

/**
 * Demo/Mock Posts Data
 * 
 * Pre-populated posts to demonstrate the Canvas-style discussion board.
 * In production, these would be fetched from backend API.
 * Includes various post types: welcome messages, deadline updates, study groups, questions
 */
const demoPosts: Post[] = [
  {
    id: "1",
    title: "Welcome to CSC 648 - Software Engineering!",
    content: "Welcome everyone! This semester we'll be working on exciting team projects. Please review the syllabus and reach out if you have any questions. Looking forward to a great semester!",
    author: "Prof. Johnson",
    authorEmail: "prof.johnson@sfsu.edu",
    authorRole: "Tutor",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isPinned: true,
    likes: 24,
    comments: [
      {
        id: "c1",
        author: "Sarah M.",
        authorEmail: "sarah.m@sfsu.edu",
        content: "Excited for this class!",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        likes: 5
      }
    ],
    course: "CSC 648",
    status: "posted"
  },
  {
    id: "2",
    title: "Project Milestone 1 Due Date Extended",
    content: "Due to the feedback I've received, I'm extending the Milestone 1 deadline to Friday, Nov 22nd at 11:59 PM. Make sure to submit via Canvas and include all required documentation.",
    author: "Prof. Johnson",
    authorEmail: "prof.johnson@sfsu.edu",
    authorRole: "Tutor",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isPinned: true,
    likes: 42,
    comments: [
      {
        id: "c2",
        author: "John D.",
        authorEmail: "john.d@sfsu.edu",
        content: "Thank you! This really helps.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        likes: 8
      },
      {
        id: "c3",
        author: "Emily R.",
        authorEmail: "emily.r@sfsu.edu",
        content: "Appreciate the extension!",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        likes: 3
      }
    ],
    course: "CSC 648",
    status: "posted"
  },
  {
    id: "3",
    title: "Study Group for Midterm - Join Us!",
    content: "Hey everyone! We're organizing a study group this Thursday at 6 PM in the library (2nd floor). We'll be going over chapters 1-5 and working through practice problems. Everyone is welcome!",
    author: "Alex K.",
    authorEmail: "alex.k@sfsu.edu",
    authorRole: "Student",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isPinned: false,
    likes: 15,
    comments: [
      {
        id: "c4",
        author: "Michael L.",
        authorEmail: "michael.l@sfsu.edu",
        content: "I'll be there! Can we also review the UML diagrams?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        likes: 2
      }
    ],
    course: "CSC 648",
    status: "posted"
  },
  {
    id: "4",
    title: "Office Hours Update - New Time Slot Added",
    content: "I've added an additional office hours slot on Wednesdays from 3-4 PM due to popular demand. You can book appointments through the department calendar or just drop by my office (TH 934).",
    author: "Prof. Johnson",
    authorEmail: "prof.johnson@sfsu.edu",
    authorRole: "Tutor",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isPinned: false,
    likes: 18,
    comments: [],
    course: "CSC 648",
    status: "posted"
  },
  {
    id: "5",
    title: "Looking for Team Members - Backend Developers Needed",
    content: "Our team is looking for 1-2 more members who are strong in backend development (Node.js/Express). We're building a social platform for campus events. DM me if interested!",
    author: "Jessica L.",
    authorEmail: "jessica.l@sfsu.edu",
    authorRole: "Student",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    isPinned: false,
    likes: 7,
    comments: [
      {
        id: "c5",
        author: "David K.",
        authorEmail: "david.k@sfsu.edu",
        content: "I'm interested! I have experience with Node.js and MongoDB.",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        likes: 1
      }
    ],
    course: "CSC 648",
    status: "posted"
  },
  {
    id: "6",
    title: "Recommended Reading: Clean Code by Robert Martin",
    content: "For those interested in improving your coding practices, I highly recommend 'Clean Code' by Robert Martin. It's an excellent resource that will help you throughout your career. Available in the library.",
    author: "TA - Marcus Chen",
    authorEmail: "ta.chen@sfsu.edu",
    authorRole: "Tutor",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isPinned: false,
    likes: 21,
    comments: [],
    course: "CSC 648",
    status: "posted"
  },
  {
    id: "7",
    title: "Question about Git Workflow",
    content: "Can someone explain the difference between git merge and git rebase? I'm getting confused about when to use each one in our team project. Any help would be appreciated!",
    author: "Sarah M.",
    authorEmail: "sarah.m@sfsu.edu",
    authorRole: "Student",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isPinned: false,
    likes: 9,
    comments: [
      {
        id: "c6",
        author: "TA - Marcus Chen",
        authorEmail: "ta.chen@sfsu.edu",
        content: "Great question! Merge preserves history, while rebase rewrites it for a cleaner timeline. For team projects, I recommend sticking with merge to avoid conflicts.",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 12
      },
      {
        id: "c7",
        author: "Alex K.",
        authorEmail: "alex.k@sfsu.edu",
        content: "Here's a good article that helped me understand: https://www.atlassian.com/git/tutorials/merging-vs-rebasing",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 4
      }
    ],
    course: "CSC 648",
    status: "posted"
  }
];

export function PostingPage({ 
  onNavigate, 
  isLoggedIn, 
  onLogout, 
  userEmail,
  searchQuery,
  selectedSubject,
  subjects,
  onSearchQueryChange,
  onSubjectChange
}: PostingPageProps) {
  // === Component State ===
  // Array of all posts (loaded from demoPosts, would be from API in production)
  const [posts, setPosts] = useState<Post[]>(demoPosts);
  // Controls visibility of the "Create New Post" form
  const [showCreateForm, setShowCreateForm] = useState(false);
  // ID of currently selected post (for viewing/adding comments)
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  // Text input for new comment being typed
  const [commentText, setCommentText] = useState("");
  // Current course filter selection
  const [filterCourse, setFilterCourse] = useState("All Courses");

  // === Form States for Creating New Posts ===
  const [title, setTitle] = useState("");     // Post title
  const [content, setContent] = useState(""); // Post body text
  const [course, setCourse] = useState("CSC 648"); // Course assignment

  /**
   * Handles creating a new post/announcement
   * Validates input, creates post object, adds to posts array, and resets form
   */
  const handleCreatePost = () => {
    // Validation: Ensure required fields are filled
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    // Create new post object
    const newPost: Post = {
      id: String(posts.length + 1),                        // Simple ID generation (use UUID in production)
      title,
      content,
      author: userEmail?.split('@')[0] || "Anonymous",     // Extract name from email
      authorEmail: userEmail || "",
      authorRole: "Student",                                // New posts default to Student role
      timestamp: new Date(),                                // Current time
      isPinned: false,                                      // New posts not pinned by default
      likes: 0,                                             // Start with no likes
      comments: [],                                         // Start with no comments
      course,
      status: "pending"                                     // All new posts are pending review
    };

    // Add new post to beginning of array (most recent first)
    setPosts([newPost, ...posts]);
    
    // Reset form fields
    setTitle("");
    setContent("");
    setCourse("CSC 648");
    setShowCreateForm(false);

    toast.success("Post submitted for review!");
  };

  /**
   * Adds a new comment to a specific post
   * 
   * @param postId - The ID of the post to add comment to
   */
  const handleAddComment = (postId: string) => {
    // Validation: Don't allow empty comments
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    // Update the specific post with the new comment
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c${Date.now()}`,                            // Generate unique comment ID
              author: userEmail?.split('@')[0] || "Anonymous", // Extract name from email
              authorEmail: userEmail || "",
              content: commentText,
              timestamp: new Date(),
              likes: 0
            }
          ]
        };
      }
      return post;
    }));

    // Clear comment input field
    setCommentText("");
    toast.success("Comment added!");
  };

  /**
   * Increments the like count for a specific post
   * 
   * @param postId - The ID of the post to like
   */
  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  /**
   * Converts a Date object to a human-readable "time ago" string
   * Examples: "just now", "5 minutes ago", "2 hours ago", "3 days ago"
   * 
   * @param date - The timestamp to convert
   * @returns Human-readable time difference string
   */
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    // Less than a minute
    if (seconds < 60) return "just now";
    // Less than an hour
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    // Less than a day
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    // Less than a week
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    // Older than a week, show actual date
    return date.toLocaleDateString();
  };

  /**
   * Returns the text color class for different user roles
   * Tutors get blue color to stand out, Students get default gray
   * 
   * @param role - The user role (Tutor or Student)
   * @returns Tailwind text color class
   */
  const getRoleColor = (role: "Tutor" | "Student") => {
    switch (role) {
      case "Tutor":
        return "text-gray-900";  // Dark gray for instructors/tutors
      default:
        return "text-gray-600";  // Gray for students
    }
  };

  /**
   * Returns a badge/emoji for the user role
   * Only Tutors get a badge to indicate their authority
   * 
   * @param role - The user role (Tutor or Student)
   * @returns Badge text or empty string
   */
  const getRoleBadge = (role: "Tutor" | "Student") => {
    if (role === "Tutor") return "👨‍🏫 Tutor";
    return "";  // Students don't get a badge
  };

  /**
   * Sorts posts with pinned posts first, then by most recent
   * This ensures important announcements always appear at the top
   */
  const sortedPosts = [...posts].sort((a, b) => {
    // Pinned posts always come first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // Within same pinned status, sort by newest first
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  /**
   * Filters posts by selected course
   * "All Courses" shows everything, otherwise filter by exact course match
   */
  const filteredPosts = filterCourse === "All Courses" 
    ? sortedPosts 
    : sortedPosts.filter(post => post.course === filterCourse);

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
        onProfile={() => onNavigate("profile")}
        onPosts={() => onNavigate("posts")}
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onSearchQueryChange={onSearchQueryChange}
        onSubjectChange={onSubjectChange}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-1">Announcements</h1>
              <p className="text-muted-foreground">Course updates, discussions, and announcements</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {/* Course Filter */}
          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Courses">All Courses</SelectItem>
              <SelectItem value="CSC 648">CSC 648</SelectItem>
              <SelectItem value="MATH 226">MATH 226</SelectItem>
              <SelectItem value="PHYS 220">PHYS 220</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Create Post Form */}
        {showCreateForm && (
          <Card className="p-6 mb-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2>Create New Announcement</h2>
                <p className="text-sm text-muted-foreground mt-1">Your post will be reviewed by an administrator before being published.</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-course">Course</Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger id="post-course">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSC 648">CSC 648 - Software Engineering</SelectItem>
                    <SelectItem value="MATH 226">MATH 226 - Calculus II</SelectItem>
                    <SelectItem value="PHYS 220">PHYS 220 - General Physics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your announcement here..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCreatePost}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Post Announcement
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-500">No announcements yet.</p>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={
                        post.authorRole === "Tutor" ? "bg-gray-200 text-gray-900" :
                        "bg-gray-100 text-gray-700"
                      }>
                        {post.author.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={getRoleColor(post.authorRole)}>{post.author}</span>
                            {post.authorRole !== "Student" && (
                              <span className="text-xs text-gray-500">{getRoleBadge(post.authorRole)}</span>
                            )}
                            {post.isPinned && (
                              <Pin className="h-4 w-4 text-gray-900" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{getTimeAgo(post.timestamp)}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Post Title and Content */}
                      <h3 className="mb-2 mt-3">{post.title}</h3>
                      <p className="text-gray-700 whitespace-pre-wrap mb-4">{post.content}</p>

                      {/* Status Badge */}
                      <div className="mb-3">
                        <Badge className={`${
                          post.status === "posted" 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        }`}>
                          {post.status === "posted" ? "Posted" : "Pending"}
                        </Badge>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikePost(post.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.likes > 0 && <span>{post.likes}</span>}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments.length > 0 && <span>{post.comments.length}</span>}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {selectedPost === post.id && (
                  <>
                    <Separator />
                    <div className="p-6 pt-4 bg-gray-50">
                      {/* Existing Comments */}
                      {post.comments.length > 0 && (
                        <div className="space-y-4 mb-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                                  {comment.author.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-white rounded-lg p-3 shadow-sm">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
                                  </div>
                                  <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                                {comment.likes > 0 && (
                                  <button className="text-xs text-gray-500 mt-1 ml-2">
                                    👍 {comment.likes}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment */}
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                            {userEmail ? userEmail.substring(0, 2).toUpperCase() : "ME"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleAddComment(post.id);
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}