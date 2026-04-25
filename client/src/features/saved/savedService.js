import axios from "axios"

const API_URL = "/api/saved-posts"
const POSTS_URL = "/api/posts"

// Get all saved posts for the current user
const getSavedPosts = async (token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.get(API_URL, options)
    return response.data
}

// Save a post
const savePost = async (pid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.post(`${POSTS_URL}/${pid}/save`, {}, options)
    return response.data
}

// Remove a saved post
const removeSavedPost = async (pid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.delete(`${API_URL}/${pid}`, options)
    return response.data
}

const savedService = { getSavedPosts, savePost, removeSavedPost }

export default savedService
