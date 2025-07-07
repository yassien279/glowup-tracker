// src/components/ui/tabs.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

function Tabs({ className, ...props }) {
  return (
    <div
      role="tablist"
      className={cn("flex flex-wrap border-b", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <div
      className={cn("flex gap-2 px-2 py-1", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <button
      role="tab"
      className={cn(
        "px-4 py-2 rounded-lg font-medium focus:outline-none data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <div
      role="tabpanel"
      className={cn("py-4", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
