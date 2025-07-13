const form = document.getElementById("frmTasks");
const taskInput = document.getElementById("tasks");
const descInput = document.getElementById("description");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("to-do");
const filterBtn = document.getElementById("filterCompleted");



let showOnlyCompleted = false;

let allTasks = [];

const priorityOrder = {
    "Düşük": 1,
    "Orta": 2,
    "Yüksek": 3
};

form.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        const title = taskInput.value.trim();
        const description = descInput.value.trim();
        const priority = document.querySelector("input[name='priority']:checked");

        if (!title || title.length === 0) throw new Error("Görev başlığı alanı boş bırakılamaz. Lütfen bir görev giriniz.");
        if (!priority) throw new Error("Lütfen bir öncelik seçin.");

        allTasks.push({
            id: Date.now(),
            title: title,
            description: description,
            priority: priority.value,
            completed: false,
            createdAt: new Date().toLocaleString("tr-TR")
        });
        form.reset();
        errorMsg.textContent = "";
        renderTasks();

    } catch (err) {
        alert(err.message);
        errorMsg.textContent = err.message;
    }
});

taskList.addEventListener("click", function (event) {
    event.stopPropagation();

    const clicked = event.target;
    const taskId = clicked.parentElement.dataset.id;
    let index = allTasks.findIndex(task => task.id == taskId);

    if (index !== -1) {
        if (clicked.classList.contains("done-btn")) {
            if (allTasks[index].completed === true) {
                allTasks[index].completed = false;
            } else {
                allTasks[index].completed = true;
            }
        } else if (clicked.classList.contains("delete-btn")) {
            allTasks.splice(index, 1);
        }
        renderTasks();
    }
});

filterBtn.addEventListener("click", () => {
    if (showOnlyCompleted === true) {
        showOnlyCompleted = false;
    } else {
        showOnlyCompleted = true;
    }
    if (showOnlyCompleted) {
        filterBtn.textContent = "Tüm Görevleri Göster";
    } else {
        filterBtn.textContent = "Sadece Tamamlananları Göster";
    }
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    let tasksRender = [];

    if (showOnlyCompleted === true) {
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].completed === true) {
                tasksRender.push(allTasks[i]);
            }
        }
    } else {
        tasksRender = allTasks.slice();
    }

    tasksRender.sort(function (a, b) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    for (let i = 0; i < tasksRender.length; i++) {
        const task = tasksRender[i];

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.dataset.id = task.id;
        taskDiv.dataset.priority = task.priority;

        if (task.completed === true) {
            taskDiv.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.title + " - " + task.priority;

        const desc = document.createElement("p"); 
        desc.textContent = "Açıklama: " + task.description;
        desc.classList.add("desc");

        const date = document.createElement("p");
        date.textContent = "Oluşturulma Tarihi: " + task.createdAt;
        date.classList.add("date"); 

        const doneBtn = document.createElement("button");
        doneBtn.className = "done-btn";
        doneBtn.textContent = "Tamamlandı";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Sil";

        taskDiv.append(span, desc, date, doneBtn, deleteBtn);
        taskList.append(taskDiv);
    }
}

