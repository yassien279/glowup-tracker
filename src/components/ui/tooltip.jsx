// src/components/ui/tooltip.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Tooltip({ className, content, children, ...props }) {
  const [show, setShow] = React.useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      {...props}
    >
      {children}
      {show && (
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs shadow z-50",
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}

export { Tooltip };
