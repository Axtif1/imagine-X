import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import Report from "../models/reportModel.js"

const getAllUsers = async (req , res) => {
    
    const users = await User.find()

    if(!users){
        res.status(404)
        throw new Error("Users Not Found!!")
    }

    res.status(201).json(users)

}


const getAllPosts = async (req , res) => {
    const posts = await Post.find().populate('user', 'name email')

    if(!posts){
        res.status(404)
        throw new Error("Posts Not Found")
    }

    res.status(200).json(posts)
}


const updatePost = async (req , res) => {
     let postId = req.params.pid 

    const post = await Post.findById(postId)

    if(!post){
        res.status(404)
        throw new Error('Post Not Found')
    }

    let updatedPost = await Post.findByIdAndUpdate(postId , req.body , {new : true} )


    if(!updatedPost){
        res.status(404)
        throw new Error('Post Not Updated')
    }

    res.status(200).json(updatedPost)
}


const getReports = async (req , res) => {
    
    // ✅ user aur post dono populate karo
    const reports = await Report.find()
        .populate('user', 'name email')
        .populate('post', 'imageLink prompt')

    if(!reports){
        res.status(404)
        throw new Error("Reports Not Found")
    }

    res.status(200).json(reports)
}


const updateUser = async (req , res) => {
    

    let userId = req.params.uid 

    const user = await User.findById(userId)

    if(!user){
        res.status(404)
        throw new Error('User Not Found')
    }

    let updatedUser = await User.findByIdAndUpdate(
        userId,
        { isActive: !user.isActive },  // ✅ cleaner toggle
        { new: true }
    )


    if(!updatedUser){
        res.status(404)
        throw new Error('User Not Updated')
    }

    res.status(200).json(updatedUser)
}

const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.pid)
    if (!post) {
        res.status(404)
        throw new Error("Post Not Found")
    }
    await Post.findByIdAndDelete(req.params.pid)
    res.status(200).json({ _id: req.params.pid, message: "Post Deleted" })
}

const dismissReport = async (req, res) => {
    const report = await Report.findById(req.params.rid)
    if (!report) {
        res.status(404)
        throw new Error("Report Not Found")
    }
    await Report.findByIdAndDelete(req.params.rid)
    res.status(200).json({ _id: req.params.rid, message: "Report Dismissed" })
}




const adminController = {getAllUsers , getAllPosts , updatePost , getReports , updateUser , deletePost , dismissReport }


export default adminController