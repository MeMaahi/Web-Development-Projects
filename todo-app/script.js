document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dueDateInput = document.getElementById("dueDate");
    
    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = { text: taskText, dueDate: dueDate, completed: false };
    saveTask(task);

    taskInput.value = "";
    dueDateInput.value = "";
    renderTasks();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function renderTasks(filter = "all") {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        let li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        let taskInfo = document.createElement("div");
        taskInfo.className = "task-info";
        taskInfo.innerHTML = `<strong>${task.text}</strong> <br> Due: ${task.dueDate || "No Due Date"}`;

        let taskButtons = document.createElement("div");
        taskButtons.className = "task-buttons";

        let completeBtn = document.createElement("button");
        completeBtn.innerText = task.completed ? "Undo" : "✔️";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => toggleTaskCompletion(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(index);

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(taskButtons);

        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function filterTasks(filter) {
    renderTasks(filter);
}
