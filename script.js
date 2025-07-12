const divToDo = document.getElementById("to-do");
const frmTasks = document.getElementById("frmTasks");
let tasks = [
    {
        title:"Ödevini yap",
        done: false
    },
    {
        title:"Alışveriş yap",
        done: false
    },
    {
        title:"Spor yap",
        done: true
    }
];

function listTasks(){
    for (const task of tasks) {
        let div = document.createElement("div");
        div.classList.add("to-do-item");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.checked = task.done;
        div.append(input);
        let span = document.createElement("span");
        span.textContent = task.title;
        div.append(span);
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.textContent = "Sil";
        div.append(button);
        divToDo.append(div);
    }
}
frmTasks.submit = function (event) {
    event.preventDefault();
};

listTasks();
