// src/components/ui/dialog.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Dialog({ className, open, onClose, children, ...props }) {
  if (!open) return null;
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", className)}>
      <div className={cn("bg-white rounded-lg p-6 shadow-lg", className)} {...props}>
        {children}
        <button
          className="mt-4 inline-flex items-center rounded bg-primary px-3 py-1.5 text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export { Dialog };
