const taskListElement = document.querySelector("#task-list");
const addnewTaskBtn = document.querySelector("#add-new-task-button");

let taskArray = JSON.parse(localStorage.getItem("tasks"));
if(taskArray == null) {
    taskArray = [];
}
for(let i = 0; i < taskArray.length; i++) {
    addTaskElementToDOM(taskArray[i]);
}

function saveToLocal() {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function addTaskElementToDOM(task) {
    const newTaskElement = document.createElement("div");
    
    newTaskElement.innerHTML = "<p class=\"task-description\">" + task.description + "</p>";
    if(task.status == "pending") {
        newTaskElement.innerHTML += "<button class=\"mark-completed-button\">Mark Completed</button>";
    }
    newTaskElement.innerHTML += "\n<button class=\"remove-button\">Remove</button>";
    
    addTasksButtonFunctionality(newTaskElement);
    
    newTaskElement.classList.add("task");
    newTaskElement.classList.add(task.status);
    newTaskElement.id = task.index;
    
    taskListElement.append(newTaskElement);
}

function addTasksButtonFunctionality(taskElement) {
    const markCompletedButton = taskElement.querySelector(".mark-completed-button");
    const removeButton = taskElement.querySelector(".remove-button");
    
    if(markCompletedButton) {
        markCompletedButton.addEventListener("click", (event) => {
            event.target.parentElement.classList.add("completed");
            event.target.parentElement.classList.remove("pending");

            taskArray[event.target.parentElement.id].status = "completed";
            saveToLocal();

            markCompletedButton.remove();
        });
    }

    removeButton.addEventListener("click", (event) => {
        let currTaskElement = document.getElementById(parseInt(event.target.parentElement.id) + 1);
        for(let i = parseInt(event.target.parentElement.id) + 1; i < taskArray.length; i++) {
            taskArray[i].index--;
            currTaskElement.id = parseInt(currTaskElement.id) - 1;
            currTaskElement = currTaskElement.nextElementSibling;
        }
        taskArray.splice(event.target.parentElement.id, 1);
        saveToLocal();
        event.target.parentElement.remove();
    })
}

addnewTaskBtn.addEventListener("click", () => {
    let taskDescription = prompt("Enter Task Description");
    if(taskDescription && taskDescription.trim()) {
        taskDescription = taskDescription.trim();
        let newTask = {
            description: taskDescription,
            status: "pending",
            index: taskArray.length
        };
        taskArray.push(newTask);
        saveToLocal();
        addTaskElementToDOM(newTask);
    }
});