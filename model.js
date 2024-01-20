import {Task} from "./controller.js"


export class Storage {
    #div_sep = "|";
    #storage_sep = "~";
    
    constructor(app){
        if (!localStorage["tasks"]){
            localStorage.setItem("tasks", "");
        }
        this.data = localStorage["tasks"];
        this.app = app;
    }

    push(task) {
        this.data += this.#storage_sep + this.#taskToString(task);
        localStorage["tasks"] = this.data;
    }    

    #taskToString(task) {
        return task.getContent() + this.#div_sep + task.getId();
    }

    remove(task) {
        let str = this.#storage_sep + this.#taskToString(task);
        let start = this.data.indexOf(str);
        this.data = this.data.slice(0, start) + this.data.slice(start+str.length);
        localStorage["tasks"] = this.data;
    }  

    strToTask(str) {
        let divInfo = str.split(this.#div_sep);
        return new Task(divInfo[0], divInfo[1], this.app);
    }

    loadTasks() {
        if (!this.data) return [];
        let firstSep = this.data.split(this.#storage_sep);
        return firstSep.slice(1).map(this.strToTask, this);
    }
}


