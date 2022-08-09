let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks 
let arrayOfTasks = [] ;

// Check if  there is Tasks In Local storage
if (localStorage.getItem("tasks")){
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data FOrm Local Storage Function
getDataFromLocalStorage();

// Add Task 
submit.onclick = function(){
  if (input.value !== ""){
    addTaskToArray (input.value); // Add Task To Array Of tasks 
    input.value = ""; //Empty Input Field 
    
  } 
};

// Click On Task Element 
tasksDiv.addEventListener("click" , (e) => {
  // Delete Button 
  if (e.target.classList.contains("del")) {
   // Remove Task From Local Storage
   deleteTaskWith(e.target.parentElement.getAttribute("data-id"));// Remove Element From Page
   // Remove Element From Page
   e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")){
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id")) 
    //toggle Done class
    e.target.classList.toggle("done");
  }
})
function addTaskToArray(taskText){
  const task = { 
    id : Date.now(),
    title: taskText,
     completed : false
  };
  // push Task to array of tasks
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage 
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
  // Empty Tasks Div
  tasksDiv.innerHTML = ""; 
  // Looping On Srray Of Tasks 
  arrayOfTasks.forEach((task) => {
    // Create Main Div 
    let div = document.createElement("div");
    div.className = "task";
    // Check IF Task is Done
    if (task.completed){
      div.className = "task done";
    }
    div .setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Botton
    let span = document.createElement("span");
    span.className = "del" ;
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks){
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks)); 
}
function getDataFromLocalStorage(){
  let data = window.localStorage.getItem("tasks");
  if(data){
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId){
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId){
  for (let i = 0 ; i < arrayOfTasks.length; i++){
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completer == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completer = false);
        
    }
  }
}
