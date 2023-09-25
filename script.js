//TASKS
const input = document.getElementById("inputTask");
const tasksDiv = document.getElementById("tasks");
const trashButton = document.getElementsByClassName("icon-trash-o");
let arrayOfTasks = [];
//trigger get data from local storage function
getDataFromLocalStorage();
//check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
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
  if (eo.target.className == "bi bi-trash") {
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
  } else {
    eo.preventDefault();
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
    div.classList.add(
      "py-3",
      "d-flex",
      "align-items-start",
      "justify-content-between",
      "border-bottom"
    );
    //complete task
    if (task.completed) {
      div.classList.add("done");
    }

    const childOne = document.createElement("div");
    childOne.addEventListener("click", (eo) => {
      eo.target.classList.toggle("done");
    });
    const childTwo = document.createElement("div");
    div.setAttribute("data-id", task.id);
    childOne.appendChild(document.createTextNode(task.title));
    const trashButton = document.createElement("span");
    trashButton.className = "bi bi-trash";
    childTwo.appendChild(trashButton);
    const startButton = document.createElement("span");
    startButton.className = "bi bi-star";
    startButton.addEventListener("click", (eo) => {
      if (eo.target.className == "bi bi-star") {
        eo.target.classList.replace("bi-star", "bi-star-fill");
        eo.target.classList.add("text-primary");
      } else {
        eo.target.className = "bi bi-star";
        eo.target.classList.remove("text-primary");
      }
    });
    childTwo.appendChild(startButton);
    const checkedButton = document.createElement("span");
    checkedButton.className = "bi bi-circle";
    childOne.prepend(checkedButton);
    div.appendChild(childOne);
    div.appendChild(childTwo);
    tasksDiv.prepend(div);
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
