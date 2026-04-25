import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import followService from "./followService"

const initialState = {
    followLoading: false,
    followSuccess: false,
    followError: false,
    followErrorMessage: ""
}

const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Follow User
            .addCase(followUser.pending, (state) => {
                state.followLoading = true
                state.followSuccess = false
                state.followError = false
            })
            .addCase(followUser.fulfilled, (state) => {
                state.followLoading = false
                state.followSuccess = true
                state.followError = false
            })
            .addCase(followUser.rejected, (state, action) => {
                state.followLoading = false
                state.followSuccess = false
                state.followError = true
                state.followErrorMessage = action.payload
            })

            // Unfollow User
            .addCase(unfollowUser.pending, (state) => {
                state.followLoading = true
                state.followSuccess = false
                state.followError = false
            })
            .addCase(unfollowUser.fulfilled, (state) => {
                state.followLoading = false
                state.followSuccess = true
                state.followError = false
            })
            .addCase(unfollowUser.rejected, (state, action) => {
                state.followLoading = false
                state.followSuccess = false
                state.followError = true
                state.followErrorMessage = action.payload
            })
    }
})

export default followSlice.reducer

// Follow User
export const followUser = createAsyncThunk("FOLLOW/USER", async (uid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await followService.followUser(uid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to follow user"
        return thunkAPI.rejectWithValue(message)
    }
})

// Unfollow User
export const unfollowUser = createAsyncThunk("UNFOLLOW/USER", async (uid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await followService.unfollowUser(uid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to unfollow user"
        return thunkAPI.rejectWithValue(message)
    }
})
