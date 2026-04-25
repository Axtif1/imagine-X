import React, { useEffect, useState } from 'react'
import { PromptInput } from '../components/PromptInput'
import { GeneratedImage } from '../components/GeneratedImage'
import { useDispatch, useSelector } from 'react-redux'
import { GeneratePost } from '../features/post/postSlice';
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GeneratePage = () => {

  const {post ,postLoading , postSuccess , postError , postErrorMessage} = useSelector(state => state.post)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [generationState, setGenerationState] = useState({
    isGenerating: false,
  });


  const handleGenerate = ({ prompt, style, ratio }) => {
  setGenerationState({ isGenerating: true })
  const [width, height] = ratio.split("x")  
  dispatch(GeneratePost({ prompt: `${prompt}, with this style ${style}`, width, height }))
}

  useEffect(() => {

    if(postSuccess && post) {
      navigate("/feed")
    }

    if(postError && postErrorMessage) {
      toast.error(postErrorMessage , { position : "top-center" , theme : "dark"})
    }

  }, [postError , postErrorMessage , postSuccess , post])

  // if (postLoading) {
  //   return <Loader/>
  // }


  const handlePost = (imageUrl) => {
    console.log("Posting image to feed:", imageUrl);
    // TODO: implement logic to add to mockPosts
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10">
          <div className="max-w-[1200px] mx-auto animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-white mb-2">Create an Image</h1>
            <p className="text-zinc-400 mb-8">Turn your words into reality using state-of-the-art AI.</p>
            
            <PromptInput 
              onGenerate={handleGenerate} 
              isGenerating={generationState.isGenerating} 
            />

            {(generationState.isGenerating) && (
              <div className="mt-12 w-full pt-12 border-t border-zinc-800/50">
                <GeneratedImage 
                  isGenerating={generationState.isGenerating}
                  imageUrl={generationState.result?.imageUrl}
                  prompt={generationState.result?.prompt}
                  style={generationState.result?.style}
                  onPost={handlePost}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
