// Importing required modules
import express from 'express'           // Express framework for creating server
import dotenv from 'dotenv'             // To load environment variables from .env file
import connectDb from './config/db.js' // Function to connect to database
import authRouter from './routes/auth.routes.js' // Routes related to authentication
import cookieParser from 'cookie-parser' // Middleware to parse cookies from request
import cors from 'cors'

// Load environment variables into process.env
dotenv.config()

// Get port number from environment variables
let port = process.env.PORT

// Create express app instance
const app = express()

// Middleware to parse incoming JSON data (req.body)
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// Middleware to parse cookies from client requests
app.use(cookieParser())

// Use authRouter for all routes starting from '/'
app.use('/', authRouter)

// Start the server and listen on the specified port
app.listen(port, () => {
    connectDb() // Connect to database when server starts
    console.log(`Server is running... ${port}`); // Log server status
})