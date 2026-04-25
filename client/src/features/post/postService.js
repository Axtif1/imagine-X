import axios from "axios"

const API_URL = "/api/posts"


const generateAndPostImage = async (prompt, token, width = "1024", height = "1024") => {
    
    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    
     const response = await axios.post(API_URL, { prompt, width, height }, options)
     return response.data
}

const fetchPosts = async (token) => {
    
    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, options)
    return response.data
}


const fetchPost = async (pid, token) => {
    
    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/" + pid, options)
    return response.data
}


// Like or Unlike a post
const likeUnlikePost = async (pid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${API_URL}/${pid}/like`, {}, options)
    return response.data
}



// Report a post
const reportPost = async (pid, text, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.post(`${API_URL}/${pid}`, { text }, options)
    return response.data
}


const postService = { generateAndPostImage, fetchPosts, fetchPost, likeUnlikePost, reportPost }

export default postService