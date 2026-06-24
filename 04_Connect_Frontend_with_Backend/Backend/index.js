import express from 'express'
import cors from 'cors'

const app = express();

// app.use(cors({
//     origin:"http://localhost:5173"
// }))

app.use(express.json())

//let password = 'suman12'
const port = 8000;

// app.use((req,res,next)=>{
//     if(req.body.pass!=password){
//         res.send("password does not match")
//     }
//     next()
// })

app.get('/',(req,res)=>{
    //console.log(req.headers);
    //console.log(req.get('User-Agent'));
    res.set("x-username", "suman"); 
    res.removeHeader("x-powered-by")
    res.json({name:"Suman",age:21})
})


// app.post('/',(req,res)=>{
//     console.log(req.body);
//     res.send({success:true})
// })

app.post('/',(req,res)=>{
    console.log(req.body);
    //res.status(400).send({success:true})
})


app.listen(port,()=>{
    console.log("Server is started...");
})
