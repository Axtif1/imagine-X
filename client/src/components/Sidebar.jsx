import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, User, Home, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockUsers, mockTrendingTags } from '../mockData';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice'
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import { getSuggestedUsers } from '../features/profile/profileSlice';


export const Sidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { suggestedUsers, profileLoading } = useSelector(state => state.profile)
  const { user } = useSelector(state => state.auth)



  const handleLogout = () => {
    dispatch(logoutUser())
  }

  useEffect(() => {
    if (user) dispatch(getSuggestedUsers())
  }, [])

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
  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Suggested Creators</h3>
  <div className="flex flex-col gap-3">
    {profileLoading ? (
      [...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800 animate-pulse" />
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-zinc-800 rounded animate-pulse w-24" />
            <div className="h-2 bg-zinc-800 rounded animate-pulse w-16" />
          </div>
        </div>
      ))
    ) : suggestedUsers?.length === 0 ? (
      <p className="text-xs text-zinc-500">No suggestions found</p>
    ) : suggestedUsers?.map((u) => (   // ← mockUsers.map ki jagah suggestedUsers.map
      <div
        key={u._id}
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate(`/profile/${u.name}`)}
      >
        <div className="h-8 w-8 rounded-full bg-zinc-700 border border-zinc-600 group-hover:border-violet-500 transition-colors flex items-center justify-center text-sm font-bold flex-shrink-0">
          {u.avatar ? (
            <img src={u.avatar} alt={u.name} className="h-8 w-8 rounded-full object-cover" />
          ) : (
            u.name?.charAt(0).toUpperCase()
          )}
        </div>
        <div className="truncate">
          <p className="text-sm text-zinc-100 font-medium truncate group-hover:text-violet-400 transition-colors">
            {u.name}
          </p>
          <p className="text-xs text-zinc-500 truncate">
            {u.followers?.length || 0} followers
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>
    </aside>
  );
};
