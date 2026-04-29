import React, { useEffect } from 'react';
import { Users, FileText, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAllPosts, getReports } from '../../features/admin/adminSlice';

export const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { users, posts, reports, adminLoading } = useSelector(state => state.admin)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllPosts())
    dispatch(getReports())
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-violet-600/20 p-4 rounded-lg text-violet-400">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Users</p>
            {adminLoading ? (
              <div className="h-9 w-16 bg-zinc-700 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-3xl font-bold">{users.length}</p>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-blue-600/20 p-4 rounded-lg text-blue-400">
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Posts</p>
            {adminLoading ? (
              <div className="h-9 w-16 bg-zinc-700 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-3xl font-bold">{posts.length}</p>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-red-600/20 p-4 rounded-lg text-red-400">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Pending Reports</p>
            {adminLoading ? (
              <div className="h-9 w-16 bg-zinc-700 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-3xl font-bold">{reports.length}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">Recent Users</h2>
        {adminLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-10 bg-zinc-800 rounded animate-pulse" />)}
          </div>
        ) : users.length === 0 ? (
          <p className="text-zinc-500 text-sm">No users found.</p>
        ) : (
          <div className="divide-y divide-zinc-800">
            {users.slice(0, 5).map(u => (
              <div key={u._id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium text-sm">{u.name}</p>
                    <p className="text-zinc-500 text-xs">{u.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${u.isActive ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'}`}>
                  {u.isActive ? 'Active' : 'Blocked'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
