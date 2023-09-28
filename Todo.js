const openFormBtn = document.getElementById("openFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("task");
const taskDescription = document.getElementById("taskDescription");
const taskTime = document.getElementById("taskTime");
const incompleteList = document.getElementById("incompleteList");
const completedList = document.getElementById("completedList");

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {
  incomplete: [],
  completed: [],
};

openFormBtn.addEventListener("click", () => {
  taskForm.style.display = "block";
});

closeFormBtn.addEventListener("click", () => {
  taskForm.style.display = "none";
  taskInput.value = "";
  taskDescription.value = "";
  taskTime.value = "";
});

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

function createTaskElement(taskText, descriptionText, timeText, completed) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      incompleteList.removeChild(li);
      completedList.appendChild(li);
      storedTasks.incomplete = storedTasks.incomplete.filter(
        (task) => task.taskText !== taskText
      );
      storedTasks.completed.push({
        taskText,
        descriptionText,
        timeText,
      });
    } else {
      completedList.removeChild(li);
      incompleteList.appendChild(li);
      storedTasks.completed = storedTasks.completed.filter(
        (task) => task.taskText !== taskText
      );
      storedTasks.incomplete.push({
        taskText,
        descriptionText,
        timeText,
      });
    }
    saveTasksToLocalStorage();
  });

  li.appendChild(checkbox);

  const detailsDiv = document.createElement("span");
  detailsDiv.innerHTML = `<br>⏰${descriptionText} ${timeText}`;

  li.appendChild(document.createTextNode(taskText));
  li.appendChild(detailsDiv);

  return li;
}

function addTask() {
  const taskText = taskInput.value.trim();
  const descriptionText = taskDescription.value.trim();
  const timeText = taskTime.value.trim();

  if (taskText !== "") {
    const li = createTaskElement(taskText, descriptionText, timeText, false);

    incompleteList.appendChild(li);

    storedTasks.incomplete.push({
      taskText,
      descriptionText,
      timeText,
    });

    saveTasksToLocalStorage();

    taskInput.value = "";
    taskDescription.value = "";
    taskTime.value = "";

    checkReminders();

  }
  taskForm.style.display = "none";
}

storedTasks.incomplete.forEach((task) => {
  const li = createTaskElement(
    task.taskText,
    task.descriptionText,
    task.timeText,
    false
  );
  incompleteList.appendChild(li);
});

storedTasks.completed.forEach((task) => {
  const li = createTaskElement(
    task.taskText,
    task.descriptionText,
    task.timeText,
    true
  );
  completedList.appendChild(li);
});

clearLocalStorageBtn.addEventListener("click", () => {
    localStorage.clear();
    incompleteList.innerHTML = "";
    completedList.innerHTML = "";
});

function checkReminders() {
  const now = new Date();
  storedTasks.incomplete.forEach((task) => {
    const taskTime = new Date(task.timeText);
    if (taskTime > now) {
      const timeDifference = taskTime - now;

      setTimeout(() => {
        const modal = document.getElementById("reminderModal");
        const reminderText = document.getElementById("reminderText");
        const skipButton = document.getElementById("skipButton");
        const remindLaterButton = document.getElementById("remindLaterButton");

        reminderText.textContent = `Reminder: ${task.taskText}`;
        modal.style.display = "block";
        skipButton.addEventListener("click", () => {
          modal.style.display = "none";
        });

        remindLaterButton.addEventListener("click", () => {
          modal.style.display = "none";
        });
      }, timeDifference);
    }
  });
}
checkReminders();

