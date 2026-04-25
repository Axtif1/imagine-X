import React from 'react';
import { cn } from '../lib/utils';

export const UserAvatar = ({ src, alt, size = 'md', isOnline = false, className }) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24"
  };

  const indicatorSizes = {
    sm: "h-2.5 w-2.5 -bottom-0.5 -right-0.5 border-2",
    md: "h-3 w-3 -bottom-0.5 -right-0.5 border-2",
    lg: "h-4 w-4 bottom-0 right-0 border-[3px]",
    xl: "h-5 w-5 bottom-1 right-1 border-4"
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div className='bg-red-900 h-60 w-60'>
        <h1>54</h1>
      </div>
      {isOnline && (
        <div className={cn("absolute bg-green-500 rounded-full border-zinc-950", indicatorSizes[size])} />
      )}
    </div>
  );
};
