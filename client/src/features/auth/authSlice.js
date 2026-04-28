import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"

const userExist = JSON.parse(localStorage.getItem('user'))


const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : userExist || null,
        profile : {} ,
        isLoading : false,
        isSuccess : false ,
        isError : false ,
        message : ""
    },
    reducers : {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    } ,
    extraReducers: (builder) => {         
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false

            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.message
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(loginUser.pending , (state) => {
                state.isLoading = true 
                state.isSuccess = false
                state.isError = false 
            })
            .addCase(loginUser.fulfilled, (state , action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isError = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = false
                state.message = ""
                state.user = null
            })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        }
})

export const { reset } = authSlice.actions
export default authSlice.reducer

//Register User

export const registerUser = createAsyncThunk("AUTH/REGISTER" , async(formData , thunkAPI) => {

    try {
        return await authService.register(formData)
    } catch (error) {
        console.log(error.response?.data?.message)
        let message = error.response?.data?.message || error.message
        return thunkAPI.rejectWithValue(message)
    }


})


// Login User

export const loginUser = createAsyncThunk("AUTH/LOGIN" , async(formData , thunkAPI) => {

    try {
        return await authService.login(formData)
    } catch (error) {
        console.log(error.response?.data?.message)
        let message = error.response?.data?.message || error.message
        return thunkAPI.rejectWithValue(message)
    }


})

// Logout User 
export const logoutUser = createAsyncThunk("AUTH/Logout" , async() => {
    localStorage.removeItem('user')
})

// Verify Email
export const verifyEmail = createAsyncThunk("AUTH/VERIFY_EMAIL", async (formData, thunkAPI) => {
    try {
        return await authService.verifyEmail(formData)
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

// Resend OTP
export const resendOtp = createAsyncThunk("AUTH/RESEND_OTP", async (formData, thunkAPI) => {
    try {
        return await authService.resendOtp(formData)
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

// Forgot Password
export const forgotPassword = createAsyncThunk("AUTH/FORGOT_PASSWORD", async (formData, thunkAPI) => {
    try {
        return await authService.forgotPassword(formData)
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

// Verify Reset OTP
export const verifyResetOtp = createAsyncThunk("AUTH/VERIFY_RESET_OTP", async (formData, thunkAPI) => {
    try {
        return await authService.verifyResetOtp(formData)
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

// Reset Password
export const resetPassword = createAsyncThunk("AUTH/RESET_PASSWORD", async (formData, thunkAPI) => {
    try {
        return await authService.resetPassword(formData)
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
