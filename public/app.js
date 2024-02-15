let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (task.completed) {
      taskElement.classList.add("completed");
    } else {
      taskElement.classList.add("not-completed");
    }
    taskElement.innerHTML = `
      <span>${task.text}</span>
      <button type="button" class="btn btn-primary" onclick="toggleTask(${index})">Completed</button>
      <button type="button" class="btn btn-secondary" onclick="editTask(${index})">Edit</button>
      <button type="button" class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
    `;
    tasksContainer.appendChild(taskElement);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const text = taskInput.value.trim();

  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure about deleting the task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

document.addEventListener("DOMContentLoaded", renderTasks);
