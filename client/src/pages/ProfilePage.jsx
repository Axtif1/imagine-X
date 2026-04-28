import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MasonryGrid } from '../components/MasonryGrid';
import { FollowButton } from '../components/FollowButton';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../features/profile/profileSlice';
import { Spinner } from '../components/Loader'
import { toast } from 'react-toastify';

export const ProfilePage = () => {
 
  const { username } = useParams()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { profile, profileSuccess, profileError, profileLoading, profileErrorMessage } = useSelector(state => state.profile)

  const isOwnProfile = user?.name === username

  // Check if the logged-in user already follows this profile
  const isFollowing = profile?.followers?.some(
    (f) => f === user?.id || f?._id === user?.id
  ) || false

  useEffect(() => {
    dispatch(getProfile(username))
  }, [username])

  useEffect(() => {
    if (profileError && profileErrorMessage) {
      toast.error(profileErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [profileError, profileErrorMessage])

  if (profileLoading || !profile) return <Spinner />

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="animate-fadeIn">
        {/* Profile Header */}
        <div className="px-6 py-12 border-b border-zinc-800/50 flex flex-col items-center justify-center text-center bg-zinc-900/20">
          <div className="h-32 w-32 rounded-full border-4 border-zinc-800 mb-4 shadow-xl flex justify-center items-center text-5xl bg-zinc-800">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-2">{profile?.name}</h1>
          <p className="text-zinc-500 mb-4">@{profile?.name}</p>
          <p className="text-zinc-300 max-w-lg mb-6 leading-relaxed">{profile?.bio}</p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 text-sm w-full max-w-sm">
            <div className="flex flex-col flex-1 min-w-[80px]">
              <span className="font-bold text-white text-lg">{profile?.posts?.length || 0}</span>
              <span className="text-zinc-500">Posts</span>
            </div>
            <div className="flex flex-col flex-1 min-w-[80px]">
              <span className="font-bold text-white text-lg">{profile?.followers?.length || 0}</span>
              <span className="text-zinc-500">Followers</span>
            </div>
            <div className="flex flex-col flex-1 min-w-[80px]">
              <span className="font-bold text-white text-lg">{profile?.followings?.length || 0}</span>
              <span className="text-zinc-500">Following</span>
            </div>
          </div>

          <div className="flex gap-3">
            {!isOwnProfile && (
              <FollowButton
                userId={profile?._id}
                initialIsFollowing={isFollowing}
                size="md"
                className="px-8"
              />
            )}
          </div>
        </div>

        {/* Profile Grid */}
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
          <h2 className="text-xl font-bold text-white mb-8">Creations</h2>
          <MasonryGrid posts={profile?.posts || []} loading={profileLoading} />
        </div>
      </div>
    </main>
  );
};
