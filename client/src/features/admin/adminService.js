import axios from "axios"

const API_URL = "/api/admin"

// Get all users (admin)
const fetchAllUsers = async (token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.get(`${API_URL}/users`, options)
    return response.data
}

// Get all posts (admin)
const fetchAllPosts = async (token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.get(`${API_URL}/posts`, options)
    return response.data
}

// Get all reports (admin)
const fetchReports = async (token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.get(`${API_URL}/reports`, options)
    return response.data
}

// Toggle user active/block status
const toggleUserStatus = async (uid, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${API_URL}/user/${uid}`, {}, options)
    return response.data
}

// Update a post (admin)
const updateAdminPost = async (pid, data, token) => {
    const options = {
        headers: { authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${API_URL}/post/${pid}`, data, options)
    return response.data
}

// Delete a post (admin)
const deletePost = async (pid, token) => {
    const options = { headers: { authorization: `Bearer ${token}` } }
    const response = await axios.delete(`${API_URL}/post/${pid}`, options)
    return response.data
}

// Dismiss a report (admin)
const dismissReport = async (rid, token) => {
    const options = { headers: { authorization: `Bearer ${token}` } }
    const response = await axios.delete(`${API_URL}/report/${rid}`, options)
    return response.data
}

// Update a user (admin)
const updateUser = async (uid, data, token) => {
    const options = { headers: { authorization: `Bearer ${token}` } }
    const response = await axios.put(`${API_URL}/users/${uid}`, data, options)
    return response.data
}

// Delete a user (admin)
const deleteUser = async (uid, token) => {
    const options = { headers: { authorization: `Bearer ${token}` } }
    const response = await axios.delete(`${API_URL}/users/${uid}`, options)
    return response.data
}

// Update a report (admin)
const updateReport = async (rid, data, token) => {
    const options = { headers: { authorization: `Bearer ${token}` } }
    const response = await axios.put(`${API_URL}/reports/${rid}`, data, options)
    return response.data
}

// Fetch stats (admin)
const fetchStats = async (token) => {
    const options = { headers: { authorization: `Bearer ${token}` } }
    const response = await axios.get(`${API_URL}/stats`, options)
    return response.data
}

const adminService = {
    fetchAllUsers,
    fetchAllPosts,
    fetchReports,
    toggleUserStatus,
    updateAdminPost,
    deletePost,    
    dismissReport,
    updateUser,
    deleteUser,
    updateReport,
    fetchStats
}

export default adminService
