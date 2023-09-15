//TASKS
const input = document.getElementById("inputTask");
const submit = document.getElementById("add");
const tasksDiv = document.getElementById("tasks");
let arrayOfTasks = [];
//trigger get data from local storage function
getDataFromLocalStorage();
//check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
//add tasks
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  const confirmdelete = confirm("Are You Sure?");
  if (confirmdelete) {
    if (e.target.classList.contains("icon-trash-o")) {
      // Remove Element From Localstorage
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      // Remove Element From Page
      e.target.parentElement.remove();
    }
  } else {
    e.preventDefault();
  }
  // Task Elements
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(tastText) {
  const task = {
    id: Date.now(),
    title: tastText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  //add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}
function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    const trashButton = document.createElement("span");
    trashButton.className = "icon-trash-o";
    div.appendChild(trashButton);
    const startButton = document.createElement("span");
    startButton.className = "icon-star-o";
    div.appendChild(startButton);
    const checkedButton = document.createElement("span");
    checkedButton.className = "icon-circle-thin";
    div.prepend(checkedButton);
    tasksDiv.appendChild(div);
    console.log(div);
  });
}
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
/*=============== SEARCH BAR JS ===============*/
const toggleSearch = (search, button) => {
  const searchBar = document.getElementById(search),
    searchButton = document.getElementById(button);

  searchButton.addEventListener("click", () => {
    // We add the show-search class, so that the search bar expands
    searchBar.classList.toggle("show-search");
  });
};
toggleSearch("search-bar", "search-button");
