import User from "../models/userModel.js"

const followUserRequest = async (req , res) => {
    // // Kon Follow Karna Chahta hai Uski Id
    // console.log(req.user._id)

    // //Jise Follow Krna hai uski Id 
    // console.log(req.params.uid)


    let targetUser = await User.findById(req.params.uid) // Jisko follow krna hai  
    let currentUser = await User.findById(req.user._id) // jo follow karega 

    //Check If Both Users Exists
    if(!targetUser || !currentUser){
        res.status(404)
        throw new Error('User Not Found!!')

    }

    //Check if already followed
    if(targetUser.followers.includes(currentUser._id)){
        res.status(409)
        throw new Error("Already Followed")
    }



    // Add follower 
    targetUser.followers.push(currentUser._id)
    await targetUser.save()



    // Add following 
    currentUser.followings.push(targetUser._id)
    await currentUser.save()


    res.status(200).json(targetUser).select("-password")

}


const unfollowUserRequest = async (req , res) => {

    let targetUser = await User.findById(req.params.uid) // Jisko follow krna hai  
    let currentUser = await User.findById(req.user._id) // jo follow karega 

    //Check If Both Users Exists
    if(!targetUser || !currentUser){
        res.status(404)
        throw new Error('User Not Found!!')

    }

    //Check if already unfollowed
    if(!targetUser.followers.includes(currentUser._id)){
        res.status(409)
        throw new Error("Already unFollowed")
    }



    // Remove follower 
    let updatedFollowerList = targetUser.followers.filter(follower => follower.toString() !== currentUser._id.toString())
    targetUser.followers = updatedFollowerList
    await targetUser.save()



    // Remove following 
    let updatedFollowingList = currentUser.followings.filter(follower => follower.toString() !== targetUser._id.toString())
    currentUser.followings = updatedFollowingList
    await currentUser.save()


    res.status(200).json(targetUser).select("-password")

}



const followController = {followUserRequest , unfollowUserRequest}

export default followController