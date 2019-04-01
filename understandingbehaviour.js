var  { promisify } = require("util")
var fs = require('fs')
fs.writeFile('inde.txt','this is a test',()=>{
    console.log("this is old school")
})
var promisFyyyway = promisify(fs.writeFile);
promisFyyyway('test.txt','this is just to remove callbacks').then(()=>{
    console.log("made it a promise")
})
process.stdout.write("\x07")