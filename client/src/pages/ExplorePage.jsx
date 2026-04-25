// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';
// import { Navbar } from '../components/Navbar';
// import { Sidebar } from '../components/Sidebar';
// import { MasonryGrid } from '../components/MasonryGrid';
// import { mockPosts, mockTrendingTags } from '../mockData';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPosts } from '../features/post/postSlice';

// export const ExplorePage = () => {
//   const [loading, setLoading] = useState(true);
//   // const [posts, setPosts] = useState([]);
//   // const [searchQuery, setSearchQuery] = useState('');

//   const dispatch = useDispatch() 
//   const {posts ,postLoading , postSuccess , postError , postErrorMessage} = useSelector(state => state.post)

//   // const filteredPosts = posts?.filter(post =>
//   //   post.caption?.toLowerCase().includes(searchQuery.toLowerCase())
//   // ) || []


//   useEffect(() => {
//     dispatch(getPosts())
//   }, [])

//    if (postError) return <p className="text-red-400 p-8">{postErrorMessage}</p>


//   return (
//     <div className="min-h-screen bg-zinc-950 flex flex-col">
//       <div className="flex flex-1 overflow-hidden">
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
//           <div className="max-w-[1600px] mx-auto">
            
//             <div className="max-w-3xl mx-auto mb-12 text-center mt-8 animate-fadeIn">
//               <h1 className="text-4xl font-extrabold text-white mb-6">Explore Inspiration</h1>
//               <div className="relative mb-8">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
//                 <input 
//                   type="text" 
//                   // value={searchQuery}
//                   // onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search for styles, subjects, or creators..." 
//                   className="w-full h-14 bg-zinc-900 border border-zinc-700/80 rounded-full pl-12 pr-6 text-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-xl transition-all hover:border-zinc-600"
//                 />
//               </div>
//               <div className="flex flex-wrap justify-center gap-2">
//             {posts.map(post => (
//               <button 
//                 key={post}
//                 // onClick={() => setSearchQuery(tag)}
//                 className="px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-colors"
//               >
//                 {post}

//               </button>
//                 ))}
//               </div>
//             </div>

//             <MasonryGrid posts={posts} loading={postLoading} />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { MasonryGrid } from '../components/MasonryGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/post/postSlice';

export const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch()
  const { posts, postLoading, postError, postErrorMessage } = useSelector(state => state.post)

  const tags = [...new Set(posts?.map(post => post.caption).filter(Boolean))] || []

  const filteredPosts = searchQuery 
  ? posts?.filter(post => {
      const text = (post.caption || post.prompt || '').toLowerCase()
      return text.includes(searchQuery.toLowerCase())
    }) || []
  : posts || []

  useEffect(() => {
    dispatch(getPosts())
  }, [])

//   console.log('posts:', posts)
// console.log('filteredPosts:', filteredPosts)

  if (postError) return <p className="text-red-400 p-8">{postErrorMessage}</p>

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="max-w-3xl mx-auto mb-12 text-center mt-8 animate-fadeIn">
          <h1 className="text-4xl font-extrabold text-white mb-6">Explore Inspiration</h1>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for styles, subjects, or creators..."
              className="w-full h-14 bg-zinc-900 border border-zinc-700/80 rounded-full pl-12 pr-6 text-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-xl transition-all hover:border-zinc-600"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <MasonryGrid posts={filteredPosts} loading={postLoading} />
      </div>
    </div>
  );
};