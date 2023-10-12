//TASKS
const input = document.getElementById("inputTask");
const tasksDiv = document.getElementById("tasks");
const task = document.getElementsByClassName("task");
const trashButton = document.getElementsByClassName("icon-trash-o");
// Empty Array To Store The Tasks
//let arrayOfTasks = [];
let count = 4;
let counetImport = 0;
// Check if Theres Tasks In Local Storage
if (localStorage.getItem("addTask")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("addTask"));
}
// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();
input.onclick = function () {
  count++;
  const promptMsgTask = prompt("Enter Task");
  if (promptMsgTask.trim() !== "") {
    document.getElementById("countTask").innerHTML = count;
    addTaskToArray(promptMsgTask + input.value);
    promptMsgTask += input.value;
  } else {
    count--;
    alert("Please add some task!");
    return false;
  }
};
// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    //complete task
    e.target.classList.toggle("done");
  } else if (e.target.className == "bi bi-trash") {
    //delete tasks
    const confirmdelete = confirm("Are You Sure?");
    count--;
    if (confirmdelete) {
      // Remove Task From Local Storage
      deleteTaskWith(
        e.target.parentElement.parentElement.getAttribute("data-id")
      );
      //remove task From page
      e.target.parentElement.parentElement.remove();
      document.getElementById("countTask").innerHTML = count;
    }
  } else if (e.target.classList.contains("bi-star")) {
    importantStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.className = "bi bi-star-fill";
    e.target.classList.add("text-primary");
    counetImport++;
    document.getElementById("countImport").innerHTML = counetImport;
  } else if (e.target.classList.contains("bi-star-fill")) {
    e.target.className = "bi bi-star";
    e.target.classList.remove("text-primary");
    counetImport--;
    document.getElementById("countImport").innerHTML = counetImport;
  }
});

//add tasks
function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
    important: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  //tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.classList.add(
      "py-3",
      "d-flex",
      "align-items-start",
      "justify-content-between",
      "border-bottom"
    );
    const childOne = document.createElement("div");
    childOne.className = "childOne";
    childOne.classList.add("ps-5");
    const childTwo = document.createElement("div");
    div.setAttribute("data-id", task.id);
    const taskContent = document.createElement("p");
    childOne.appendChild(taskContent);
    taskContent.appendChild(document.createTextNode(task.title));
    const trashButton = document.createElement("span");
    trashButton.className = "bi bi-trash";
    childTwo.appendChild(trashButton);
    const startButton = document.createElement("span");
    childTwo.appendChild(startButton);
    startButton.className = "bi bi-star";
    // Check If imported task
    //if (task.important) {
    // startButton.className = "bi bi-star-fill";
    //}
    div.appendChild(childOne);
    div.appendChild(childTwo);
    tasksDiv.prepend(div);
  });
}
//add data to local storage
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("addTask", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("addTask");
  if (data) {
    let addTask = JSON.parse(data);
    addElementsToPageFrom(addTask);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
function importantStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].important == false
        ? (arrayOfTasks[i].important = true)
        : (arrayOfTasks[i].important = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
//sideBar Enter Name
const myInput = document.getElementById("myInput");
//myInput.innerText = localStorage.getItem("value");
function promptName() {
  if (localStorage.getItem("value")) {
    myInput.innerText = localStorage.getItem("value");
  } else {
    const promptMsgName = prompt("Enter Your Name");
    if (promptMsgName.trim() !== "") {
      myInput.value = promptMsgName;
      localStorage.setItem("value", myInput.value);
      myInput.innerText = localStorage.getItem("value");
    }
  }
}
promptName();
//Add userNama in Localstorage

//sideBar
const important = document.getElementById("import");
const head = document.getElementById("myHead");
const day = document.getElementById("myDay");
const star = document.getElementById("importIcon");
const sun = document.getElementById("dayIcon");
//show todays
const date = document.createElement("p");
date.classList.add("h4", "pt-3");
const options = {
  weekday: "long",
  // year: "numeric",
  month: "long",
  day: "numeric",
};
head.appendChild(date);
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);
important.addEventListener("click", () => {
  //hide Tasks
  tasksDiv.classList.add("d-none");
  day.classList.remove("active", "bg-light", "bg-gradient");
  important.classList.add("active", "bg-light", "bg-gradient");
  head.innerHTML = "Important";
  //show todays
  const date = document.createElement("p");
  date.classList.add("h4", "pt-3");
  const options = {
    weekday: "long",
    //year: "numeric",
    month: "long",
    day: "numeric",
  };
  head.appendChild(date);
  const today = new Date();
  date.innerHTML = today.toLocaleDateString("en-US", options);
  star.classList.add("purple");
  sun.classList.remove("purple");
});
day.addEventListener("click", () => {
  //show Tasks div
  tasksDiv.classList.remove("d-none");
  day.classList.add("active", "bg-light", "bg-gradient");
  important.classList.remove("active", "bg-light", "bg-gradient");
  head.innerHTML = "My Day";
  //show todays
  const date = document.createElement("p");
  date.classList.add("h4", "pt-3");
  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  head.appendChild(date);
  const today = new Date();
  date.innerHTML = today.toLocaleDateString("en-US", options);
  sun.classList.add("purple");
  star.classList.remove("purple");
});

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
