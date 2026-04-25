import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/authSlice'
import profile from './profile/profileSlice'
import post from './post/postSlice'
import comment from './comment/commentSlice'
import saved from './saved/savedSlice'
import follow from './follow/followSlice'
import admin from './admin/adminSlice'

export const store = configureStore({
  reducer: { auth, profile, post, comment, saved, follow, admin },
})
