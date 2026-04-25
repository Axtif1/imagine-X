import React, { useEffect } from 'react';
import { MasonryGrid } from '../components/MasonryGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/post/postSlice';
import { getProfile } from '../features/profile/profileSlice';
import { toast } from 'react-toastify';


export const FeedPage = () => {
  const dispatch = useDispatch()
  const { posts, postLoading, postError, postErrorMessage } = useSelector(state => state.post)
  const { user, isError, message } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)

  // ✅ SAFE: uses optional chaining on BOTH profile AND followings
  // Falls back to all posts while profile loads or if user follows nobody
  const myFeed = profile?.followings?.length > 0
    ? posts.filter(post =>
        profile.followings.some(
          f => f === post.user?._id || f?._id === post.user?._id
        )
      )
    : posts

  // Fetch posts and own profile once on mount
  useEffect(() => {
    dispatch(getPosts())
    if (user?.name) dispatch(getProfile(user.name))
  }, [])

  // Handle errors in a separate effect
  useEffect(() => {
    if (postError && postErrorMessage) toast.error(postErrorMessage, { position: 'top-center' })
    if (isError && message) toast.error(message, { position: 'top-center' })
  }, [postError, postErrorMessage, isError, message])

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6 animate-fadeIn">For You</h1>
            <MasonryGrid posts={myFeed} loading={postLoading} />
          </div>
        </main>
      </div>
    </div>
  );
};
