import { app } from "./view.js"


export class Task {
    constructor(inputText, id) {
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
            app.removeTask(this);
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
