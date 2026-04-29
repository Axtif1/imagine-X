import React, { useEffect } from 'react';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, toggleUserStatus } from '../../features/admin/adminSlice';
import { toast } from 'react-toastify';

export const AdminUsers = () => {
  const dispatch = useDispatch()
  const { users, adminLoading, adminError, adminErrorMessage } = useSelector(state => state.admin)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [adminError, adminErrorMessage])

  const handleToggleUser = (uid) => {
    dispatch(toggleUserStatus(uid))
      .unwrap()
      .then(() => toast.success("User status updated", { position: "top-center", theme: "dark" }))
      .catch((err) => toast.error(err || "Failed to update user", { position: "top-center", theme: "dark" }))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <span className="text-zinc-400 text-sm">{users.length} users total</span>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/50 text-zinc-300 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">User Info</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Credits</th>
              <th className="px-6 py-4 font-medium">Admin</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {adminLoading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4" colSpan={5}>
                    <div className="h-8 bg-zinc-800 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-center text-zinc-500" colSpan={5}>
                  No users found.
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user._id} className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">{user.name}</p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full border ${user.isActive ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'}`}>
                    {user.isActive ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="px-6 py-4">{user.credits ?? '-'}</td>
                <td className="px-6 py-4">
                  {user.isAdmin ? (
                    <span className="text-violet-400 text-xs font-semibold">Admin</span>
                  ) : (
                    <span className="text-zinc-600 text-xs">User</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleToggleUser(user._id)}
                    disabled={adminLoading}
                  >
                    {user.isActive ? 'Block' : 'Unblock'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
