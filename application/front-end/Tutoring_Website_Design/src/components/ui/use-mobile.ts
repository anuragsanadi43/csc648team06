/**
 * use-mobile.ts
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A custom React hook that detects whether the user is on a mobile device based on screen
 * width. This hook uses the window.matchMedia API to track viewport changes and returns a
 * boolean indicating mobile status. The mobile breakpoint is set at 768px (tablet size).
 * This is useful for conditionally rendering mobile-specific UI or adjusting component
 * behavior based on device type. Used by various UI components for responsive design.
 */

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}