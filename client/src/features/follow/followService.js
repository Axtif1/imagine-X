import axios from "axios"

const API_URL = "/api/user"

// Follow a user
const followUser = async (uid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${API_URL}/follow/${uid}`, {}, options)
    return response.data
}

// Unfollow a user
const unfollowUser = async (uid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${API_URL}/unfollow/${uid}`, {}, options)
    return response.data
}

const followService = { followUser, unfollowUser }

export default followService
