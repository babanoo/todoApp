//TASKS
const input = document.getElementById("inputTask");
const tasksDiv = document.getElementById("tasks");
const trashButton = document.getElementsByClassName("icon-trash-o");
let arrayOfTasks = [];
// Check if Theres Tasks In Local Storage
if (localStorage.getItem("addTask")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("addTask"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();
//add tasks
input.onclick = function () {
  const promptMsgTask = prompt("Enter Task");
  if (promptMsgTask !== null) {
    addTaskToArray(promptMsgTask + input.value);
    promptMsgTask += input.value;
  }
};
// Click On Task Element
tasksDiv.addEventListener("click", (eo) => {
  if (eo.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(eo.target.getAttribute("data-id"));
    //complete task
    eo.target.classList.toggle("done");
  } else if (eo.target.className == "bi bi-trash") {
    //delete tasks
    const confirmdelete = confirm("Are You Sure?");
    if (confirmdelete) {
      // Remove Task From Local Storage
      deleteTaskWith(
        eo.target.parentElement.parentElement.getAttribute("data-id")
      );
      //remove task From page
      eo.target.parentElement.parentElement.remove();
    }
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
  // Add Tasks To Local Storage
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
    div.classList.add(
      "py-3",
      "d-flex",
      "align-items-start",
      "justify-content-between",
      "border-bottom"
    );
    const childOne = document.createElement("div");
    childOne.className = "childone";
    childOne.className = "childone";
    childOne.classList.add("ps-5");
    const childTwo = document.createElement("div");
    div.setAttribute("data-id", task.id);
    childOne.appendChild(document.createTextNode(task.title));
    const trashButton = document.createElement("span");
    trashButton.className = "bi bi-trash";
    childTwo.appendChild(trashButton);
    const startButton = document.createElement("span");
    startButton.className = "bi bi-star";
    childTwo.appendChild(startButton);
    startButton.addEventListener("click", (eo) => {
      if (eo.target.classList.contains("bi-star")) {
        eo.target.classList.replace("bi-star", "bi-star-fill");
        eo.target.classList.add("text-primary");
      } else {
        eo.target.className = "bi bi-star";
        eo.target.classList.remove("text-primary");
      }
    });
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
//sideBar
const important = document.getElementById("import");
const head = document.getElementById("myHead");
const day = document.getElementById("myDay");
const star = document.getElementById("importIcon");
const sun = document.getElementById("dayIcon");

important.addEventListener("click", (eo) => {
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
day.addEventListener("click", (eo) => {
  head.innerHTML = " My Day";
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
const toggleSearch = (search, button) => {
  const searchBar = document.getElementById(search),
    searchButton = document.getElementById(button);

  searchButton.addEventListener("click", () => {
    // We add the show-search class, so that the search bar expands
    searchBar.classList.toggle("show-search");
  });
};
toggleSearch("search-bar", "search-button");
