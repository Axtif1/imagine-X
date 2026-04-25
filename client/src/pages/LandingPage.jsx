import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Sparkles, Hexagon, Image as ImageIcon, Users } from 'lucide-react';
import { mockPosts } from '../mockData';
import { useSelector } from 'react-redux';

export const LandingPage = () => {

  const { user } = useSelector(state => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      navigate("/feed")
    }
  },[user])
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-sm font-medium mb-8 animate-[fadeIn_0.5s_ease_forwards]">
            <Sparkles className="h-4 w-4" /> The future of AI Art
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mb-6 leading-tight animate-[fadeIn_0.7s_ease_forwards]">
            Imagine the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-400">impossible</span> with AI
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mb-10 animate-[fadeIn_0.9s_ease_forwards]">
            Join the premier community for AI artists. Generate, discover, and share breathtaking creations powered by next-generation models.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-[fadeIn_1.1s_ease_forwards]">
            <Button size="lg" onClick={() => navigate('/register')} className="px-8 text-lg font-semibold shadow-xl shadow-violet-500/20">
              Start Creating
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/explore')} className="px-8 text-lg font-semibold">
              Explore Gallery
            </Button>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 px-6 border-t border-zinc-800/50 bg-zinc-950/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-violet-400">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Generation</h3>
              <p className="text-zinc-400">Transform your ideas into stunning visuals using our state-of-the-art text-to-image generator.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-violet-400">
                <ImageIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Infinite Inspiration</h3>
              <p className="text-zinc-400">Explore a never-ending, Pinterest-style masonry grid filled with community creations.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-violet-400">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Connect & Share</h3>
              <p className="text-zinc-400">Follow your favorite creators, like stunning artworks, and curate your personal profile.</p>
            </div>
          </div>
        </section>

        {/* Sneak Peek Gallery */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Trending Inspirations</h2>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {mockPosts.slice(0, 8).map(post => (
                <div key={post.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer" onClick={() => navigate('/login')}>
                  <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
