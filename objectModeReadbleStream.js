const {Readable} = require('stream');
const array =[
    "This is",
    "a large",
    "chunk",
    "of data",
    "that we want to pass",
    "in an request",
    "into chunks"
]

class StreamArray extends Readable{
    constructor(array){
        super({objectMode:true})// {objectMode:true} is to give the output as js objects
        console.log(this,'logging this')
        this.array = array
        this.index = 0

    }
_read(){
    if(this.index <= this.array.length){
    //making chunk as an object    
    const chunk = {
        data:this.array[this.index],
        index:this.index
    }

    this.push(chunk)
    this.index+=1
    }else{
    this.push(null)   
    }
    }


}
const streaming = new StreamArray(array)
streaming.on('data',(chunk)=>{
    console.log(chunk)
})

streaming.on('err',(err)=>{
    console.error(err)
})
streaming.on('end',()=>{
    console.error('THE END')
})