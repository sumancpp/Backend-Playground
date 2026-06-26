import express from 'express'
const app = express()
const port = 8000;

//app.use(express.json())//Transfer the data into json form


//syntax==> app.[http method]("route",callback)
// app.get('/',(req,res)=>{
//     res.send("<h1>Hello World</h1>")
// })
// app.get('/json',(req,res)=>{
//     res.json({name:"Suman Maity", age:21})
// })
// app.get('/about',(req,res)=>{
//     res.send("About Page")
// })
// app.get('/contact',(req,res)=>{
//     res.send("Contact Page")
// })
// app.get('/contact/mail',(req,res)=>{
//     res.send("Send mail to the customer")
// })
// app.post('/post',(req,res)=>{
//     let body = req.body//This way data goes but server don't know in which form
//     console.log(body);
//     res.send("This is post")
// })



/**********req.param***********/
let users =  [
    {
      "id": 1,
      "name": "Rahul Sharma",
      "position": "Software Engineer",
      "department": "IT",
      "salary": 60000
    },
    {
      "id": 2,
      "name": "Priya Singh",
      "position": "UI/UX Designer",
      "department": "Design",
      "salary": 55000
    },
    {
      "id": 3,
      "name": "Amit Verma",
      "position": "Backend Developer",
      "department": "IT",
      "salary": 65000
    },
    {
      "id": 4,
      "name": "Sneha Das",
      "position": "HR Manager",
      "department": "Human Resources",
      "salary": 50000
    },
    {
      "id": 5,
      "name": "Arjun Patel",
      "position": "Data Analyst",
      "department": "Analytics",
      "salary": 62000
    }
  ]

app.get('/user',(req,res)=>{
    const id = parseInt(req.params.id)
    res.json(users)
})

//  /id => means normal route.
//  /:id => means id is a variable now

app.get('/user/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    //console.log(id);

    let existUser = users.find((user)=>(user.id===id))

    if(!existUser){
        return res.send("404 Not Found")
    }
    
    res.json(existUser)
})

app.get('/search',(req,res)=>{
    let query = (req.query);// In browser => http://localhost:8000/search?name=suman and http://localhost:8000/search?name=suman&age=21
    
    res.json(query)
})

app.listen(port,()=>{
    console.log(`Server is started at ${port}`);
})
