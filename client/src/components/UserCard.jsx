import React from 'react';
import { Link } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import { FollowButton } from './FollowButton';

export const UserCard = ({ user }) => {
  return (
    <Link 
      to={`/profile/${user.name}`}
      className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/50 transition-colors group"
    >
      <div className="flex items-center gap-4">
        <UserAvatar src={user.avatar} alt={user.username} size="lg" />
        <div>
          <h4 className="font-semibold text-zinc-100 group-hover:text-violet-400 transition-colors">{user.name}</h4>
          <p className="text-sm text-zinc-500">@{user.username}</p>
          <div className="flex gap-3 text-xs text-zinc-400 mt-1">
            <span><strong className="text-zinc-300">{user.followers}</strong> followers</span>
            <span><strong className="text-zinc-300">{user.posts}</strong> posts</span>
          </div>
        </div>
      </div>
      <div onClick={(e) => e.preventDefault()}>
        <FollowButton initialIsFollowing={user.isFollowing} />
      </div>
    </Link>
  );
};
