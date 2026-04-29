import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUser, deleteUser } from '../../features/admin/adminSlice';
import { toast } from 'react-toastify';
import { Search, Filter, Edit2, Trash2, X, AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminUsers = () => {
  const dispatch = useDispatch()
  const { users, adminLoading, adminError, adminErrorMessage } = useSelector(state => state.admin)

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Modals state
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '', email: '', phone: '', bio: '', isAdmin: false, isActive: true, creditsToAdd: 0
  });

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [adminError, adminErrorMessage])

  // Filtering
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filter === 'Active') return user.isActive;
    if (filter === 'Inactive') return !user.isActive;
    if (filter === 'Admins') return user.isAdmin;
    return true;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;

  // Handlers
  const openEditModal = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      isAdmin: !!user.isAdmin,
      isActive: !!user.isActive,
      creditsToAdd: 0
    });
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      bio: editForm.bio,
      isAdmin: editForm.isAdmin,
      isActive: editForm.isActive,
      // Calculate new total credits if backend expects total, but based on prompt "Add credits", we might send credits to add.
      // Assuming backend expects the total OR the addition. We'll send total credits for simplicity if it's a PUT request.
      credits: (editingUser.credits || 0) + Number(editForm.creditsToAdd)
    };

    dispatch(updateUser({ uid: editingUser._id, data: updatedData }))
      .unwrap()
      .then(() => {
        toast.success("User updated successfully", { position: "top-center", theme: "dark" });
        setEditingUser(null);
      })
      .catch((err) => toast.error(err || "Failed to update user", { position: "top-center", theme: "dark" }));
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteUser(deletingUser._id))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully", { position: "top-center", theme: "dark" });
        setDeletingUser(null);
      })
      .catch((err) => toast.error(err || "Failed to delete user", { position: "top-center", theme: "dark" }));
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-zinc-400 text-sm mt-1">{filteredUsers.length} users found</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
          >
            <option value="All">All Users</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Admins">Admins</option>
          </select>
        </div>
      </div>
      
      {/* Table / Card View */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-zinc-800">
          {adminLoading ? (
            <div className="p-6 text-center text-zinc-500 animate-pulse">Loading users...</div>
          ) : currentUsers.length === 0 ? (
            <div className="p-6 text-center text-zinc-500">No users match your criteria.</div>
          ) : (
            currentUsers.map(user => (
              <div key={user._id} className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-lg text-zinc-200 shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-100 truncate">{user.name} {user.isAdmin && <Shield className="inline h-3 w-3 text-violet-400 ml-1" />}</p>
                    <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-[10px] rounded-full border shrink-0 ${user.isActive ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                  <span>Phone: {user.phone || 'N/A'}</span>
                  <span>Credits: <strong className="text-violet-400">{user.credits ?? 0}</strong></span>
                </div>

                <div className="flex gap-2">
                  <Link to={`/profile/${user.name}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full text-xs h-8">Profile</Button>
                  </Link>
                  <Button variant="secondary" size="sm" className="flex-1 text-xs h-8 bg-blue-900/20 text-blue-400 hover:bg-blue-900/40" onClick={() => openEditModal(user)}>
                    <Edit2 className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="danger" size="sm" className="h-8 w-8 px-0" onClick={() => setDeletingUser(user)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950/50 text-zinc-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Credits</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {adminLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4" colSpan={6}>
                      <div className="h-10 bg-zinc-800 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td className="px-6 py-12 text-center text-zinc-500" colSpan={6}>
                    No users match your criteria.
                  </td>
                </tr>
              ) : currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-sm text-zinc-200 shrink-0 group-hover:border-violet-500 transition-colors">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-zinc-300">{user.phone || '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <span className="flex items-center gap-1 text-violet-400 text-xs font-semibold bg-violet-400/10 px-2 py-1 rounded-md w-fit">
                        <Shield className="h-3 w-3" /> Admin
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-xs px-2 py-1">User</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs w-fit ${user.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {user.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-300">
                    {user.credits ?? 0}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link to={`/profile/${user.name}`}>
                      <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">Profile</Button>
                    </Link>
                    <Button variant="secondary" size="sm" className="h-8 px-3 text-xs bg-blue-900/20 text-blue-400 hover:bg-blue-900/40" onClick={() => openEditModal(user)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="h-8 w-8 px-0" onClick={() => setDeletingUser(user)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <p className="text-sm text-zinc-400">
            Showing <span className="font-medium text-white">{indexOfFirstUser + 1}</span> to <span className="font-medium text-white">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="font-medium text-white">{filteredUsers.length}</span> users
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
            <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg my-8 relative">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <button onClick={() => setEditingUser(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} required />
                <Input label="Phone" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
              </div>
              
              <Input label="Email" type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} required />
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Bio</label>
                <textarea 
                  value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 resize-none h-20"
                />
              </div>

              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Admin Privileges</p>
                    <p className="text-xs text-zinc-500">Grant this user full access to the admin panel.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={editForm.isAdmin} onChange={e => setEditForm({...editForm, isAdmin: e.target.checked})} />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Account Status</p>
                    <p className="text-xs text-zinc-500">If inactive, the user cannot log in.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={editForm.isActive} onChange={e => setEditForm({...editForm, isActive: e.target.checked})} />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <p className="text-sm font-medium text-white mb-2">Manage Credits</p>
                <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                  <span className="text-sm text-zinc-400">Current Credits: <strong className="text-violet-400">{editingUser.credits ?? 0}</strong></span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-400">+</span>
                    <input 
                      type="number" 
                      value={editForm.creditsToAdd} 
                      onChange={e => setEditForm({...editForm, creditsToAdd: e.target.value})}
                      className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-white text-center focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="ghost" onClick={() => setEditingUser(null)}>Cancel</Button>
                <Button type="submit" disabled={adminLoading}>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm animate-fadeIn text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Delete User</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Are you sure you want to permanently delete <strong className="text-white">{deletingUser.name}</strong>? All their posts and data will be removed. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setDeletingUser(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={handleDeleteConfirm} disabled={adminLoading}>Delete</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
