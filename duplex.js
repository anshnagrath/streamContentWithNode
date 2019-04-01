const {PassThrough,Duplex} = require("stream");
const {createReadStream,createWriteStream} = require("fs");
const readStream = createReadStream('./copyFiles.mp4');
const writeStream = createWriteStream('./copy4Files.mp4');
var total = 0;

class Throtle extends Duplex{
    constructor(time){
        super();
        this.time = time;
    }
    _read(){
        
    }
    _write(chunk){
        console.log(chunk,'chunk of data');
        setTimeout(()=>{
           this.push(chunk);
        },this.time);
    }
    _final(){
        this.push(null);
    }
}
const info = new PassThrough()
var throtle = new Throtle(10000)
info.on('data',(chunk)=>{
    total+=chunk.length
    console.log('read from the source:',total)
})
readStream.pipe(throtle).pipe(info).pipe(writeStream)