/**
 * Footer.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * A simple footer component that displays course identification information at the bottom
 * of every page. This footer is required for CSC 648 Software Engineering course project
 * identification and appears consistently across all pages. It uses flexbox layout to
 * automatically stick to the bottom of the page when content is short, and naturally
 * flows after content when the page is longer.
 */

/**
 * Footer Component
 * 
 * Displays the course identification footer at the bottom of every page.
 * Required for CSC 648 Software Engineering course project identification.
 * 
 * The footer uses mt-auto to stick to the bottom of the page when content is short,
 * and naturally flows after content when the page is longer.
 */
export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Course identification required for academic project submission */}
        <div className="text-center text-sm text-muted-foreground">
          CSC 648 SEC 03 Fall 2025 Team 06
        </div>
      </div>
    </footer>
  );
}