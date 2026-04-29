import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import profileService from "./profileService"

const initialState = {
    profile : null ,
    suggestedUsers: [],
    profileLoading : false,
    profileSuccess : false,
    profileError : false,
    profileErrorMessage : ""

}


const profileSlice = createSlice({
    name : 'profile',
    initialState ,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getProfile.pending , (state , action) => {
                state.profileLoading = true 
                state.profileSuccess = false
                state.profileError = false 
            })
            .addCase(getProfile.fulfilled, (state , action) => {
                state.profileLoading = false
                state.profileSuccess = true
                state.profile = action.payload
                state.profileError = false
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.profileLoading = false
                state.profileSuccess = false
                state.profileError = true
                state.profileErrorMessage = action.payload
            })
            .addCase(getSuggestedUsers.pending, (state) => {
                state.profileLoading = true
            })
            .addCase(getSuggestedUsers.fulfilled, (state, action) => {
                state.profileLoading = false
                state.suggestedUsers = action.payload
            })
            .addCase(getSuggestedUsers.rejected, (state, action) => {
                state.profileLoading = false
                state.profileError = true
                state.profileErrorMessage = action.payload
            })

    }
})

export const { } = profileSlice.actions

export default profileSlice.reducer


// Get Profile 

export const getProfile = createAsyncThunk("GET/PROFILE" , async (name , thunkAPI) => {
    try {
        return await profileService.fetchProfile(name)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getSuggestedUsers = createAsyncThunk("GET/SUGGESTED_USERS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await profileService.fetchSuggestedUsers(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch suggested users"
        return thunkAPI.rejectWithValue(message)
    }
})