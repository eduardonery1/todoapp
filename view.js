import { App } from "./controller.js"


const taskList = document.querySelector("#task-list");
const inputTag = document.querySelector("#task-text");
const addButton = document.querySelector("#add-btn");	

export var app = new App(taskList);

addButton.onclick = ()=> {
    const inputText = inputTag.value;
    if (inputText === "") return;
    const task = app.createTask(inputText);
    taskList.appendChild(task.getDiv());
    inputTag.value = "";
};


