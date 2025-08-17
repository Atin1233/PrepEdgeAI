import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none";
    
    const variantClasses = {
      default: "bg-[#3AC7F3] text-white shadow-sm hover:bg-[#2BB8E4]",
      destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
      outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-50",
      secondary: "bg-[#3AE374] text-[#0A2540] shadow-sm hover:bg-[#2DD165]",
      ghost: "hover:bg-gray-100",
      link: "text-[#3AC7F3] underline-offset-4 hover:underline"
    };

    const sizeClasses = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 py-2",
      lg: "h-10 px-6 py-2",
      icon: "h-9 w-9"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };