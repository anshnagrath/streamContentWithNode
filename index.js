//direct style syncronous
function hideString(str){
return str.replace(/[a-zA-Z]/g,'X')
}
var hidden = hideString('hello world')
console.log(hidden,'logging hidden')
console.log('end')
//contunation passing style cps
function hideStrings(str,done){
    done(str.replace(/[a-z/A-Z]/g,'X'))
}
hideStrings("Calback style",(hidden)=>{
    console.log(hidden,'xxxs')
})
console.log('end2')
//asyncronous code style contunation passing style cps
function hideStringz(str,done){
    process.nextTick(()=>{
        done(str.replace(/[a-zA-Z]/g,"XXX"))
    })
}
hideStringz("Hello World",(hiz)=>{
    console.log(hiz,'replaced async');
})
console.log('end3','i will run first')