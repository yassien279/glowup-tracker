// src/components/ui/select.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export { Select };
