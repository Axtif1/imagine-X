import React from 'react';
import { PostCard } from './PostCard';
import { EmptyState } from './EmptyState';

export const MasonryGrid = ({ posts = [], loading = false }) => {
  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 pb-20">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="break-inside-avoid animate-pulse bg-zinc-800 rounded-2xl" style={{ height: `${200 + Math.random() * 200}px` }}></div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <EmptyState title="No posts found" description="Try adjusting your search or explore to find more content." />;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 pb-20">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};
