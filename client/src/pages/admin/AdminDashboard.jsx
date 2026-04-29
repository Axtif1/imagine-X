import React, { useEffect, useState } from 'react';
import { Users, FileText, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAllPosts, getReports, fetchStats } from '../../features/admin/adminSlice';

export const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { users, posts, reports, stats, adminLoading } = useSelector(state => state.admin)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllPosts())
    dispatch(getReports())
    dispatch(fetchStats())
  }, [dispatch])

  // Chart Mock Data in case stats API doesn't provide it
  const userGrowthData = stats?.userGrowth || [
    { day: 'Mon', count: 12 }, { day: 'Tue', count: 19 }, { day: 'Wed', count: 15 },
    { day: 'Thu', count: 25 }, { day: 'Fri', count: 22 }, { day: 'Sat', count: 30 }, { day: 'Sun', count: 28 }
  ];
  
  const postsPerDayData = stats?.postsPerDay || [
    { day: 'Mon', count: 45 }, { day: 'Tue', count: 52 }, { day: 'Wed', count: 38 },
    { day: 'Thu', count: 65 }, { day: 'Fri', count: 48 }, { day: 'Sat', count: 70 }, { day: 'Sun', count: 55 }
  ];

  const maxUserGrowth = Math.max(...userGrowthData.map(d => d.count));
  const maxPosts = Math.max(...postsPerDayData.map(d => d.count));

  const activeUsersCount = users.filter(u => u.isActive).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4 hover:border-violet-500/50 transition-colors">
          <div className="bg-violet-600/20 p-4 rounded-lg text-violet-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Total Users</p>
            {adminLoading ? (
              <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold">{users.length}</p>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4 hover:border-green-500/50 transition-colors">
          <div className="bg-green-600/20 p-4 rounded-lg text-green-400">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Active Users</p>
            {adminLoading ? (
              <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold">{activeUsersCount}</p>
            )}
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4 hover:border-blue-500/50 transition-colors">
          <div className="bg-blue-600/20 p-4 rounded-lg text-blue-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Total Posts</p>
            {adminLoading ? (
              <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold">{posts.length}</p>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4 hover:border-red-500/50 transition-colors">
          <div className="bg-red-600/20 p-4 rounded-lg text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Reports</p>
            {adminLoading ? (
              <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold">{reports.length}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-violet-400" /> User Growth (Last 7 Days)
          </h2>
          <div className="h-48 flex items-end gap-2 justify-between">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                <div 
                  className="w-full bg-violet-600/80 rounded-t-sm group-hover:bg-violet-500 transition-colors relative"
                  style={{ height: `${(data.count / maxUserGrowth) * 100}%`, minHeight: '4px' }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.count}
                  </span>
                </div>
                <span className="text-xs text-zinc-500">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Per Day Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" /> Posts Per Day (Last 7 Days)
          </h2>
          <div className="h-48 flex items-end gap-2 justify-between">
            {postsPerDayData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                <div 
                  className="w-full bg-blue-600/80 rounded-t-sm group-hover:bg-blue-500 transition-colors relative"
                  style={{ height: `${(data.count / maxPosts) * 100}%`, minHeight: '4px' }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.count}
                  </span>
                </div>
                <span className="text-xs text-zinc-500">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <h2 className="text-lg font-semibold text-zinc-100 mb-6">Recent Users</h2>
        {adminLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-14 bg-zinc-800 rounded-lg animate-pulse" />)}
          </div>
        ) : users.length === 0 ? (
          <p className="text-zinc-500 text-sm">No users found.</p>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {users.slice(0, 5).map(u => (
              <div key={u._id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-200">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium text-sm">{u.name}</p>
                    <p className="text-zinc-500 text-xs">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-xs rounded-full border ${u.isActive ? 'bg-green-900/30 text-green-400 border-green-800/50' : 'bg-red-900/30 text-red-400 border-red-800/50'}`}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
