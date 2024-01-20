import { Storage } from "./model.js"


export class Task {
    constructor(inputText, id, app) {
        this.app = app
        this.div = document.createElement("div");
        this.div.setAttribute("id", id);
        this.div.textContent = inputText;
        this.div.setAttribute("class", "task");
        this.div.onmouseover = () => {
            this.div.original = this.div.textContent;
            this.div.textContent = "Remover?";
        };
        this.div.onmouseleave = () => {
            this.div.textContent = this.div.original;
        };
        this.div.onclick = () => {
            this.div.onmouseleave();
            this.app.removeTask(this);   
            this.div.remove();
        };
    };

    getDiv() {
        return this.div;
    };

    getId() {
        return this.div.id;
    };

    getContent() {
        return this.div.textContent;
    };
};


export class App {
    constructor(taskList){
        this.taskList = taskList;
        this.num_tasks = 0;
        this.db = new Storage(this);
        
        let loaded_tasks = this.db.loadTasks(this);
        this.num_tasks += loaded_tasks.length;

        for (const task of loaded_tasks){
            this.taskList.appendChild(task.getDiv());
        }
        
    };

    createTask(inputText){
        this.num_tasks++;
        const task = new Task(inputText, this.num_tasks, this);
        this.db.push(task);
        this.taskList.appendChild(task.getDiv());
    }   

    removeTask(task){
        this.num_tasks--;
        this.db.remove(task);
    }
};