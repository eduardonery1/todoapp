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
    return createTask(divInfo[0], divInfo[1]);
}

function createTask(inputText, id = ""){
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", (id === "")?num_tasks++: id);
    newDiv.textContent = inputText;
    newDiv.setAttribute("class", "task");
    newDiv.onmouseover = () => {
        newDiv.original = newDiv.textContent;
        newDiv.textContent = "Remover?";
    };
    newDiv.onmouseleave = () => {
        newDiv.textContent = newDiv.original;
    };
    newDiv.onclick = () => {
        newDiv.onmouseleave();
        let str = storage_sep+divToString(newDiv);
        let start = localStorage["tasks"].indexOf(str);
        let temp = localStorage["tasks"];
        localStorage["tasks"] = localStorage["tasks"].slice(0, start);
        localStorage["tasks"] += temp.slice(start+str.length);
        num_tasks--;
        newDiv.remove();
    };
    return newDiv;
}

addButton.onclick = ()=>{
    const inputText = inputTag.value;
    if (inputText === "") return;
    let newDiv = createTask(inputText);     
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
