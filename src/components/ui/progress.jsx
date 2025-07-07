// src/components/ui/progress.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Progress({ className, value, max = 100, ...props }) {
  return (
    <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200", className)} {...props}>
      <div
        className="absolute left-0 top-0 h-full bg-primary transition-all"
        style={{ width: `${((value || 0) / max) * 100}%` }}
      />
    </div>
  );
}

export { Progress };
