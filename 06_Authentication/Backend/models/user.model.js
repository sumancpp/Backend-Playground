import mongoose from "mongoose"; // Import mongoose library for MongoDB interaction

// Creating a schema (structure) for User collection
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,        // Data type is String
        required:true       // Field is mandatory
    },
    lastName:{
        type:String,        // Data type is String
        required:true       // Field is mandatory
    },
    userName:{
        type:String,        // Data type is String
        required:true,      // Field is mandatory
        unique:true         // Must be unique (no duplicates allowed)
    },
    email:{
        type:String,        // Data type is String
        required:true,      // Field is mandatory
        unique:true         // Must be unique (no duplicate emails)
    },
    password:{
        type:String,        // Data type is String
        required:true       // Field is mandatory
    },
    profileImage:{
        type:String,        // Data type is String (URL or path of image)
        required:false      // Optional field (not mandatory)
    }

},{timestamps:true}) // Automatically adds createdAt and updatedAt fields

// Creating a model from schema (represents 'users' collection in MongoDB)
const User = mongoose.model("User",userSchema)

// Exporting the User model to use in other files
export default User