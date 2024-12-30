document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const searchBar = document.getElementById("search-bar");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
              <div class="task-details">
                  <span><strong>${task.name}</strong> (${task.category})</span>
                  <span>Due: ${task.dueDate}</span>
                  <span>Priority: ${task.priority}</span>
              </div>
              <div class="task-actions">
                  <button class="edit-btn" data-index="${index}">Edit</button>
                  <button class="delete-btn" data-index="${index}">Delete</button>
              </div>
          `;
      taskList.appendChild(li);
    });
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("task-name").value;
    const dueDate = document.getElementById("task-due-date").value;
    const priority = document.getElementById("task-priority").value;
    const category = document.getElementById("task-category").value;

    tasks.push({ name, dueDate, priority, category });
    saveTasks();
    renderTasks();
    taskForm.reset();
  });

  taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
    if (e.target.classList.contains("edit-btn")) {
      const index = e.target.dataset.index;
      const task = tasks[index];
      document.getElementById("task-name").value = task.name;
      document.getElementById("task-due-date").value = task.dueDate;
      document.getElementById("task-priority").value = task.priority;
      document.getElementById("task-category").value = task.category;
      tasks.splice(index, 1);
    }
  });

  searchBar.addEventListener("keyup", function (e) {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll("#task-list li").forEach(function (task) {
      const taskName = task
        .querySelector(".task-details strong")
        .textContent.toLowerCase();
      if (taskName.includes(searchText)) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  });

  renderTasks();
});
