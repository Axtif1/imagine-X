import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Sparkles, Home, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { cn } from '../lib/utils';

export const MobileNav = () => {
  const { user } = useSelector(state => state.auth);

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden bg-zinc-950 border-t border-zinc-800 pb-safe">
      <div className="flex w-full justify-around items-center h-16">
        <NavLink 
          to="/feed" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        
        <NavLink 
          to="/explore" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <Compass className="h-6 w-6" />
          <span className="text-[10px] font-medium">Explore</span>
        </NavLink>
        
        <NavLink 
          to="/generate" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <div className={cn(
            "p-2 rounded-full transition-colors",
            // If active, show violet background, else show dark background with violet glow on hover
            "bg-violet-600/20"
          )}>
            <Sparkles className="h-6 w-6" />
          </div>
        </NavLink>
        
        <NavLink 
          to={`/profile/${user.name}`} 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};
