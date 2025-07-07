// src/components/ui/switch.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Switch({ className, checked, onChange, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition peer-checked:bg-primary focus:outline-none",
        className
      )}
      aria-pressed={checked}
      onClick={() => onChange && onChange(!checked)}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

export { Switch };
