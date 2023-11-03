const addTaskElement = document.querySelector(".add-task");
const tasksWrapper = document.querySelector(".tasks-wrapper");
const countImportant = document.querySelector("#count-important");
const countTasks = document.querySelector("#count-Tasks");
const important = document.querySelector("#import");
const day = document.querySelector("#my-day");
const date = document.querySelector(".date");
const userName = document.querySelector(".username");
const heading = document.querySelector(".heading");
const searchInput = document.querySelector("#search-input");
const currentDate = new Date();
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: "t4",
    title: "task four",
    completed: false,
    important: true,
  },
  {
    id: "t3",
    title: "task three",
    completed: false,
    important: true,
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
/*=============== Username JS ===============*/
window.addEventListener("load", () => {
  if (localStorage.getItem("name")) {
    userName.textContent = localStorage.getItem("name");
  } else {
    const promptName = prompt("Please enter your name");
    if (!promptName.trim()) {
      alert("😮 Username cannot be blank!");
      location.reload();
    } else {
      userName.textContent = promptName;
      localStorage.setItem("name", promptName);
    }
  }
});
/*=============== Header date JS ===============*/
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
date.textContent = `${days[currentDate.getDay()]}, ${
  months[currentDate.getMonth()]
} ${currentDate.getDate()}`;

/*=============== Tasks JS ===============*/
function saveCountTask() {
  countTasks.textContent = tasks.filter((task) => task).length;
  addDataToLocalStorage(tasks);
}
saveCountTask();
function CountImportantTask() {
  countImportant.textContent = tasks.filter(
    (task) => task.important === true
  ).length;
  addDataToLocalStorage(tasks);
}
CountImportantTask();
function displayTasks() {
  if (heading.textContent == "My Day") {
    renderTasks(tasks);
  } else if (heading.textContent == "Important") {
    renderTasks(tasks.filter((task) => task.important));
  }
}
function renderTasks(tasks) {
  tasksWrapper.innerHTML = "";
  tasks.forEach((task) => {
    const taskList = document.createElement("div");
    taskList.className =
      "task py-3 d-flex align-items-start border-bottom cursor-pointer position-relative";
    if (task.completed) {
      taskList.classList.add("done");
    }
    taskList.setAttribute("data-id", task.id);
    taskList.addEventListener("click", (e) => {
      const taskId = e.target.getAttribute("data-id");
      if (task.id == taskId) {
        task.completed = !task.completed;
        if (task.completed) {
          taskList.classList.add("done");
        } else {
          taskList.classList.remove("done");
        }
      }
      addDataToLocalStorage(tasks);
    });
    const taskContent = document.createElement("p");
    taskContent.className = "flex-grow-1 ps-5 content";
    taskList.appendChild(taskContent);
    taskContent.appendChild(document.createTextNode(task.title));
    const trashButton = document.createElement("button");
    trashButton.className = "bi bi-trash border-0 bg-body";
    taskList.appendChild(trashButton);
    const startButton = document.createElement("button");
    taskList.appendChild(startButton);
    startButton.className = "bi bi-star border-0 bg-body";
    if (task.important === true) {
      startButton.classList.remove("bi-star");
      startButton.classList.add("bi-star-fill", "text-primary");
    }
    tasksWrapper.prepend(taskList);
    startButton.addEventListener("click", (e) => {
      const taskId = e.target.parentElement.getAttribute("data-id");
      if (task.id == taskId) {
        task.important = !task.important;
        if (task.important === true) {
          e.target.classList.remove("bi-star");
          e.target.classList.add("bi-star-fill", "text-primary");
        } else {
          e.target.classList.remove("bi-star-fill", "text-primary");
          e.target.classList.add("bi-star");
        }
      }
      countImportant.textContent = tasks.filter(
        (task) => task.important
      ).length;
      displayTasks();
    });
  });
}
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
  displayTasks();
}

important.addEventListener("click", (e) => {
  const importantTasks = tasks.filter((task) => task.important === true);
  heading.textContent = "Important";
  date.textContent = `${days[currentDate.getDay()]}, ${
    months[currentDate.getMonth()]
  } ${currentDate.getDate()}`;
  day.classList.remove("active", "text-bg-light");
  e.target.classList.add("active", "text-bg-light");
  renderTasks(importantTasks);
});

day.addEventListener("click", (e) => {
  heading.textContent = "My Day";
  important.classList.remove("active", "text-bg-light");
  e.target.classList.add("active", "text-bg-light");
  renderTasks(tasks);
});

tasksWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash")) {
    const confirmDelete = confirm("are you sure you want to delete this task?");
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
  } else {
    alert("😮 Task cannot be empty!");
    return false;
  }
});

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
  CountImportantTask();
}

/*=============== SEARCH BAR JS ===============*/
toggleSearch = (search, button) => {
  const searchBar = document.querySelector("#search-bar"),
    searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", () => {
    //add the show-search class, so that the search bar expands
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

let filterTasks = function (event) {
  let searchKeyword = searchInput.value.toLowerCase();
  const searchFilter = tasks.filter(function (task) {
    task = task.title.toLowerCase();
    return task.includes(searchKeyword);
  });
  renderTasks(searchFilter);
};
searchInput.addEventListener("keyup", filterTasks);
