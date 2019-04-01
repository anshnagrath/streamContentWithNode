const {createReadStream,createWriteStream} = require('fs')
const readStream=createReadStream('./copyFiles.mp4')
const writeStream = createWriteStream('./test2.mp4',{
  //  highWaterMark:1212323232 thiswill make the back pressure reduce but increase the memory size
})
readStream.on('data',(chunk)=>{
const result = writeStream.write(chunk);
      console.log(result)  
 if(!result){
        console.log('backPressure')
        //this will manage the backPressure or we can increase the housing size
        readStream.pause()
 }   
});
readStream.on('error',()=>{
console.error('errorOcuured')
})
readStream.on('end',()=>{
 writeStream.end()
})
writeStream.on('drain',()=>{
console.log('drained')
readStream.resume();
})
//same thing using pipe this will also handle backPressure
readStream.pipe(writeStream)