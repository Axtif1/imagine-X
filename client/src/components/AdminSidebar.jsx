// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { LayoutDashboard, FileText, AlertTriangle, Users } from 'lucide-react';
// import { cn } from '../lib/utils';
// import { Link } from 'react-router-dom';
// import { Hexagon } from 'lucide-react';

// export const AdminSidebar = () => {
//   return (
//     <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 border-r border-zinc-800 p-6 overflow-y-auto">
//       <div className="space-y-8">
//         <div>
//           <Link to="/" className="flex items-center gap-2 group">
//                     <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-lg p-1 group-hover:scale-105 transition-transform">
//                       <Hexagon className="h-6 w-6 text-white" />
//                     </div>
//                     <span className="font-bold text-xl tracking-tight">Imaginex</span>
//                   </Link>
//           <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Admin Panel</h3>
//           <nav className="flex flex-col gap-1">
//             <NavLink to="/admin/dashboard" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
//               <LayoutDashboard className="h-5 w-5" /> Dashboard
//             </NavLink>
//             <NavLink to="/admin/posts" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
//               <FileText className="h-5 w-5" /> Manage Posts
//             </NavLink>
//             <NavLink to="/admin/reports" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-red-900/20 text-red-400" : "text-zinc-400 hover:text-red-400 hover:bg-red-900/10")}>
//               <AlertTriangle className="h-5 w-5" /> Reports
//             </NavLink>
//             <NavLink to="/admin/users" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
//               <Users className="h-5 w-5" /> Users
//             </NavLink>
//           </nav>
//         </div>
//       </div>
//     </aside>
//   )
// }

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, AlertTriangle, Users, Hexagon } from 'lucide-react';
import { cn } from '../lib/utils';

export const AdminSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-full sticky top-16 border-r border-zinc-800 p-6 overflow-y-auto">
      
      <div className="flex items-center gap-2 mb-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-violet-600 to-purple-500 rounded-lg p-1 group-hover:scale-105 transition-transform">
            <Hexagon className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Imaginex</span>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Admin Panel</h3>
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin/dashboard" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </NavLink>
            <NavLink to="/admin/posts" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
              <FileText className="h-5 w-5" /> Manage Posts
            </NavLink>
            <NavLink to="/admin/reports" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-red-900/20 text-red-400" : "text-zinc-400 hover:text-red-400 hover:bg-red-900/10")}>
              <AlertTriangle className="h-5 w-5" /> Reports
            </NavLink>
            <NavLink to="/admin/users" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50")}>
              <Users className="h-5 w-5" /> Users
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  )
}