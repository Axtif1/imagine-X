import React, { useEffect } from 'react';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../features/admin/adminSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AdminPosts = () => {
  const dispatch = useDispatch()
  const { posts, adminLoading, adminError, adminErrorMessage } = useSelector(state => state.admin)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [adminError, adminErrorMessage])

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Posts</h1>
        <span className="text-zinc-400 text-sm">{posts.length} posts total</span>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/50 text-zinc-300 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Post Image</th>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Likes</th>
              <th className="px-6 py-4 font-medium">Prompt</th>
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
            ) : posts.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-center text-zinc-500" colSpan={5}>
                  No posts found.
                </td>
              </tr>
            ) : posts.map((post) => (
              <tr key={post._id} className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4">
                  <img
                    src={post.imageLink}
                    alt="post"
                    className="w-12 h-12 rounded object-cover bg-zinc-800"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-zinc-200">
                  {post.user?.name ? (
                    <Link to={`/profile/${post.user.name}`} className="hover:text-violet-400 transition-colors">
                      @{post.user.name}
                    </Link>
                  ) : '—'}
                </td>
                <td className="px-6 py-4">{post.likes?.length || 0}</td>
                <td className="px-6 py-4 truncate max-w-xs">{post.prompt}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link to={`/post/${post._id}`}>
                    <Button variant="secondary" size="sm">View</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
