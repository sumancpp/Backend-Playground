import http, { request } from 'http'

const server = http.createServer((request,Response) => {
    Response.end("hello this is from server")
    //If you change somthing here then you have to start server again(npm run dev)
})
server.listen(8000,() => {
    console.log("Server started...");
});

