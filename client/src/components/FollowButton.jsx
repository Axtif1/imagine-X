import { useState, useEffect } from 'react'
import { getProfile } from '../features/profile/profileSlice'
import { UserPlus, UserCheck } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../features/follow/followSlice';
import { toast } from 'react-toastify';

export const FollowButton = ({ userId, initialIsFollowing = false, className, size = 'sm', onFollowChange }) => {
  const dispatch = useDispatch()
  const { followLoading } = useSelector(state => state.follow)
  const { user } = useSelector(state => state.auth) 
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)


  useEffect(() => {
    setIsFollowing(initialIsFollowing)
  }, [initialIsFollowing])

  const handleFollow = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      toast.error("User ID missing", { position: "top-center" })
      return
    }

    if (isFollowing) {
      setIsFollowing(false)
      dispatch(unfollowUser(userId))
        .unwrap()
        .then(() => {
          if (user?.name) dispatch(getProfile(user.name))
          if (onFollowChange) onFollowChange()
        })
        .catch((err) => {
          setIsFollowing(true)
          toast.error(err || "Failed to unfollow", { position: "top-center", theme: "dark" })
        })
    } else {
      setIsFollowing(true)
      dispatch(followUser(userId))
        .unwrap()
        .then(() => {
          if (user?.name) dispatch(getProfile(user.name))
          if (onFollowChange) onFollowChange()
        })
        .catch((err) => {
          setIsFollowing(false)
          toast.error(err || "Failed to follow", { position: "top-center", theme: "dark" })
        })
    }
  }

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'primary'}
      size={size}
      onClick={handleFollow}
      disabled={followLoading}
      className={cn("gap-2", className)}
    >
      {isFollowing ? (
        <>
          <UserCheck className="h-4 w-4 text-violet-400" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
};
