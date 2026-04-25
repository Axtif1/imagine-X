import axios from "axios"

const API_URL = "/api/profile"



const fetchProfile = async(username) =>{
    const response = await axios.get('/api/profile/' + username)
    return response.data
}


const profileService = { fetchProfile }

export default profileService