import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import adminService from "./adminService"

const initialState = {
    users: [],
    posts: [],
    reports: [],
    stats: null,
    adminLoading: false,
    adminSuccess: false,
    adminError: false,
    adminErrorMessage: ""
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Users
            .addCase(getAllUsers.pending, (state) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.users = action.payload
                state.adminError = false
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Get All Posts
            .addCase(getAllPosts.pending, (state) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.posts = action.payload
                state.adminError = false
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Get Reports
            .addCase(getReports.pending, (state) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.reports = action.payload
                state.adminError = false
            })
            .addCase(getReports.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Toggle User Status (block/unblock)
            .addCase(toggleUserStatus.pending, (state) => {
                state.adminLoading = true
                state.adminError = false
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                // Update the user in the list with new status
                state.users = state.users.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                )
                state.adminError = false
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.adminLoading = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Update Admin Post
            .addCase(updateAdminPost.pending, (state) => {
                state.adminLoading = true
                state.adminError = false
            })
            .addCase(updateAdminPost.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.posts = state.posts.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                )
                state.adminError = false
            })
            .addCase(updateAdminPost.rejected, (state, action) => {
                state.adminLoading = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })
            .addCase(deleteAdminPost.fulfilled, (state, action) => {
    state.adminLoading = false
    state.posts = state.posts.filter(p => p._id !== action.payload)
    // ✅ Report bhi hatao jiska post delete hua
    state.reports = state.reports.filter(r => r.post?._id !== action.payload)
})
.addCase(deleteAdminPost.rejected, (state, action) => {
    state.adminLoading = false
    state.adminError = true
    state.adminErrorMessage = action.payload
})

// Dismiss Report
.addCase(dismissReport.fulfilled, (state, action) => {
    state.adminLoading = false
    state.reports = state.reports.filter(r => r._id !== action.payload)
})
.addCase(dismissReport.rejected, (state, action) => {
    state.adminLoading = false
    state.adminError = true
    state.adminErrorMessage = action.payload
})

// Update User
.addCase(updateUser.pending, (state) => {
    state.adminLoading = true
    state.adminError = false
})
.addCase(updateUser.fulfilled, (state, action) => {
    state.adminLoading = false
    state.adminSuccess = true
    state.users = state.users.map((u) => u._id === action.payload._id ? action.payload : u)
    state.adminError = false
})
.addCase(updateUser.rejected, (state, action) => {
    state.adminLoading = false
    state.adminError = true
    state.adminErrorMessage = action.payload
})

// Delete User
.addCase(deleteUser.fulfilled, (state, action) => {
    state.adminLoading = false
    state.users = state.users.filter((u) => u._id !== action.payload)
    state.adminError = false
})
.addCase(deleteUser.rejected, (state, action) => {
    state.adminLoading = false
    state.adminError = true
    state.adminErrorMessage = action.payload
})

// Update Report
.addCase(updateReport.pending, (state) => {
    state.adminLoading = true
    state.adminError = false
})
.addCase(updateReport.fulfilled, (state, action) => {
    state.adminLoading = false
    state.adminSuccess = true
    state.reports = state.reports.map((r) => r._id === action.payload._id ? action.payload : r)
    state.adminError = false
})
.addCase(updateReport.rejected, (state, action) => {
    state.adminLoading = false
    state.adminError = true
    state.adminErrorMessage = action.payload
})

// Fetch Stats
.addCase(fetchStats.pending, (state) => {
    state.adminLoading = true
    state.adminError = false
})
.addCase(fetchStats.fulfilled, (state, action) => {
    state.adminLoading = false
    state.adminSuccess = true
    state.stats = action.payload
    state.adminError = false
})
.addCase(fetchStats.rejected, (state, action) => {
    state.adminLoading = false
    state.adminError = true
    state.adminErrorMessage = action.payload
})
    }
})

export default adminSlice.reducer

// Get All Users
export const getAllUsers = createAsyncThunk("ADMIN/GET_USERS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.fetchAllUsers(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch users"
        return thunkAPI.rejectWithValue(message)
    }
})

// Get All Posts
export const getAllPosts = createAsyncThunk("ADMIN/GET_POSTS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.fetchAllPosts(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch posts"
        return thunkAPI.rejectWithValue(message)
    }
})

// Get Reports
export const getReports = createAsyncThunk("ADMIN/GET_REPORTS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.fetchReports(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch reports"
        return thunkAPI.rejectWithValue(message)
    }
})

// Toggle User Active Status
export const toggleUserStatus = createAsyncThunk("ADMIN/TOGGLE_USER", async (uid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.toggleUserStatus(uid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update user"
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Admin Post
export const updateAdminPost = createAsyncThunk("ADMIN/UPDATE_POST", async ({ pid, data }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.updateAdminPost(pid, data, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update post"
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Post
export const deleteAdminPost = createAsyncThunk("ADMIN/DELETE_POST", async (pid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        await adminService.deletePost(pid, token)
        return pid // ← deleted post ki id return karo
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete post"
        return thunkAPI.rejectWithValue(message)
    }
})

// Dismiss Report
export const dismissReport = createAsyncThunk("ADMIN/DISMISS_REPORT", async (rid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        await adminService.dismissReport(rid, token)
        return rid // ← dismissed report ki id return karo
    } catch (error) {
        const message = error.response?.data?.message || "Failed to dismiss report"
        return thunkAPI.rejectWithValue(message)
    }
})

// Update User
export const updateUser = createAsyncThunk("ADMIN/UPDATE_USER", async ({ uid, data }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.updateUser(uid, data, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update user"
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete User
export const deleteUser = createAsyncThunk("ADMIN/DELETE_USER", async (uid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        await adminService.deleteUser(uid, token)
        return uid
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete user"
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Report
export const updateReport = createAsyncThunk("ADMIN/UPDATE_REPORT", async ({ rid, data }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.updateReport(rid, data, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update report"
        return thunkAPI.rejectWithValue(message)
    }
})

// Fetch Stats
export const fetchStats = createAsyncThunk("ADMIN/FETCH_STATS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.fetchStats(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch stats"
        return thunkAPI.rejectWithValue(message)
    }
})