import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, User, Home, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockUsers, mockTrendingTags } from '../mockData';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice'
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';


export const Sidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 h-full sticky top-16 border-r border-zinc-800 p-6 overflow-y-auto">

      <div className="flex items-center gap-2 mb-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-lg p-1 group-hover:scale-105 transition-transform">
            <Hexagon className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Imaginex</span>
        </Link>
      </div>
      <div className="space-y-8 ">
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Discover</h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/feed" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
              <Home className="h-5 w-5" /> Home
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
              <Compass className="h-5 w-5" /> Explore
            </NavLink>
            <NavLink to="/generate" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-violet-600/10 text-violet-400" : "text-zinc-400 hover:text-violet-400 hover:bg-violet-600/10")}>
              <Sparkles className="h-5 w-5" /> AI Generator
            </NavLink>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Trending Tags</h3>
          <div className="flex flex-wrap gap-2">
            {mockTrendingTags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 cursor-pointer hover:border-violet-500 hover:text-violet-400 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Suggested Creators</h3>
          <div className="flex flex-col gap-3">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative">
                    <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full border border-zinc-700 object-cover group-hover:border-violet-500 transition-colors" />
                    {user.isFollowing && <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 rounded-full border border-zinc-950" />}
                  </div>
                  <div className="truncate">
                    <p className="text-sm text-zinc-100 font-medium truncate">{user.name}</p>
                    <p className="text-xs text-zinc-500 truncate">@{user.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
