const addTaskElement = document.querySelector(".add-task");
const tasksWrapper = document.querySelector(".tasks-wrapper");
const countImportant = document.querySelector("#count-important");
const countTasks = document.querySelector("#count-Tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: "t4",
    title: "task four",
    completed: false,
    important: false,
  },
  {
    id: "t3",
    title: "task three",
    completed: false,
    important: false,
  },
  {
    id: "t2",
    title: "task two",
    completed: false,
    important: false,
  },
  {
    id: "t1",
    title: "task one",
    completed: false,
    important: false,
  },
];
renderTasks(tasks);
getDataFromLocalStorage();
function saveCountTask() {
  countTasks.textContent = tasks.filter((task) => task).length;
  addDataToLocalStorage(tasks);
}
saveCountTask();
function renderTasks(tasks) {
  tasksWrapper.innerHTML = "";
  tasks.forEach((task) => {
    const todoContainer = document.createElement("div");
    todoContainer.className =
      "task py-3 d-flex align-items-start border-bottom cursor-pointer position-relative";
    todoContainer.setAttribute("data-id", task.id);
    const taskContent = document.createElement("p");
    taskContent.className = "flex-grow-1 ps-5 content";
    todoContainer.appendChild(taskContent);
    taskContent.appendChild(document.createTextNode(task.title));
    const trashButton = document.createElement("button");
    trashButton.className = "bi bi-trash border-0 bg-body";
    todoContainer.appendChild(trashButton);
    const startButton = document.createElement("button");
    todoContainer.appendChild(startButton);
    startButton.className = "bi bi-star border-0 bg-body";
    if (task.important === true) {
      startButton.className = "bi bi-star-fill";
    }
    startButton.addEventListener("click", (e) => {
      if (e.target.classList.contains("bi-star")) {
        e.target.classList.replace("bi-star", "bi-star-fill");
        e.target.classList.add("text-primary");
      } else {
        e.target.classList.replace("bi-star-fill", "bi-star");
        e.target.classList.remove("text-primary");
      }
    });
    tasksWrapper.prepend(todoContainer);
  });
}

tasksWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
  }
  if (e.target.classList.contains("bi-trash")) {
    const confirmDelete = confirm("are you sure");
    if (confirmDelete) {
      e.target.parentElement.remove();
      removeTask(e.target.parentElement.getAttribute("data-id"));
    }
  }
});

addTaskElement.addEventListener("click", (e) => {
  const promptMsgTask = prompt("Enter Task");
  if (promptMsgTask.trim() !== "") {
    createNewTask(promptMsgTask);
    addDataToLocalStorage(tasks);
  } else {
    alert("Please add some task!");
    return false;
  }
});

function createNewTask(taskText) {
  const newTask = {
    id: Date.now(),
    title: taskText,
    completed: false,
    important: false,
  };
  tasks.push(newTask);
  renderTasks(tasks);
  addDataToLocalStorage(tasks);
  saveCountTask();
}
function addDataToLocalStorage(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    renderTasks(tasks);
  }
}
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(tasks);
  saveCountTask();
}
/*=============== SEARCH BAR JS ===============*/

toggleSearch = (search, button) => {
  const searchBar = document.getElementById(search),
    searchButton = document.getElementById(button);
  const searchInput = document.getElementById("searchInput");
  searchButton.addEventListener("click", () => {
    // We add the show-search class, so that the search bar expands
    searchBar.classList.add("show-search");
    searchInput.focus();
    searchInput.addEventListener("blur", () => {
      if (searchInput.value === "") {
        searchBar.classList.remove("show-search");
      }
    });
  });
};
toggleSearch("search-bar", "search-button");
