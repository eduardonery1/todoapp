import { Storage } from "./model.js"
import { Task } from "./task.js"


export class App {
    constructor(taskList){
        this.taskList = taskList;
        this.num_tasks = 0;
        this.db = new Storage();
        
        for (const taskDiv of this.db.loadTasks()){
            this.taskList.appendChild(taskDiv.getDiv());
            this.num_tasks++;
        }
    };

    createTask(inputText){
        const task = new Task(inputText, this.num_tasks++)
        this.db.push(task);
        return task;
    }   

    removeTask(task){
        this.num_tasks--;
        this.db.remove(task);
    }
};