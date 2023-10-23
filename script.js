const addTaskElement = document.querySelector(".add-task");
const tasksWrapper = document.querySelector(".tasks-wrapper");
const tasks = [
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

function renderTasks(tasks) {
  tasksWrapper.innerHTML = "";
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className =
      "task py-3 d-flex align-items-start border-bottom cursor-pointer position-relative";
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
    tasksWrapper.prepend(div);
  });
}
addTaskElement.addEventListener("click", (e) => {
  const promptMsgTask = prompt("Enter Task");
  if (promptMsgTask.trim() !== "") {
    createNewTask(promptMsgTask);
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
