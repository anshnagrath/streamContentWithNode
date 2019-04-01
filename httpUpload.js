const {createServer} = require('http')
const multiparty = require('multiparty')
const {stat,createReadStream,createWriteStream} = require('fs')
const {promisify}=require('util')
const stats = promisify(stat)
const file = './108 Emitting and Listening to Events.mp4'
const streamVideos =async (req,res)=>{
    const {size} = await stats(file);
    const range = req.headers.range;
    console.log(range)
    if(range){
        let [start,end] = range.replace(/bytes=/,'').split('-')
        start=parseInt(start,10)
        end= end?parseInt(end):size-1;
        console.log(start,end,size,'asxasx')
        res.writeHead(206,{
            'Content-Range':`bytes ${start}-${end}/${size}`, // to tell the start point end point and the size of the file
            'Accept-Ranges':'bytes', //to tell browswe that we are handling sizes in bytes
            'Content-Length':(end-start)+1, //to tell browser length of each chunk
            'Content-Type':'video/mp4' //to tell browser about the content-type
        })
        createReadStream(file,{start,end}).pipe(res)
    
    }else{
    res.writeHead(200,{
         'Content-length' : size,
        'Content-type':'video/mp4'
    })
    createReadStream(file).pipe(res)
}
}
createServer((req,res)=>{
if(req.method == 'POST'){
  let form= new multiparty.Form()
  let fileext;
  form.on('part',(part)=>{
    console.log(part)
   
    part.pipe(createWriteStream(`./${part.filename}`)).on('close',()=>{
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(`<h1>File uploaded:${part.filename}</h2>`)
    })
  })
  form.parse(req);
    // console.log(req.file,req.getParameter('upload'),'body')
    // let ext = req.Form.upload.split('.')[1] 
    // req.pipe(res)
    // req.pipe(process.stdout)
    // req.pipe(createWriteStream(`upload`))

    }
else if(req.url == '/video'){
    streamVideos(req,res)
}else {
    res.writeHead(200,{'content-type':'text/html'})
    res.end(`<form method="POST" action="/" enctype="multipart/form-data">
  <input type="file" name="upload"/>
  <button>Upload</button>
    </form>
    `)
}
}).listen('3000',()=>console.log('server running'))