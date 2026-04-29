import axios from "axios"

const API_URL = "/api/profile"



const fetchProfile = async(username) =>{
    const response = await axios.get('/api/profile/' + username)
    return response.data
}

const fetchSuggestedUsers = async (token) => {
    const options = { headers: { authorization: `Bearer ${token}` } }
    const response = await axios.get(`${API_URL}/suggested`, options)
    return response.data
}


const profileService = { fetchProfile  , fetchSuggestedUsers}

export default profileService