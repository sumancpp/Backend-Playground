import http from 'http'

const port = 8000;

const server = http.createServer((req,res)=>{
      if(req.url == '/'){
        res.end("Welcome to the home page")
      }
      else if(req.url == '/about'){
        res.end("This is about page")
      }
      else if(req.url == '/contact'){
        res.end("This is contact page")
      }
      else{
        res.end("404 Not Found")
      }
})

server.listen(port,()=>{
    console.log("Server started...");
})