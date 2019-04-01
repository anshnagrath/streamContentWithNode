var fs= require('fs');
var http = require('http');
var {promisify} = require('util')
var file = './108 Emitting and Listening to Events.mp4'
// var fz = promisify(fs.readFile)
http.createServer((req,res)=>{
    fs.createReadStream(file,(err,data)=>{
        if(err){
           console.log(err)     
        }
        res.writeHeader(200,{"content-type":"video/mp4"})
        res.end(data)
    })
}).listen(3000,()=>{console.log('streaming')})