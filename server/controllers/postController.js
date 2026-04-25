import { uploadBufferToCloudinary } from "../middleware/cloudinaryMiddleware.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Report from "../models/reportModel.js"

const generateAndPost = async (req, res) => {

  const userId = req.user.id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404)
    throw new Error("User Not Found")
  }

  if (user.credits < 1) {
    res.status(409)
    throw new Error("Not Enough Credits!")
  }

  const { prompt, width = "1024", height = "1024" } = req.body
  if (!prompt) {
    res.status(409)
    throw new Error("Kindly Provide Prompt To Generate Image")
  }
  // Build Pollinations URL — no API key needed
  const encodedPrompt = encodeURIComponent(prompt)
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=flux&nologo=true&seed=${Date.now()}`

  // Fetch image from Pollinations
  const imageResponse = await fetch(pollinationsUrl)
  if (!imageResponse.ok) {
    res.status(502)
    throw new Error("Failed to generate image from Pollinations")
  }

  // Convert to buffer and upload directly to Cloudinary
  const arrayBuffer = await imageResponse.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const imageLink = await uploadBufferToCloudinary(buffer)
  console.log("Cloudinary result:", imageLink)

  const newPost = new Post({
    user: userId,
    imageLink: imageLink.secure_url,
    prompt: prompt
  })
  console.log("New post object:", newPost)

  await newPost.save()
  console.log("Post saved successfully")
  await newPost.populate('user')

  await User.findByIdAndUpdate(userId, { credits: user.credits - 1 }, { new: true })

  res.status(201).json(newPost)
}

const getPosts = async (req, res) => {
  const posts = await Post.find().populate('user')

  if (!posts) {
    res.status(404)
    throw new Error("Posts Not Found")
  }

  res.status(201).json(posts)

}


const getPost = async (req, res) => {
  const post = await Post.findById(req.params.pid).populate('user')

  if (!post) {
    res.status(404)
    throw new Error("Posts Not Found")
  }

  res.status(201).json(post)

}


const likeAndUnlikePost = async (req, res) => {

  let currentUser = await User.findById(req.user._id)


  //Check if user exists
  if (!currentUser) {
    res.status(404)
    throw new Error('User Not Found')
  }


  //Check If Post Exist
  const post = await Post.findById(req.params.pid).populate('user')

  if (!post) {
    res.status(404)
    throw new Error("Posts Not Found")
  }


  // Check if already liked
  if (post.likes.includes(currentUser._id)) {
    // Dislike
    // Remove Follower from likes
    let updatedLikesList = post.likes.filter(like => like.toString() !== currentUser._id.toString())
    post.likes = updatedLikesList
    await post.save()
  } else {
    // Like
    // Add Follower in Liked
    post.likes.push(currentUser._id)
    await post.save()
  }

  // Populate after save using the Post model directly
  await Post.populate(post, { path: 'likes' })

  res.status(200).json(post)



}


const reportPost = async (req, res) => {


  const { text } = req.body
  const postId = req.params.pid
  const userId = req.user._id

  if (!text) {
    res.status(409)
    throw new Error("Please Enter Text")
  }


  const newReport = new Report({
    user: userId,
    post: postId,
    text: text,
  })

  await newReport.save()
  await newReport.populate('user')
  await newReport.populate('post')

  if (!newReport) {
    res.status(409)
    throw new Error("Unable To Reports This Post")
  }

  res.status(200).json(newReport)

}




const postController = { generateAndPost, getPosts, getPost, likeAndUnlikePost, reportPost }



export default postController


