import axios from 'axios'

const API_URL = "/api/auth"

const register = async (formData) => {
    const response = await axios.post(API_URL + "/register" , formData)
    // Removed setting token directly on register as it now needs verification
    return response.data
}

const login = async (formData) => {
    const response = await axios.post(API_URL + "/login" , formData)
    if(response.data.token) {
        localStorage.setItem('user' , JSON.stringify(response.data))
    }
    return response.data
}

const verifyEmail = async (formData) => {
    const response = await axios.post(API_URL + "/verify-email", formData)
    return response.data
}

const resendOtp = async (formData) => {
    const response = await axios.post(API_URL + "/resend-otp", formData)
    return response.data
}

const forgotPassword = async (formData) => {
    const response = await axios.post(API_URL + "/forgot-password", formData)
    return response.data
}

const verifyResetOtp = async (formData) => {
    const response = await axios.post(API_URL + "/verify-reset-otp", formData)
    return response.data
}

const resetPassword = async (formData) => {
    const response = await axios.post(API_URL + "/reset-password", formData)
    return response.data
}

const authService = { 
    register, 
    login,
    verifyEmail,
    resendOtp,
    forgotPassword,
    verifyResetOtp,
    resetPassword
}

export default authService