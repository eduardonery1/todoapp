const taskList = document.querySelector("#task-list");
const inputTag = document.querySelector("#task-text");
const addButton = document.querySelector("#add-btn");
const div_sep = "~text-id~";
const storage_sep = "~div-div~";
let num_tasks = 0;


function divToString(div){
    const text = div.textContent;
    const id = div.id;
    return text+div_sep+id
}

function storageToArray(){
    const tasks = localStorage["tasks"];
    if (!tasks){
        return ;
    }
    let firstSep = tasks.split(storage_sep);
    return firstSep.slice(1).map(strToDiv);
}

function addToStorage(div){
    if (!div) {
        return;
    }
    const divStr = divToString(div);
    localStorage["tasks"] += storage_sep+divStr;
}

function strToDiv(str){
    let newDiv = document.createElement("div");
    let divInfo = str.split(div_sep);
    newDiv.setAttribute("id", divInfo[1]);
    newDiv.textContent = divInfo[0];
    newDiv.setAttribute("class", "task");
    return newDiv;
}

addButton.onclick = ()=>{
    const inputText = inputTag.value;
    if (inputText === "") return;

    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", num_tasks++);
    newDiv.textContent = inputText;
    newDiv.setAttribute("class", "task");
    taskList.appendChild(newDiv);
    addToStorage(newDiv);
    inputTag.value = "";
};

function setupTasks(){
    if (!localStorage["tasks"]){
        localStorage.setItem("tasks", "");
        return;
    } 
    
    for (const task of storageToArray()){
        taskList.appendChild(task);            
        num_tasks++;
    }
}

setupTasks();
