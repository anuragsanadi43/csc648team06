/**
 * label.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * Reusable label component from the shadcn/ui library for form field labels. Built on
 * Radix UI primitives with proper accessibility support. Provides consistent styling and
 * behavior for all form labels throughout the LEMN platform. Automatically handles disabled
 * states and peer relationships with form inputs. Used in login, registration, profile
 * editing, tutor applications, and all other form interfaces.
 */

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";

import { cn } from "./utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };