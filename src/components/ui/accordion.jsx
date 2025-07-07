// src/components/ui/accordion.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Accordion({ className, ...props }) {
  return (
    <div className={cn("divide-y rounded-md border", className)} {...props} />
  );
}

function AccordionItem({ className, ...props }) {
  return (
    <div className={cn("group", className)} {...props} />
  );
}

function AccordionTrigger({ className, ...props }) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline",
        className
      )}
      {...props}
    />
  );
}

function AccordionContent({ className, ...props }) {
  return (
    <div className={cn("pb-4 pt-0", className)} {...props} />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
