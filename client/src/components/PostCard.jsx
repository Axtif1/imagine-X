import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageSkeleton } from './Loader';
import { LikeButton } from './LikeButton';
import { useSelector } from 'react-redux';

export const PostCard = ({ post }) => {

  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth)

  // Check if the current logged-in user has already liked this post
  const isLiked = post?.likes?.some(
    (like) => like === user?.id || like?._id === user?.id
  ) || false

  return (
    <div className="mb-6 break-inside-avoid relative group cursor-pointer animate-fadeIn" onClick={() => navigate(`/post/${post._id}`)}>
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-transform duration-300 group-hover:scale-[1.02]">

        {!imageLoaded && (
          <div className="absolute inset-0 z-0">
            <ImageSkeleton className="h-full w-full rounded-none" />
          </div>
        )}

        <img
          src={post?.imageLink}
          alt={post?.caption || post?.prompt}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto object-cover relative z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex justify-end pointer-events-auto">
            <div className="bg-zinc-950/60 backdrop-blur-md px-3 py-1.5 rounded-full">
              <LikeButton
                postId={post?._id}
                initialLikes={post?.likes?.length || 0}
                isLiked={isLiked}
              />
            </div>
          </div>

          <div className="pointer-events-auto flex items-end justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-lg font-bold text-white truncate mb-1">{post?.prompt || post?.caption}</h3>
              <Link
                to={`/profile/${post?.user?.name}`}
                className="flex items-center gap-2 group/creator inline-flex"
                onClick={(e) => e.stopPropagation()}
              >
                {/* <img src={post?.user?.avatar} alt={post?.user?.name} className="h-6 w-6 rounded-full border border-zinc-500" /> */}
                <div className="h-6 w-6 rounded-full border border-zinc-700 group-hover:border-violet-500 transition-colors flex justify-center items-center">
                      {post?.user?.name?.charAt(0).toUpperCase()}
                    </div>
                <span className="text-sm font-medium text-zinc-300 group-hover/creator:text-white transition-colors truncate">
                  {post?.user?.name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
