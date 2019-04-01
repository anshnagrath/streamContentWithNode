const fs = require("fs");

const readStream = fs.createReadStream('./108 Emitting and Listening to Events.mp4');
// console.log(readStream,'readStream')
readStream.on('data',(chunk)=>{
    console.log(chunk.length)
})
readStream.on('error',(err)=>{
console.error(err,err.message,'sdcs')
})
readStream.on('end',()=>{
    console.log("streaming done")
})
readStream.pause();
process.stdin.on('data',(chunk)=>{
    if(chunk.toString().trim() == 'finish'){
        readStream.resume()
    }else{
        readStream.read()
    }
})
