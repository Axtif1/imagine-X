import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import savedService from "./savedService"

const initialState = {
    savedPosts: [],
    savedLoading: false,
    savedSuccess: false,
    savedError: false,
    savedErrorMessage: ""
}

const savedSlice = createSlice({
    name: 'saved',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Saved Posts
            .addCase(fetchSavedPosts.pending, (state) => {
                state.savedLoading = true
                state.savedSuccess = false
                state.savedError = false
            })
            .addCase(fetchSavedPosts.fulfilled, (state, action) => {
                state.savedLoading = false
                state.savedSuccess = true
                state.savedPosts = action.payload
                state.savedError = false
            })
            .addCase(fetchSavedPosts.rejected, (state, action) => {
                state.savedLoading = false
                state.savedSuccess = false
                state.savedError = true
                state.savedErrorMessage = action.payload
            })

            // Save a Post
            .addCase(savePost.pending, (state) => {
                state.savedLoading = true
                state.savedError = false
            })
            .addCase(savePost.fulfilled, (state, action) => {
                state.savedLoading = false
                state.savedSuccess = true
                state.savedPosts.push(action.payload)
                state.savedError = false
            })
            .addCase(savePost.rejected, (state, action) => {
                state.savedLoading = false
                state.savedError = true
                state.savedErrorMessage = action.payload
            })

            // Remove a Saved Post
            .addCase(removeSavedPost.pending, (state) => {
                state.savedLoading = true
                state.savedError = false
            })
            .addCase(removeSavedPost.fulfilled, (state, action) => {
                state.savedLoading = false
                state.savedSuccess = true
                state.savedPosts = state.savedPosts.filter(
                    (s) => s._id !== action.payload._id
                )
                state.savedError = false
            })
            .addCase(removeSavedPost.rejected, (state, action) => {
                state.savedLoading = false
                state.savedError = true
                state.savedErrorMessage = action.payload
            })
    }
})

export default savedSlice.reducer

// Fetch Saved Posts
export const fetchSavedPosts = createAsyncThunk("SAVED/GET", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await savedService.getSavedPosts(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch saved posts"
        return thunkAPI.rejectWithValue(message)
    }
})

// Save Post
export const savePost = createAsyncThunk("SAVED/SAVE", async (pid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await savedService.savePost(pid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to save post"
        return thunkAPI.rejectWithValue(message)
    }
})

// Remove Saved Post
export const removeSavedPost = createAsyncThunk("SAVED/REMOVE", async (pid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await savedService.removeSavedPost(pid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to remove saved post"
        return thunkAPI.rejectWithValue(message)
    }
})
