var tasksToDo = []
var getTask = new XMLHttpRequest();
getTask.addEventListener("load", function(response){      
    //Adding previously stored task to Dom  
    // console.log(response.target.responseText)    
    tasksToDo = JSON.parse(response.target.responseText);
    if(tasksToDo.length != 0){
        tasksToDo.forEach((task)=>{
            addTask(task.id, task.name)        
        })
    }
})
getTask.open('GET', '/task')
getTask.send()


//Updating id according to previously stored item
var taskId;
if(tasksToDo.length){
    taskId = tasksToDo[tasksToDo.length-1].id + 1;
}
else taskId = 1;

//Handling checkbox
function markTask(event){
    var targetParent = event.target.parentNode
    var id = targetParent.getAttribute("id")
    if(event.target.checked){
        document.getElementById("-"+id).classList.add("complete")
    }
    else{
        document.getElementById("-"+id).classList.remove("complete")
    }
}

//Deleting Task
//Delete Task From Array
function deleteTaskFromArray(taskTodelete){    
    for(var i = 0; i<tasksToDo.length; i++){
        if(tasksToDo[i].id == taskTodelete){
            tasksToDo.splice(i, 1) 
            var updateTask = new XMLHttpRequest();
            updateTask.open("POST", "/deletetask",);
            updateTask.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            updateTask.send(JSON.stringify(tasksToDo));        
            break
        }
    }
}

//Delete Task from Dom
function deleteTaskFromDom(event){
    var targetParent = event.target.parentNode
    taskTodelete = targetParent.getAttribute('id')
    deleteTaskFromArray(taskTodelete)
    targetParent.parentNode.removeChild(targetParent)
}

//Adding Task
//Add task to Dom
function addTaskToDom(taskNo){
    var id = tasksToDo[taskNo].id
    var name = tasksToDo[taskNo].name
    addTask(id, name)        
}

var input = document.getElementById('newTask')
//Add task to array
function addTaskToArray(){
    if(input.value){
        var task = {};        
        if(input.value){
            task.id = taskId
            task.name = input.value
            tasksToDo.push(task)        
            input.value = ""
            taskId++;
            addTaskToDom(tasksToDo.length-1)
        }  
        var sendTask = new XMLHttpRequest();
        sendTask.open("POST", "/task",);
        sendTask.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        sendTask.send(JSON.stringify(task));        
    }
}

//Helper function to add single task to Dom
function addTask(taskId, taskName){
    var newTask = document.createElement("div")
        newTask.classList.add("singleTask")
        newTask.setAttribute('id', taskId)
        
        //Add task text
        var taskInfo = document.createElement("label")
        taskInfo.innerText = taskName
        taskInfo.classList.add("taskInfo")
        taskInfo.setAttribute('id', "-" + taskId)
        newTask.appendChild(taskInfo)
        
        //Add checkbox
        var markAsCompleted = document.createElement('input')
        markAsCompleted.setAttribute("type", "checkbox")
        newTask.appendChild(markAsCompleted)
        markAsCompleted.classList.add("markAsCompleted")
        markAsCompleted.addEventListener("click", markTask)
        markAsCompleted.setAttribute('for', taskId)

        //Add delete button
        var deleteTask = document.createElement('label')
        deleteTask.innerText = "X"
        deleteTask.addEventListener("click", deleteTaskFromDom)
        newTask.appendChild(deleteTask)
        deleteTask.classList.add("deleteTask")

        //Add task to Dom
        document.getElementById('tasks').appendChild(newTask)
}

document.getElementById("addTask").addEventListener("click", addTaskToArray);



