// src/components/ui/input.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}

export { Input };
