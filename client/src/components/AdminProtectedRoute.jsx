import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { Navbar } from './Navbar'
import { useSelector } from 'react-redux'

export const AdminProtectedRoute = () => {
  const { user } = useSelector(state => state.auth) 

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Logged in but not admin
  if (!user.isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
  <div className="flex h-screen overflow-hidden">
    <AdminSidebar />
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  </div>
)
}