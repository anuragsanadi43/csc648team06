/**
 * TutorCard.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A reusable card component that displays tutor profile information on the home page.
 * Each card shows a tutor's photo, name, experience level (sessions completed), subjects
 * they teach, and a message button for contacting them. The cards are displayed in a
 * responsive grid layout and provide visual feedback on hover. This component is the
 * primary way students browse and select tutors to connect with.
 */

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MessageSquare } from "lucide-react";

/**
 * Props interface for the TutorCard component
 * Contains all information needed to display a tutor's profile card
 */
interface TutorCardProps {
  id: string;
  name: string;
  image?: string;
  sessionsCompleted: number;
  isLoggedIn: boolean;
  subjects: string[]; // Array of subjects
  onMessage: () => void;
}

/**
 * TutorCard Component
 * 
 * Displays a tutor's profile information in a card format on the home page.
 * Each card shows the tutor's photo, name, experience level, subjects, and a message button.
 * 
 * Layout:
 * - Top: Profile image in 4:3 aspect ratio
 * - Middle: Name and session count
 * - Bottom: Subject badges and message button
 * 
 * The card has hover effects (shadow) to improve user interaction feedback.
 */
export function TutorCard({
  id,
  name,
  image,
  sessionsCompleted,
  isLoggedIn,
  subjects,
  onMessage
}: TutorCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
      
      {/* Card Content Area */}
      <div className="p-4 space-y-3 text-center">
        {/* Tutor Name and Experience */}
        <div>
          <h3 className="mb-1">{name}</h3>
          {/* Sessions completed shows tutor's experience level to students */}
          <p className="text-sm text-muted-foreground">Tutor Entry ID: {id}</p>
          <p className="text-sm text-muted-foreground">Sessions Completed: {sessionsCompleted}</p>

          {/* Render subjects as a list */}
          <div className="mt-2">
            <h4 className="text-sm font-medium text-muted-foreground">Subjects:</h4>
            <ul className="list-disc pl-5">
              {subjects.map((subject, index) => (
                <li key={index} className="text-sm">{subject}</li>
              ))}
            </ul>
          </div>
          
          {/* Optional Image */}
          {image && <img src={image} alt={`${name}`} className="w-16 h-16 rounded-full mx-auto mt-4" />}
        </div>
        
        {/* Message button - click to send a message to this tutor */}
        {isLoggedIn && (
          
        <Button 
          onClick={onMessage}
          className="w-full bg-primary hover:bg-primary/90" // Full width for mobile-friendly tap target
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
        )}
      </div>
    </div>
  );
}