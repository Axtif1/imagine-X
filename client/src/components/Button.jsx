import React from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  disabled, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 active:scale-95 disabled:pointer-events-none disabled:opacity-50 ring-offset-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-purple-500 text-white hover:brightness-110",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
    ghost: "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-6 py-2",
    lg: "h-12 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";
