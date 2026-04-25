import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const Spinner = ({ className, size = 'md' }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  
  return (
    <div className={cn("flex justify-center items-center w-full py-4")}>
      <Loader2 className={cn("animate-spin text-violet-500", sizes[size], className)} />
    </div>
  );
};

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-800", className)}
      {...props}
    />
  );
};

export const ImageSkeleton = ({ className }) => {
  return (
    <Skeleton className={cn("w-full h-64 rounded-2xl", className)} />
  );
};
