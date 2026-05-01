
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;

    if (text.trim() === "") return alert("Enter a task!");

    tasks.push({
        id: Date.now(),
        text,
        priority,
        completed: false
    });

    document.getElementById("taskInput").value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(t => {
        if (t.id === id) t.completed = !t.completed;
        return t;
    });
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const newText = prompt("Edit task:");
    if (!newText) return;

    tasks = tasks.map(t => {
        if (t.id === id) t.text = newText;
        return t;
    });

    saveTasks();
    renderTasks();
}

function sortTasks() {
    const order = { High: 1, Medium: 2, Low: 3 };
    tasks.sort((a, b) => order[a.priority] - order[b.priority]);
}

function renderTasks() {
    sortTasks();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = `task ${task.priority.toLowerCase()}`;
        if (task.completed) div.classList.add("completed");

        div.innerHTML = `
            <span onclick="toggleComplete(${task.id})">${task.text}</span>
            <div class="actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">X</button>
            </div>
        `;

        list.appendChild(div);
    });
}

// Load on start
renderTasks();