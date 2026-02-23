/**
 * MessagingPage.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A real-time messaging interface for users to communicate with tutors and other students
 * on the LEMN platform. This page features a two-column layout with a contact list on the
 * left showing all available conversations, and a chat interface on the right for the
 * selected conversation. Users can send and receive messages, see message timestamps, and
 * switch between different conversations. The interface updates the "Active now" status
 * dynamically and displays message history in a clean, modern chat UI.
 */

import { useState } from "react";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface MessagingPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userEmail?: string;
  selectedTutor?: {
    name: string;
    subject: string;
    bio: string;
    image: string;
  };
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  image: string;
  lastMessage?: string;
}

const demoUsers: User[] = [
  {
    id: "1",
    name: "Mark Johnson",
    image: "https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?w=200",
    lastMessage: "Hi! I can help with that..."
  },
  {
    id: "2",
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1633381182794-01b10764b431?w=200",
    lastMessage: "See you at the session!"
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
    lastMessage: "Thanks for reaching out"
  },
  {
    id: "4",
    name: "Emily Watson",
    image: "https://images.unsplash.com/photo-1620663823969-631e014e5e97?w=200",
    lastMessage: "I'm available tomorrow"
  },
  {
    id: "5",
    name: "David Kim",
    image: "https://images.unsplash.com/photo-1624918479892-3e5df2910410?w=200",
    lastMessage: "Great question!"
  },
  {
    id: "6",
    name: "Jessica Lee",
    image: "https://images.unsplash.com/photo-1718179804654-7c3720b78e67?w=200",
    lastMessage: "Let me explain that..."
  },
  {
    id: "7",
    name: "Michael Park",
    image: "https://images.unsplash.com/photo-1729824186570-4d4aede00043?w=200",
    lastMessage: "Perfect! Talk soon"
  },
  {
    id: "8",
    name: "Lisa Anderson",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    lastMessage: "I'll send you the notes"
  },
  {
    id: "9",
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    lastMessage: "Sounds good to me"
  },
  {
    id: "10",
    name: "Rachel Martinez",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    lastMessage: "I can help with this!"
  }
];

export function MessagingPage({ 
  onNavigate, 
  isLoggedIn, 
  onLogout, 
  userEmail,
  selectedTutor 
}: MessagingPageProps) {
  const [selectedUser, setSelectedUser] = useState<User>(demoUsers[0]);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello!",
      sender: "me",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: "2",
      text: "Hello",
      sender: "other",
      timestamp: new Date(Date.now() - 3000000)
    }
  ]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: "me",
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
      />

      {/* Main Content - Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - User List */}
        <div className="w-64 bg-card border-r overflow-y-auto">
          {demoUsers.map((user, index) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 border-b hover:bg-secondary/50 transition-colors text-left ${
                selectedUser.id === user.id ? "bg-primary text-primary-foreground hover:bg-primary" : ""
              } ${index === 0 && selectedUser.id !== user.id ? "bg-secondary text-foreground" : ""}`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  {user.lastMessage && (
                    <p className="text-sm opacity-70 truncate">{user.lastMessage}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Center Panel - Tutor Profile */}
        <div className="w-96 bg-secondary flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Avatar className="h-48 w-48 border-4 border-primary rounded-3xl">
                  <AvatarImage src={selectedUser.image} className="rounded-3xl" />
                  <AvatarFallback className="text-4xl rounded-3xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-4">
              <h2 className="text-xl">{selectedUser.name}</h2>
            </div>

            {/* Subject */}
            <div className="text-center mb-6">
              <h3 className="text-lg">Computer Science</h3>
            </div>

            {/* Bio Card */}
            <div className="bg-card rounded-3xl p-6 mb-6 shadow-md">
              <h3 className="text-center mb-3">Bio</h3>
              <p className="text-sm text-center text-muted-foreground">
                Hi my name is {selectedUser.name.split(' ')[0].toLowerCase()}, 3rd year computer science major.
              </p>
            </div>

            {/* Message Button */}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-3xl h-12"
              onClick={() => {
                // Scroll to bottom of messages
                const chatPanel = document.getElementById('chat-panel');
                if (chatPanel) {
                  chatPanel.scrollTop = chatPanel.scrollHeight;
                }
              }}
            >
              Message
            </Button>
          </div>
        </div>

        {/* Right Panel - Messages */}
        <div className="flex-1 bg-muted flex flex-col">
          {/* Chat Header */}
          <div className="bg-card border-b p-4 flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary rounded-3xl">
              <AvatarImage src={selectedUser.image} className="rounded-3xl" />
              <AvatarFallback className="rounded-3xl">
                {selectedUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3>{selectedUser.name}</h3>
            </div>
          </div>

          {/* Messages */}
          <div id="chat-panel" className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-6 py-3 ${
                    message.sender === "me"
                      ? "bg-primary text-primary-foreground rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl"
                      : "bg-secondary text-foreground rounded-tl-3xl rounded-tr-3xl rounded-br-3xl"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-card border-t p-6">
            <div className="flex items-center gap-3 border-2 border-primary rounded-lg p-3">
              <Input
                type="text"
                placeholder="Message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}