/**
 * DashboardPage.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * The user dashboard page that serves as a central hub for logged-in users to manage their
 * activity on the LEMN platform. This page features a section selector for Overview, Tutors,
 * and Posts, allowing users to view and manage their tutor profiles and posts/announcements.
 * Users can create, edit, and delete their posts, view their posted content, and access
 * messaging features. The dashboard provides a comprehensive interface for both tutors and
 * students to manage their presence on the platform.
 */

import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
import { MessageCircle, Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { MessageDialog } from "./MessageDialog";

import { TutorCard } from "./TutorCard";


interface DashboardPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userEmail: string | null;
  loggedInUserDetails: string;
  // Search props
  searchQuery?: string;
  selectedSubject?: string;
  messages?: Message[];
  subjects?: string[];
  tutors: Tutor[],
  isLoading: boolean,
  onSearchQueryChange?: (query: string) => void;
  onSubjectChange?: (subject: string) => void;
}

interface Tutor {
  id: string;  // Unique identifier for the tutor (corresponds to 'id' in MySQL)
  name: string;      // First name (extracted from 'name' in MySQL)
  image?: string;          // Profile image (optional)
  sessionsCompleted: number; // Number of sessions completed (from MySQL)
  subjects: string[];      // Array of subjects (from 'subjects' in MySQL)
  onMessage: () => void;   // Callback function when the "Message" button is clicked
}

interface DashboardTutor {
  id: string;
  name: string;
  image: string;
  subject: string;
  bio: string;
  rating: number;
  sessionsCompleted: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  course: string;
  timestamp: Date;
  authorEmail: string;
  status: "pending" | "posted";
}

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  enrolled: number;
  capacity: number;
  color: string;
}

interface Message {
  Message_id: number;
  First_name: string;
  Message: string;
  Created_at: string;   // or Date
}



export function DashboardPage({ 
  onNavigate, 
  isLoggedIn, 
  onLogout, 
  userEmail,
  loggedInUserDetails,
  searchQuery,
  selectedSubject,
  subjects,
  tutors,
  isLoading,
  onSearchQueryChange,
  onSubjectChange
}: DashboardPageProps) {
  const [activeSection, setActiveSection] = useState<"tutors" | "posts">("tutors");




  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Message dialog state
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<DashboardTutor | null>(null);
  
  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState("CSC 648");

  // sending messages states
  const [receiverID, setReceiverID] = useState<string>("");
  const [receiverName, setReceiverName] = useState<string>("");

  const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

    
// useEffect(() => {
//   if (activeSection === "posts") {
//     handleReceivedMessages();  // Only needs activeSection
//   }
// }, [activeSection]); 

// 2. For Message Dialog (separate concern)
// 

  // useEffect(() => {
  //   const loadMessages = async () => {
  //     await handleDisplayMessages();
  //     setShowMessageDialog(true);
  //   };

  //   if (receiverID) {
  //     loadMessages();
  //   }
  // }, [receiverID]);

  const handleCreatePost = () => {
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPost: Post = {
      id: String(Date.now()),
      title,
      content,
      course,
      timestamp: new Date(),
      authorEmail: userEmail || "",
      status: "pending"
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setCourse("CSC 648");
    setShowCreateDialog(false);
    toast.success("Post created successfully!");
  };


  const handleEditPost = () => {
    if (!title || !content || !selectedPost) {
      toast.error("Please fill in all fields");
      return;
    }

    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, title, content, course }
        : post
    ));

    setTitle("");
    setContent("");
    setCourse("CSC 648");
    setSelectedPost(null);
    setShowEditDialog(false);
    toast.success("Post updated successfully!");
  };

  const handleDeletePost = () => {
    if (!selectedPost) return;

    setPosts(posts.filter(post => post.id !== selectedPost.id));
    setSelectedPost(null);
    setShowDeleteDialog(false);
    toast.success("Post deleted successfully!");
  };

  const openEditDialog = (post: Post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setContent(post.content);
    setCourse(post.course);
    setShowEditDialog(true);
  };

  const handleDisplayMessages = async (id?: string) => {
      console.log("in handleDisplayMessages");
  
      const token = localStorage.getItem("authToken");

      const actualID = id || receiverID;
  
      try {
        const response = await fetch("http://3.133.58.251:3010/api/getMessages/" + localStorage.getItem("userEmail") + "/" + actualID,
          {
            method: "GET",
            headers: {
              "Authorization": token ? `${token}` : "",  // Add the token in the Authorization header
              "Content-Type": "application/json",  // Optional: Set content type if needed
            },
          }
        );
  
        if(!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  

        console.log("i am inside");
        // parse response to JSON
        const data: Message[] = await response.json();
  
        // console.log("Messages received: " + data[0].Message);
  
  
        setMessages(data);
      } catch(err) {
        console.log(err);
      }
  
      // setMessages([...messages, newMessage]);
      setMessageText("");
      toast.success("Message sent!");
      // onSendMessage(messageText);
    };

    const handleReceivedMessages = async() => {
      const token = localStorage.getItem("authToken");
  
      try {
        const response = await fetch("http://3.133.58.251:3010/api/receivedMessages/" + localStorage.getItem("userEmail"),
          {
            method: 'GET',
            headers: {
              "Authorization": token ? `${token}` : "",  // Add the token in the Authorization header
              "Content-Type": "application/json",  // Optional: Set content type if needed
            },
          }
        );
  
        if(!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  

        console.log("i am inside");
        // parse response to JSON
        const data = await response.json();
  
        console.log("Messages received: " + data[0]);
  
  
        setReceivedMessages(data);
      } catch(err) {
        console.log(err);
      }
    }
  

  const openDeleteDialog = (post: Post) => {
    setSelectedPost(post);
    setShowDeleteDialog(true);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar */}
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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-8 text-primary-foreground shadow-lg">
            <h1 className="mb-2">Welcome back{userEmail ? `, ${userEmail.split('@')[0]}` : ''}!</h1>
            <p className="text-purple-100">
              Track your tutoring sessions, view your courses, and connect with tutors.
            </p>
          </div>

          {/* Section Selector */}
          <div className="flex gap-2 bg-card rounded-lg p-1 shadow-sm border border-border">
            <Button
              onClick={() => setActiveSection("tutors")}
              className={`flex-1 ${
                activeSection === "tutors"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-transparent text-foreground hover:bg-secondary"
              }`}
            >
              Tutors
            </Button>
            <Button
              onClick={async () => {
                await handleReceivedMessages();
                setActiveSection("posts");
              }}
              className={`flex-1 ${
                activeSection === "posts"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-transparent text-foreground hover:bg-secondary"
              }`}
            >
              Inbox
            </Button>
          </div>

          {/* Current Tutors */}
          {activeSection === "tutors" && (
            <div>
              <h2 className="mb-4">Current Tutors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* {demoTutors.slice(0, 3).map((tutor) => (
                  <Card key={tutor.id} className="p-6 bg-card shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                        <AvatarImage src={tutor.image} />
                        <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="mb-2">{tutor.name}</h3>
                      <Badge className="mb-2 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {tutor.subject}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tutor.bio}</p>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => {
                          setSelectedTutor(tutor);
                          setShowMessageDialog(true);
                        }}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </Card>
                ))} */}

                 {/* Success State - Grid of tutor cards when data is loaded */}
                  {!isLoading && tutors.length > 0 && (
                    <div> 
                      {tutors.map((tutor) => (
                        <TutorCard
                          id={tutor.id}
                          name={tutor.name}
                          image={tutor.image}
                          sessionsCompleted={tutor.sessionsCompleted}
                          isLoggedIn={isLoggedIn}
                          subjects={tutor.subjects}
                          onMessage={async () => {
                            setReceiverID(tutor.id);
                            setReceiverName(tutor.name);
                            await handleDisplayMessages(tutor.id); // pass ID directly
                            setShowMessageDialog(true);
                          }}
                        />
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {activeSection === "posts" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {receivedMessages.map((receivedMessage) => (
                  <Card key={receivedMessage.Message_id} className="p-6 bg-card shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex flex-col items-start">
                      <h3 className="mb-2">{receivedMessage.First_name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{receivedMessage.Message}</p>
                      <div className="flex items-center flex-wrap gap-2">
                        <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                          {/* {post.course} */}
                        </Badge>
                        {/* <Badge className={`${
                          // post.status === "posted" 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}>
                          {/* {post.status === "posted" ? "Posted" : "Pending"} }
                        </Badge> */}
                        <p className="text-sm text-muted-foreground">{(receivedMessage.Created_at)}</p>
                      </div>
                      <div className="flex items-center mt-4">
                        {/* <Button 
                          className="mr-2 bg-primary hover:bg-primary/90"
                          onClick={() => openEditDialog(post)}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </Button> */}
                        {/* <Button 
                          className="bg-purple-700 hover:bg-purple-800"
                          onClick={() => openDeleteDialog(post)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button> */}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Post Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Your post will be reviewed by an administrator before being published.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course">Course</Label>
              
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90"
              onClick={handleCreatePost}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>
              Update the post details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course">Course</Label>
              
                
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90"
              onClick={handleEditPost}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Post Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90"
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      {showMessageDialog && (


        <MessageDialog
          open={showMessageDialog}
          onOpenChange={setShowMessageDialog}
          receiverID={receiverID}
          receiverName={receiverName}
          messagesToList={messages}
          senderID={localStorage.getItem("userEmail")}
          onSendMessage={async (messageText) => {
            console.log("From message dialog");
            console.log(receiverID, receiverName, messageText);
            const payload = {
              receiverID: receiverID,
              senderID: localStorage.getItem("userEmail"),
              messageText: messageText
            }
            
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch("http://3.133.58.251:3010/api/sendMessage", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": token ? `${token}` : "",
                },
                body: JSON.stringify(payload),
              });

              if (!response.ok) {
                throw new Error("Failed to send message");
              }

              const data = await response.json();
              // Clear recipient email input
              console.log("Response:", data);
            } catch (error) {
              console.error("Error sending message:", error);
            }

            
          }}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}