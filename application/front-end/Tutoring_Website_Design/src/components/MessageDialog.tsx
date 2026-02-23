/**
 * MessageDialog.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A modal dialog component for real-time messaging between students and tutors. This dialog
 * appears when a student clicks the "Message" button on a tutor's profile card. It displays
 * the tutor's information at the top and provides a chat interface for sending and receiving
 * messages. The dialog includes a message history view with timestamps, sender identification,
 * and a text input with send button. Messages are displayed in a conversational format with
 * different styling for sent vs received messages.
 */

import { useState } from "react";
import { Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { v4 as uuidv4 } from 'uuid';

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiverID: string;
  receiverName: string;
  messagesToList:Message[];
  senderID: string | null;
  onSendMessage: (messageText: string) => void;
}

interface Message {
  Message_id: number;
  First_name: string;
  Message: string;
  Created_at: string;   // or Date
}

export function MessageDialog({
  open,
  onOpenChange,
  receiverID,
  receiverName,
  senderID,
  messagesToList,
  onSendMessage,
}: MessageDialogProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(messagesToList);

  // console.log(receiverID, receiverName, senderID);

  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // handleDisplayMessages();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col p-0">
        {/* Header */}
        {/* <DialogHeader className="px-6 pt-6 pb-4 border-b"> */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">

            </Avatar>
            { <div className="flex-1">
              <DialogTitle></DialogTitle>
              <DialogDescription className="text-sm">
                {}
              </DialogDescription>
            </div>}
          </div>
        {/* </DialogHeader> */}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.Message_id}
              className={`flex ${
                message.First_name === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                  message.First_name === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <p className="text-sm">{message.Message}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.First_name === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {message.Created_at}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t bg-secondary">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={() => {
                // console.log("hello");
                // handleDisplayMessages()
                const newMsg: Message = {
                  Message_id: Date.now(),
                  First_name: receiverName,
                  Message: messageText,
                  Created_at: new Date().toISOString()
                }

                setMessages([...messages, newMsg])
                onSendMessage(messageText);
              }}
              className="bg-primary hover:bg-primary/90 px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}