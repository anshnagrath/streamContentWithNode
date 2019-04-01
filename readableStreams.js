var {Readable} = require("stream");
const peaks = [
    "Tallac",
    "ralston",
    "Twin Peaks",
    "Castel Peak",
    "Rose",
    "Freel Peak"
];
class StreamFromArray extends Readable{
    constructor(array=[]){
        super({encoding:'UTF-8'})
        this.array = array
        this.index = 0
    }
    _read(){
    if(this.index<= this.array.length){
    const chunk = this.array[this.index]
    this.push(chunk)
    this.index +=1;
    }else{
    this.push(null)
}
    }
}
const peakStream = new StreamFromArray(peaks)
peakStream.on('data',(chunk)=>{
    console.log(chunk)
})
peakStream.on('err',(err)=>{
    console.error(err)
})
peakStream.on('end',()=>{
    console.log('done!')
})