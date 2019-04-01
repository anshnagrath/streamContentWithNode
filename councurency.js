var logUpdate = require('log-update');
var toX = () =>'X'
var delay = (seconds)=>new Promise((resolve)=>{
    setTimeout(resolve,seconds*1000)
})
var task=[
delay(5),
delay(2),
delay(3),
delay(4),
delay(9),
delay(6),
delay(11),
delay(8)
]
class PromiseQue{
    constructor(Promises=[],concurentCount=1){
    //   console.log(this,'reference of that particular class')  
      this.concurent= concurentCount; // to specify the number of task we want to run at the same time
      this.total = Promises.length; // to specify the number of task we want to run
      this.todo = Promises; //todo task
      this.running = []//task running
      this.completed = []//task completed
    }
    get runAnother(){
        console.log(this.running.length ,this.concurent , this.todo.length,(this.running.length < this.concurent) && this.todo.length,'teasxat')
        return (this.running.length < this.concurent) && this.todo.length

    }
    graphTasks(){
        var {todo,running,completed} = this;
        logUpdate(`
        todo:[${todo.map(toX)}]
        running:[${running.map(toX)}]
        completed:[${completed.map(toX)}]
        `);
    }
    run(){
        while(this.runAnother){
            var promise =this.todo.shift()
            //pushed to running
            this.running.push(promise);
            this.graphTasks()
            //pushed to complete
            promise.then(()=>{

                this.completed.push(this.running.shift())
                this.graphTasks();
                this.run();
            })
        }
    }
}
var delayQue = new PromiseQue(task,2)
delayQue.run()