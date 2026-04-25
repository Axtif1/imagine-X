import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    posts: [],
    post: null,
    postLoading: false,
    postSuccess: false,
    postError: false,
    postErrorMessage: ""
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Generate Post
        .addCase(GeneratePost.pending, (state) => {
            state.postLoading = true
            state.postSuccess = false
            state.postError = false
        })
        .addCase(GeneratePost.fulfilled, (state, action) => {
            state.postLoading = false
            state.postSuccess = true
            state.post = action.payload
            state.postError = false
        })
        .addCase(GeneratePost.rejected, (state, action) => {
            state.postLoading = false
            state.postSuccess = false
            state.postError = true
            state.postErrorMessage = action.payload
        })

        // Get Posts
        .addCase(getPosts.pending, (state) => {
            state.postLoading = true
            state.postSuccess = false
            state.postError = false
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.postLoading = false
            state.postSuccess = true
            state.posts = action.payload
            state.post = null
            state.postError = false
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.postLoading = false
            state.postSuccess = false
            state.postError = true
            state.postErrorMessage = action.payload
        })

        // Get Single Post
        .addCase(getPost.pending, (state) => {
            state.postLoading = true
            state.postSuccess = false
            state.postError = false
        })
        .addCase(getPost.fulfilled, (state, action) => {
            state.postLoading = false
            state.postSuccess = true
            state.post = action.payload
            state.postError = false
        })
        .addCase(getPost.rejected, (state, action) => {
            state.postLoading = false
            state.postSuccess = false
            state.postError = true
            state.postErrorMessage = action.payload
        })

        // Like / Unlike Post
        .addCase(likeUnlikePost.pending, (state) => {
            state.postError = false
        })
        .addCase(likeUnlikePost.fulfilled, (state, action) => {
            state.postSuccess = true
            // Update the post in the posts list if it's there
            state.posts = state.posts.map((p) =>
                p._id === action.payload._id ? action.payload : p
            )
            // Also update the single post view if it matches
            if (state.post && state.post._id === action.payload._id) {
                state.post = action.payload
            }
            state.postError = false
        })
        .addCase(likeUnlikePost.rejected, (state, action) => {
            state.postError = true
            state.postErrorMessage = action.payload
        })

        // Report Post
        .addCase(reportPost.pending, (state) => {
            state.postLoading = true
            state.postError = false
        })
        .addCase(reportPost.fulfilled, (state) => {
            state.postLoading = false
            state.postSuccess = true
            state.postError = false
        })
        .addCase(reportPost.rejected, (state, action) => {
            state.postLoading = false
            state.postError = true
            state.postErrorMessage = action.payload
        })
    }
})


export const {} = postSlice.actions

export default postSlice.reducer


// Generate Post 
export const GeneratePost = createAsyncThunk("POST/GENERATE", async ({ prompt, width, height }, thunkAPI) => {
  let token = thunkAPI.getState().auth.user.token
  try {
    return await postService.generateAndPostImage(prompt, token, width, height)
  } catch (error) {
    let message = error.response?.data?.message || "Failed to generate image"
    return thunkAPI.rejectWithValue(message)
  }
})

// Get Posts 
export const getPosts = createAsyncThunk("POSTS/GET", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.fetchPosts(token)
    } catch (error) {
        let message = error.response?.data?.message || "Failed to load posts"
        return thunkAPI.rejectWithValue(message)
    }
})


// Get Single Post 
export const getPost = createAsyncThunk("POST/GET", async (pid, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.fetchPost(pid, token)
    } catch (error) {
        let message = error.response?.data?.message || "Failed to load post"
        return thunkAPI.rejectWithValue(message)
    }
})

// Like / Unlike Post
export const likeUnlikePost = createAsyncThunk("POST/LIKE", async (pid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.likeUnlikePost(pid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to like/unlike post"
        return thunkAPI.rejectWithValue(message)
    }
})

// Report Post
export const reportPost = createAsyncThunk("POST/REPORT", async ({ pid, text }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.reportPost(pid, text, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to report post"
        return thunkAPI.rejectWithValue(message)
    }
})