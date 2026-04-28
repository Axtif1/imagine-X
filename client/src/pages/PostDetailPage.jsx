import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, MessageCircle, Flag, Trash2, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { LikeButton } from '../components/LikeButton';
import { FollowButton } from '../components/FollowButton';
import { ImageSkeleton } from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, reportPost } from '../features/post/postSlice';
import { fetchComments, addComment, deleteComment } from '../features/comment/commentSlice';
import { toast } from 'react-toastify';

export const PostDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { post, postLoading } = useSelector(state => state.post)
  const { comments, commentLoading } = useSelector(state => state.comment)

  const [imageLoaded, setImageLoaded] = useState(false);
  const [commentText, setCommentText] = useState('')
  const [reportText, setReportText] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)

  const isLiked = post?.likes?.some(
    (like) => like === user?.id || like?._id === user?.id
  ) || false

  const isOwnPost = post?.user?._id === user?.id || post?.user?.id === user?.id

  // Fetch post and comments on mount
  useEffect(() => {
    if (id) {
      dispatch(getPost(id))
      dispatch(fetchComments(id))
    }
  }, [id])

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    dispatch(addComment({ pid: id, text: commentText }))
      .unwrap()
      .then(() => setCommentText(''))
      .catch((err) => toast.error(err || "Failed to add comment", { position: "top-center", theme: "dark" }))
  }

  const handleDeleteComment = (cid) => {
    dispatch(deleteComment({ pid: id, cid }))
      .unwrap()
      .catch((err) => toast.error(err || "Failed to delete comment", { position: "top-center", theme: "dark" }))
  }

  const handleReport = (e) => {
    e.preventDefault()
    if (!reportText.trim()) return
    dispatch(reportPost({ pid: id, text: reportText }))
      .unwrap()
      .then(() => {
        setShowReportModal(false)
        setReportText('')
        toast.success("Post reported successfully", { position: "top-center", theme: "dark" })
      })
      .catch((err) => toast.error(err || "Failed to report post", { position: "top-center", theme: "dark" }))
  }

  const handleDownload = async () => {
  try {
    const response = await fetch(post.imageLink);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${post.prompt || 'image'}.jpg`; // ✅ filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Download failed:", error);
  }
}

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {postLoading ? (
          <div className="max-w-[1200px] mx-auto bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px] animate-pulse">
            <div className="md:w-3/5 bg-zinc-800" />
            <div className="p-8 md:w-2/5" />
          </div>
        ) : post && (
          <div className="max-w-[1200px] mx-auto bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fadeIn">

            {/* Image Section */}
            <div className="md:w-[55%] lg:w-3/5 relative bg-zinc-950 flex items-center justify-center overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 z-0">
                  <ImageSkeleton className="h-full w-full rounded-none" />
                </div>
              )}
              <img
                src={post.imageLink}
                alt={post.prompt}
                onLoad={() => setImageLoaded(true)}
                className={`w-full max-h-[85vh] object-contain relative z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>

            {/* Info Section */}
            <div className="md:w-[45%] lg:w-2/5 flex flex-col bg-zinc-900 border-l border-zinc-800 max-h-[85vh] overflow-y-auto text-zinc-100">

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                {/* Action Bar */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <LikeButton
                      postId={post._id}
                      initialLikes={post?.likes?.length || 0}
                      isLiked={isLiked}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-base font-semibold"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full"
                      onClick={handleDownload}  // ✅ Add karo
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href)
                        toast.success("Link copied!", { position: "top-center", theme: "dark" })
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    {!isOwnPost && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full text-red-400 hover:text-red-300"
                        title="Report Post"
                        onClick={() => setShowReportModal(true)}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <h1 className="text-3xl font-extrabold text-white mb-6 leading-tight">{post.prompt}</h1>

                {/* Author */}
                <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-2xl mb-8">
                  <Link to={`/profile/${post.user.name}`} className="flex items-center gap-3 group">
                    <div className="h-12 w-12 rounded-full border border-zinc-700 group-hover:border-violet-500 transition-colors flex justify-center items-center text-2xl">
                      {post?.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-100 group-hover:text-violet-400 transition-colors">{post.user.name}</p>
                      <p className="text-sm text-zinc-500">{post.user?.followers?.length || 0} followers</p>
                    </div>
                  </Link>
                  {!isOwnPost && (
                    <FollowButton
                      userId={post.user._id}
                      initialIsFollowing={post.user?.followers?.some(
                        f => f === user?.id || f?._id === user?.id
                      ) || false}
                      onFollowChange={() => dispatch(getPost(id))}
                    />
                  )}
                </div>

                {/* Comments Section */}
                <div className="mb-6 flex-1">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Comments {comments.length > 0 && <span className="text-zinc-500 text-sm">({comments.length})</span>}
                  </h3>

                  {commentLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map(i => (
                        <div key={i} className="flex gap-3 animate-pulse">
                          <div className="h-8 w-8 bg-zinc-700 rounded-full shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-zinc-700 rounded w-1/3" />
                            <div className="h-3 bg-zinc-700 rounded w-3/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : comments.length === 0 ? (
                    <p className="text-zinc-500 text-sm">No comments yet. Be the first!</p>
                  ) : (
                    <div className="space-y-4">
                      {comments.map(comment => (
                        <div key={comment._id} className="flex gap-3 text-sm group/comment">
                          <div className="h-8 w-8 rounded-full border border-zinc-800 bg-zinc-800 flex items-center justify-center text-sm font-bold shrink-0">
                            {comment?.user?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p>
                              <strong className="text-zinc-200 cursor-pointer hover:underline">{comment?.user?.name}</strong>{' '}
                              <span className="text-zinc-300">{comment.text}</span>
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {/* Delete button for comment owner or post owner */}
                          {(comment?.user?._id === user?.id || isOwnPost) && (
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="opacity-0 group-hover/comment:opacity-100 transition-opacity text-zinc-500 hover:text-red-400 shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-6 border-t border-zinc-800 bg-zinc-950/30">
                <form onSubmit={handleAddComment} className="flex gap-3">
                  <div className="h-10 w-10 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-sm font-bold shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim() || commentLoading}
                    className="p-2 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <Flag className="h-5 w-5 text-red-400" /> Report Post
            </h2>
            <form onSubmit={handleReport}>
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Describe why you're reporting this post..."
                rows={4}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-red-500 transition-colors resize-none mb-4"
              />
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => { setShowReportModal(false); setReportText('') }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!reportText.trim()}
                  className="bg-red-600 hover:bg-red-500 text-white"
                >
                  Submit Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
