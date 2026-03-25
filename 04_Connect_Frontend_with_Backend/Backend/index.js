import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())
const port = 8000;

app.get('/',(req,res)=>{
    res.json({name:"Suman",age:21})
})
app.post('/',(req,res)=>{2
    console.log(req.body);
    res.send({success:true})
})

app.listen(port,()=>{
    console.log("Server is started...");
})