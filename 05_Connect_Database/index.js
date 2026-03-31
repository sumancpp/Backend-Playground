// ================= IMPORT MODULES =================
import express from 'express'
import mongoose from 'mongoose';
import User from './models/user.model.js';


// ================= INITIAL SETUP =================
const app = express()
const port = 8000;

const mongoURL="mongodb+srv://Learnmongodb:<password>@cluster0.ky5aapp.mongodb.net/SumanMaity?retryWrites=true&w=majority"


// ================= MIDDLEWARE =================
app.use(express.json())


// ================= DATABASE CONNECTION =================
const connectDb = async () => {
    try {
        await mongoose.connect(mongoURL)
        console.log("DB Connected");
        
    } catch (error) {
        console.log("Databse error", error);
        
    }
}


// ================= BASIC ROUTE =================
app.get('/',(req,res)=>{
    res.send("hello")
})


// ================= CREATE USER =================
app.post("/create", async (req,res)=>{
  try {

    let{name,age,email,userName} = req.body

  const newUser = await User.create({
        name,
        age,
        email,
        userName
    })

   return res.status(201).json({message:`User Created Successfully... ${newUser}`})
    
  } catch (error) {
    return res.status(404).json({message:error})
  }
})


// ================= READ ALL USERS =================
app.get("/read", async (req,res)=>{
  try {
    const users = await User.find();
    return res.status(200).json(users)

  } catch (error) {
    return res.status(404).json({message:"user not found"})
  }
})


// ================= READ USER BY USERNAME =================
app.get("/read/:userName", async (req,res)=>{
  try {
    const users = await User.findOne({userName:req.params.userName});
    return res.status(200).json(users)

  } catch (error) {
    return res.status(404).json({message:"user not found"})
  }
})


// ================= FIND WITH CONDITIONS =================
app.get("/find", async (req,res)=>{
  try {
    //const users = await User.find({ name: { $eq: "Suman" } });
    //const users = await User.find({ age: { $gt: 20 } });
    const users = await User.find({$and : [{age : {$gt : 20}}, {name : {$eq : "Suman"}}]});
    return res.status(200).json(users)

  } catch (error) {
    return res.status(404).json({message:"user not found"})
  }
})


// ================= UPDATE USER BY ID =================
app.put("/update/:id", async (req,res)=>{
  try {
    let {name,age} = req.body
    let id = req.params.id
    let user = await User.findByIdAndUpdate(id,{name,age},{new:true})
    return res.status(200).json(user)

  } catch (error) {
    return res.status(404).json({message:"user not found"})
  }

})


// ================= UPDATE USER BY EMAIL =================
app.put("/update", async (req,res)=>{
  try {
    let {name,age,email} = req.body

    let user = await User.updateOne({email},{name,age},{new:true})
    return res.status(200).json({message:"user updated..."})
    
  } catch (error) {
    return res.status(404).json({message:"user not found..."})
  }

})


// ================= DELETE USER BY ID =================
app.delete("/delete/:id", async (req,res)=>{
  try {
    let id = req.params.id
    let user = await User.findByIdAndDelete(id)
    return res.status(200).json(user)

  } catch (error) {
    return res.status(404).json({message:"user not found..."})
  }
})


// ================= DELETE USER BY USERNAME =================
app.delete("/delete", async (req,res)=>{
  try {
    let {userName} = req.body
    let user = await User.deleteOne({userName})
    return res.status(200).json(user)

  } catch (error) {
    return res.status(404).json({message:"user not found..."})
  }
})


// ================= START SERVER =================
app.listen(port,()=>{
   connectDb()
   console.log(`Server is started at port number ${port}`);
})
