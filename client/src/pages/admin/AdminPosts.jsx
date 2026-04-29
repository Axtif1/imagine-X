import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, deleteAdminPost } from '../../features/admin/adminSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, LayoutGrid, List, Trash2, AlertTriangle, Eye, Heart, Calendar } from 'lucide-react';

export const AdminPosts = () => {
  const dispatch = useDispatch()
  const { posts, adminLoading, adminError, adminErrorMessage } = useSelector(state => state.admin)

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingPost, setDeletingPost] = useState(null);

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [adminError, adminErrorMessage])

  // Filtering
  const filteredPosts = posts.filter(post => {
    const searchLow = searchTerm.toLowerCase();
    const promptMatch = post.prompt?.toLowerCase().includes(searchLow);
    const creatorMatch = post.user?.name?.toLowerCase().includes(searchLow);
    return promptMatch || creatorMatch;
  });

  const handleDeleteConfirm = () => {
    dispatch(deleteAdminPost(deletingPost._id))
      .unwrap()
      .then(() => {
        toast.success("Post deleted successfully", { position: "top-center", theme: "dark" });
        setDeletingPost(null);
      })
      .catch((err) => toast.error(err || "Failed to delete post", { position: "top-center", theme: "dark" }));
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn text-white pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Posts</h1>
          <p className="text-zinc-400 text-sm mt-1">{filteredPosts.length} posts found</p>
        </div>
      </div>
      
      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by prompt or creator name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      {adminLoading ? (
        <div className="p-12 text-center text-zinc-500 animate-pulse">Loading posts...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center text-zinc-500">
          No posts match your search criteria.
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPosts.map(post => (
            <div key={post._id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
              <div className="aspect-square relative overflow-hidden bg-zinc-800">
                <img 
                  src={post.imageLink} 
                  alt={post.prompt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link to={`/post/${post._id}`}>
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full"><Eye className="h-4 w-4" /></Button>
                  </Link>
                  <Button size="icon" variant="danger" className="h-8 w-8 rounded-full" onClick={() => setDeletingPost(post)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-zinc-300 truncate mb-1" title={post.prompt}>{post.prompt}</p>
                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                  <span className="truncate pr-2">@{post.user?.name || 'unknown'}</span>
                  <span className="flex items-center gap-1 shrink-0"><Heart className="h-3 w-3" /> {post.likes?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400 min-w-[800px]">
            <thead className="bg-zinc-950/50 text-zinc-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium w-20">Image</th>
                <th className="px-6 py-4 font-medium">Prompt</th>
                <th className="px-6 py-4 font-medium">Creator</th>
                <th className="px-6 py-4 font-medium">Metrics</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredPosts.map((post) => (
                <tr key={post._id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <img
                      src={post.imageLink}
                      alt="thumbnail"
                      className="w-12 h-12 rounded object-cover bg-zinc-800 border border-zinc-700"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-zinc-200 line-clamp-2 max-w-sm" title={post.prompt}>{post.prompt}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-200">
                    {post.user?.name ? (
                      <Link to={`/profile/${post.user.name}`} className="hover:text-violet-400 transition-colors flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] shrink-0">
                          {post.user.name.charAt(0).toUpperCase()}
                        </div>
                        @{post.user.name}
                      </Link>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-400" /> {post.likes?.length || 0}</span>
                      <span className="flex items-center gap-1 text-zinc-500"><Calendar className="h-3 w-3" /> {new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <Link to={`/post/${post._id}`}>
                      <Button variant="secondary" size="sm" className="h-8 px-3 text-xs">View</Button>
                    </Link>
                    <Button variant="danger" size="sm" className="h-8 w-8 px-0" onClick={() => setDeletingPost(post)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm animate-fadeIn text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Delete Post</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Are you sure you want to permanently delete this post? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setDeletingPost(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={handleDeleteConfirm} disabled={adminLoading}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
