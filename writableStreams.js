const {createReadStream,createWriteStream} = require('fs')
const readStream = createReadStream('./108 Emitting and Listening to Events.mp4')
const writeStream = createWriteStream('./copyFiles.mp4')
readStream.on('data',(chunk)=>{
    writeStream.write(chunk)
    process.stdout.write('chunk writen')
})
readStream.on('error',(err)=>{
    // writeStream.write(chunk)
    process.stdout.write('error',err,error.message)
})
readStream.on('close',()=>{
    // writeStream.write(chunk)
    process.stdout.write('process ended')
})