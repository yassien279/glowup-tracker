// src/components/ui/avatar.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Avatar({ className, src, alt, ...props }) {
  return (
    <span
      className={cn("inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-200", className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <svg
          className="h-full w-full text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 24v-2c0-2.21-3.582-4-8-4s-8 1.79-8 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </span>
  );
}

export { Avatar };
