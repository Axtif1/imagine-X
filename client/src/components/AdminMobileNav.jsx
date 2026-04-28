import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, AlertTriangle, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export const AdminMobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden bg-zinc-950 border-t border-zinc-800 pb-safe">
      <div className="flex w-full justify-around items-center h-16">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-[10px] font-medium">Dash</span>
        </NavLink>
        
        <NavLink 
          to="/admin/posts" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <FileText className="h-6 w-6" />
          <span className="text-[10px] font-medium">Posts</span>
        </NavLink>
        
        <NavLink 
          to="/admin/reports" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-red-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <AlertTriangle className="h-6 w-6" />
          <span className="text-[10px] font-medium">Reports</span>
        </NavLink>
        
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors", 
            isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <Users className="h-6 w-6" />
          <span className="text-[10px] font-medium">Users</span>
        </NavLink>
      </div>
    </nav>
  );
};
