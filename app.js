var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("add-task"); //first button
var incompleteTasksHolder = document.getElementById("incomplete-task"); //ul
var completedTasksHolder = document.getElementById("completed-task"); //ul

//new Task List Item

var createTaskListItem = function(taskString) {
    
      var listItem = document.createElement("li");
      var checkBox = document.createElement("input"); //checkbox
      var label = document.createElement("label");
      var editInput = document.createElement("input"); //text
      var editButton = document.createElement("button");
      var deleteButton = document.createElement("button");
    
      //Each element needs modifying
    
      checkBox.type = "checkbox";
      editInput.type = "text";
    
      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";
    
      label.innerText = taskString;
    
      // each element needs appending
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
    
      return listItem;
}

// Add a new task to the list

var addTask = function () {
        
        console.log("Add task...", taskInput.value);
        //Create a new list item with the text from #new-task:
        var listItem = createTaskListItem(taskInput.value);
        //Append listItem to incompleteTasksHolder
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        taskInput.value = "";
}

//Delete task from the list
var deleteTask = function () {
    console.log("Delete task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul = listItem.parentNode;
    ul.removeChild(listItem);
}

//Edit Existing Task

var editTask = function () {
    console.log("Edit Task...");
    var listItem = this.parentNode;
    
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains("editMode");
    
    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    
    listItem.classList.toggle("editMode");
}


//mark Existing Task as Complete

var taskCompleted = function () {

    console.log("Task Complete...");
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//mark task as inmcomplete
var taskIncomplete = function () {
    console.log("Task Incomplete...");
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if(event.key == "Enter") addTask();
});

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

//Cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}