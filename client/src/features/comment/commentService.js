import axios from "axios"

const API_URL = "/api/posts"

// Get all comments for a post
const getComments = async (pid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.get(`${API_URL}/${pid}/comments`, options)
    return response.data
}

// Add a comment to a post
const addComment = async (pid, text, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.post(`${API_URL}/${pid}/comments`, { text }, options)
    return response.data
}

// Delete a comment from a post
const removeComment = async (pid, cid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.delete(`${API_URL}/${pid}/comments/${cid}`, options)
    return response.data
}

const commentService = { getComments, addComment, removeComment }

export default commentService
