
import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "xs" | "sm" | "md" | "lg";
}

const ResponsiveContainer = ({
  children,
  className,
  maxWidth = "2xl",
  padding = "md",
  ...props
}: ResponsiveContainerProps) => {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "px-0",
    xs: "px-2 sm:px-3",
    sm: "px-3 sm:px-4",
    md: "px-4 sm:px-6 md:px-8",
    lg: "px-4 sm:px-6 md:px-8 lg:px-12",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { ResponsiveContainer };
