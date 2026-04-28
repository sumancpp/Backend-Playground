import uploadOnCloudinary from '../config/cloudinary.js'
import generateToken from '../config/token.js' // Function to generate JWT token
import User from '../models/user.model.js'     // User model (MongoDB collection)
import bcrypt from 'bcryptjs'                 // Library to hash passwords


// Controller function for user signup
export const signUp = async (req,res) => {
    try {
        // Destructuring user input from request body
        const {firstName,lastName,email,password,userName}=req.body

        // Check if any required field is missing
        if(!firstName|| !lastName || !email || !password || !userName){
             return res.status(400).json({message:"Send all details"})
        }

        let profileImage;
        if(req.file){
           profileImage = await uploadOnCloudinary(req.file.path)
        }
        

        // Check if user already exists with same email
        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }

        // Hash the password using bcrypt (salt rounds = 10)
        const hassedPassword = await bcrypt.hash(password,10)

        // Create new user in database with hashed password
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hassedPassword,
            userName,
            profileImage
        })

        let token;
        try {
            // Generate authentication token using user ID
            token = generateToken(user._id)
        } catch (error) {
            console.log(error); // Log error if token generation fails
        }
        
        // Send token in cookie with security options
        res.cookie("token",token,{
            httpOnly:true, // Prevents client-side JS from accessing cookie
            secure:process.env.NODE_ENVIRONMENT == "production", // HTTPS only in production
            sameSite:"strict", // Prevent CSRF attacks
            maxAge:7*24*60*60*1000 // Cookie valid for 7 days
        })

        // Send success response with user details (excluding password)
        return res.status(201).json({user:{
            firstName,
            lastName,
            email,
            userName,
            profileImage
        }})
        
    } catch (error) {
        // Handle unexpected server errors
        return res.status(500).json({message:"internal server error"})
    }
}


export const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        let existUser = await User.findOne({email})
        if(!existUser){
            return res.status(500).json({message:"User doesnot exist"})
        }

        let matchPassword = await bcrypt.compare(password,existUser.password)
        if(!matchPassword){
            return res.status(500).json({message:"Password is incorrect"})
        }

        let token;
        try {
            // Generate authentication token using user ID
            token = generateToken(existUser._id)
        } catch (error) {
            console.log(error); // Log error if token generation fails
        }
        
        // Send token in cookie with security options
        res.cookie("token",token,{
            httpOnly:true, // Prevents client-side JS from accessing cookie
            secure:process.env.NODE_ENVIRONMENT == "production", // HTTPS only in production
            sameSite:"strict", // Prevent CSRF attacks
            maxAge:7*24*60*60*1000 // Cookie valid for 7 days
        })

        return res.status(200).json({user:{
            firstName:existUser.firstName,
            lastName:existUser.lastName,
            email:existUser.email,
            userName:existUser.userName,
            profileImage:existUser.profileImage
        }})

        
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}





export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
       return res.status(200).json({message:"Logout succesfully"})
    } catch (error) {
         return res.status(500).json({message:"Logout error"})
    }
}

export const getUserData = async (req, res)=>{
    try {
        let userId = req.userId
        if(!userId){
             return res.status(400).json({message:"User ID is not found"})
        }
        let user = await User.findById(userId)
        if(!user){
             return res.status(400).json({message:"User not found"})
        }
         return res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
