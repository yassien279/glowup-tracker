// src/components/ui/badge.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
