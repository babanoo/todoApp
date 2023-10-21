const addTask = document.querySelector(".add-task");
const taskWrapper = document.querySelector(".task-wrapper");
const tasks = [
  {
    id: "t1",
    title: "task four",
    completed: false,
    important: false,
  },
  {
    id: "t2",
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
    id: "t2",
    title: "task one",
    completed: false,
    important: false,
  },
];

addTask.addEventListener("click", (eo) => {
  const promptMsgTask = prompt("Enter Task");
  if (promptMsgTask.trim() !== "") {
    addTaskToArray(promptMsgTask + addTask.value);
    promptMsgTask += addTask.value;
  } else {
    alert("Please add some task!");
    return false;
  }
});
//add tasks
// Task Data
function addTaskToArray(taskText) {
  // Task Data
  const newTask = {
    id: Date.now(),
    title: taskText,
    completed: false,
    important: false,
  };
  tasks.unshift(newTask);
  // Push Task To Array Of Tasks
  addTasks(tasks.slice(0, 1));
}
addTasks(tasks);
//addTasks(tasks);
function addTasks(tasks) {
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className =
      "task py-3 d-flex align-items-start border-bottom cursor-pointer position-relative";
    // Check If Task is Done
    if (task.completed) {
      div.className += "done";
    }
    div.setAttribute("data-id", task.id);
    const taskContent = document.createElement("p");
    taskContent.className = "flex-grow-1 ps-5 content";
    div.appendChild(taskContent);
    taskContent.appendChild(document.createTextNode(task.title));
    const trashButton = document.createElement("button");
    trashButton.className = "bi bi-trash border-0 bg-body";
    div.appendChild(trashButton);
    const startButton = document.createElement("button");
    div.appendChild(startButton);
    startButton.className = "bi bi-star border-0 bg-body";
    taskWrapper.prepend(div);
  });
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
