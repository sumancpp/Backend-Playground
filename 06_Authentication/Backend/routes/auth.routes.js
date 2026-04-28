import express, { Router } from 'express' // Import express and Router
import { getUserData, login, logout, signUp } from '../controller/auth.controller.js' // Import signup controller function
import { upload } from '../middlewars/multer.js'
import { checkAuth } from '../middlewars/checkAuth.js'

// Create a router instance (used to handle routes separately)
const authRouter = Router() 
// Define POST route for user signup
authRouter.post('/signup',upload.single("profileImage"), signUp)

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/getuserdata',checkAuth,getUserData)

// Export router to use in main server file
export default authRouter