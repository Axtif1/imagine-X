import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import commentService from "./commentService"

const initialState = {
    comments: [],
    commentLoading: false,
    commentSuccess: false,
    commentError: false,
    commentErrorMessage: ""
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Comments
            .addCase(fetchComments.pending, (state) => {
                state.commentLoading = true
                state.commentSuccess = false
                state.commentError = false
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.commentLoading = false
                state.commentSuccess = true
                state.comments = action.payload
                state.commentError = false
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.commentLoading = false
                state.commentSuccess = false
                state.commentError = true
                state.commentErrorMessage = action.payload
            })

            // Add Comment
            .addCase(addComment.pending, (state) => {
                state.commentLoading = true
                state.commentError = false
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.commentLoading = false
                state.commentSuccess = true
                state.comments.push(action.payload)
                state.commentError = false
            })
            .addCase(addComment.rejected, (state, action) => {
                state.commentLoading = false
                state.commentError = true
                state.commentErrorMessage = action.payload
            })

            // Delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.commentLoading = true
                state.commentError = false
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.commentLoading = false
                state.commentSuccess = true
                state.comments = state.comments.filter(
                    (c) => c._id !== action.payload._id
                )
                state.commentError = false
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.commentLoading = false
                state.commentError = true
                state.commentErrorMessage = action.payload
            })
    }
})

export default commentSlice.reducer

// Fetch Comments
export const fetchComments = createAsyncThunk("COMMENT/GET", async (pid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await commentService.getComments(pid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to load comments"
        return thunkAPI.rejectWithValue(message)
    }
})

// Add Comment
export const addComment = createAsyncThunk("COMMENT/ADD", async ({ pid, text }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await commentService.addComment(pid, text, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to add comment"
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Comment
export const deleteComment = createAsyncThunk("COMMENT/DELETE", async ({ pid, cid }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await commentService.removeComment(pid, cid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete comment"
        return thunkAPI.rejectWithValue(message)
    }
})
