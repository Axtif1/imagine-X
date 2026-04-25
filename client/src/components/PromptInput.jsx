import React, { useState } from 'react';
import { Sparkles, Dices, Image as ImageIcon } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

const styles = ["Cyberpunk", "Anime", "Photorealistic", "Oil Painting", "3D Render", "Watercolor", "Sketch"];

const ratios = [
  { label: "1:1", value: "1024x1024", icon: "⬜" },
  { label: "16:9", value: "1024x576", icon: "▬" },
  { label: "9:16", value: "576x1024", icon: "▯" },
  { label: "4:3", value: "1024x768", icon: "▭" },
]

export const PromptInput = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("Cyberpunk")
  const [selectedRatio, setSelectedRatio] = useState(ratios[0])
  const handleGenerate = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate({ prompt, style: selectedStyle, ratio: selectedRatio.value });
    }
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 shadow-xl">
      <form onSubmit={handleGenerate}>
        <div className="relative mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to imagine..."
            className="w-full h-32 bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-colors"
          />
          <button 
            type="button"
            onClick={() => setPrompt("A futuristic city at night with neon lights and flying cars, digital art")}
            className="absolute bottom-4 right-4 p-2 bg-zinc-800 text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors group"
            title="Surprise me"
          >
            <Dices className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> Style
          </label>
          <div className="flex flex-wrap gap-2">
            {styles.map(style => (
              <button
                key={style}
                type="button"
                onClick={() => setSelectedStyle(style)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                  selectedStyle === style 
                    ? "bg-violet-600/20 border-violet-500 text-violet-300" 
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                )}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Ratio Selector — style div ke baad */}
<div className="mb-6">
  <label className="block text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
    <ImageIcon className="h-4 w-4" /> Aspect Ratio
  </label>
  <div className="flex flex-wrap gap-2">
    {ratios.map(ratio => (
      <button
        key={ratio.label}
        type="button"
        onClick={() => setSelectedRatio(ratio)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors border flex items-center gap-2",
          selectedRatio.label === ratio.label
            ? "bg-violet-600/20 border-violet-500 text-violet-300"
            : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
        )}
      >
        <span className="text-xs">{ratio.icon}</span> {ratio.label}
      </button>
    ))}
  </div>
</div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            disabled={!prompt.trim() || isGenerating}
            isLoading={isGenerating}
            className="w-full sm:w-auto shadow-lg shadow-violet-500/20 text-md px-10 gap-2"
          >
            {!isGenerating && <Sparkles className="h-5 w-5" />}
            {isGenerating ? "Imagining..." : "Generate Image"}
          </Button>
        </div>
      </form>
    </div>
  );
};
