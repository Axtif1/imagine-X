import React from 'react';
import { Download, Share2, Plus, Check } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';
import { ImageSkeleton } from './Loader';

export const GeneratedImage = ({ imageUrl, prompt, style, isGenerating, onPost }) => {
  const [isPosted, setIsPosted] = React.useState(false);

  if (isGenerating) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 animate-pulse">
        <ImageSkeleton className="h-[500px] mb-4" />
        <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
      </div>
    );
  }

  if (!imageUrl) return null;

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl animate-fadeIn">
      <div className="relative group">
        <img src={imageUrl} alt="Generated result" className="w-full h-auto object-cover max-h-[700px]" />
        
        {/* Top actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-zinc-950/80 backdrop-blur" title="Download">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-zinc-950/80 backdrop-blur" title="Share">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="inline-block px-2.5 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded text-xs font-semibold mb-3 uppercase tracking-wider">
              {style}
            </span>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              "{prompt}"
            </p>
          </div>
          <div className="shrink-0">
            <Button 
              onClick={() => {
                onPost(imageUrl);
                setIsPosted(true);
              }}
              disabled={isPosted}
              className="w-full md:w-auto gap-2"
            >
              {isPosted ? (
                <><Check className="h-5 w-5" /> Posted</>
              ) : (
                <><Plus className="h-5 w-5" /> Post to Feed</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
