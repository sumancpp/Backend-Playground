import jwt from 'jsonwebtoken' // Import jsonwebtoken library for creating JWT

// Function to generate JWT token
const generateToken = (id) => {
    // Create a token with payload { id }, secret key, and expiration time
    let token = jwt.sign(
        { id },                      // Payload (data stored inside token)
        process.env.JWT_SECRET,      // Secret key from environment variables
        { expiresIn: "7d" }          // Token validity (7 days)
    )
    return token // Return generated token
}

// Export the function to use in other files
export default generateToken