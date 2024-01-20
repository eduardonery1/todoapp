import { App } from "./controller.js"


const taskList = document.querySelector("#task-list");
const inputTag = document.querySelector("#task-text");
const addButton = document.querySelector("#add-btn");	


var app = new App(taskList);


addButton.onclick = ()=> {
    const inputText = inputTag.value;
    if (inputText === "") return;
    app.createTask(inputText, taskList);
    inputTag.value = "";
};

inputTag.addEventListener('keypress', (e)=>{
    if (e.key === "Enter"){
        addButton.onclick();
    }
})

