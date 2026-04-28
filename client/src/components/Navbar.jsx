import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import { Search, Bell, Menu, X, Hexagon, ChevronDown, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)


  const { user } = useSelector(state => state.auth)
  const isLoggedIn = !!user

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // // Simulated logged-in user state
  // const isLoggedIn = true;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value
    if (query) {
      console.log("Searching for:", query)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 flex-1">
          {/* Logo visible only below lg, since Sidebar has it for lg+ */}
          <Link to="/" className="flex lg:hidden items-center gap-2 group mr-2">
            <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-lg p-1 group-hover:scale-105 transition-transform">
              <Hexagon className="h-6 w-6 text-white" />
            </div>
          <span className="font-bold text-xl tracking-tight">Imaginex</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative lg:ml-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              name="search"
              type="text"
              placeholder="Search inspiration..."
              className="w-full h-10 bg-zinc-900 border border-zinc-700/50 rounded-full pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 hover:bg-zinc-800 transition-colors"
            />
          </form>
        </div>

        <nav className="hidden lg:flex items-center gap-x-6 relative left-3">
          <NavLink to="/feed" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-zinc-100", isActive ? "text-violet-400" : "text-zinc-400")}>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-zinc-100", isActive ? "text-violet-400" : "text-zinc-400")}>
            Explore
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 justify-end flex-1">
          {isLoggedIn ? (
            <>
              <Button onClick={() => navigate('/generate')} size="sm" className="hidden sm:inline-flex rounded-full">
                Create
              </Button>
              <button className="relative p-2 text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-zinc-950 animate-pulse" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2"
                >
                  <div className='h-9 w-9 rounded-full object-cover border border-zinc-700 hover:border-violet-500 transition-colors flex items-center justify-center'>{user?.name?.charAt(0).toUpperCase()}</div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden animate-fadeIn text-sm">
                    <div className="p-3 border-b border-zinc-800">
                      <p className="font-medium text-zinc-100 truncate">{user?.name}</p>
                      <p className="text-zinc-500 text-xs truncate">{user?.name}</p>
                    </div>
                    <div className="p-1">
                      <Link to={`/profile/${user?.name}`} onClick={() => setShowDropdown(false)} className="flex w-full items-center px-3 py-2 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors">
                        Profile
                      </Link>
                      <Link to="/settings" onClick={() => setShowDropdown(false)} className="flex w-full items-center px-3 py-2 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors">
                        Settings
                      </Link>
                       {/* Admin Panel — sirf admin ko dikhega */}
                        {user?.isAdmin && (
                          <Link to="/admin/dashboard" onClick={() => setShowDropdown(false)} className="flex w-full items-center px-3 py-2 text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors">
                            Admin Panel
                          </Link>
                        )}
                      <button onClick={handleLogout} className="flex w-full items-center px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1">
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} variant="ghost" size="sm">Log in</Button>
              <Button onClick={() => navigate('/register')} size="sm">Sign up</Button>
            </>
          )}

          <button className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950/95 p-4 animate-fadeIn space-y-4 shadow-xl">
          <form onSubmit={handleSearch} className="flex relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              name="search"
              type="text"
              placeholder="Search..."
              className="w-full h-10 bg-zinc-900 border border-zinc-700/50 rounded-full pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
          </form>
          <div className="flex flex-col gap-2">
            <Link to="/feed" className="px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/explore" className="px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
            {isLoggedIn && user?.isAdmin && (
              <Link to="/admin/dashboard" className="px-4 py-3 rounded-lg bg-violet-600/10 text-violet-400" onClick={() => setMobileMenuOpen(false)}>
                Admin Panel
              </Link>
            )}
            {isLoggedIn && <Link to={`/profile/${user?.name}`} className="px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>Profile</Link>}
          </div>
        </div>
      )}
    </header>
  );
};
