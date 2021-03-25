
/* elements selectors */ 
let listContainer = document.querySelector("#myUL")
let input = document.querySelector("#myInput"); 

let addBtn =  document.querySelector(".addBtn")
let allTasks = [];

/************************************************************************************************ */


/* add button event listener */
addBtn.addEventListener("click" , addTask);


/************************************************************************************************ */


/* add task function */
function addTask(e){

    if (input.value !== "") {

        let myStore = JSON.parse(localStorage.getItem("myToDo"));
        
        if(myStore !== null){
            myStore.push(input.value);
            localStorage.setItem("myToDo", JSON.stringify(myStore))
              /* create my task  */
                creatMyTask(input.value);
                input.value = null;
        }else{

            allTasks.push(input.value);
            localStorage.setItem("myToDo", JSON.stringify(allTasks))
    
            /* create my task  */
            creatMyTask(input.value);
            input.value = null;
    
        }

    } else {
        alert("Please enter our task")
    }
}


/************************************************************************************************ */



/* create my task function */
function creatMyTask (currentValue){

    var myTask = document.createElement("li");
    myTask.textContent = currentValue;
    listContainer.appendChild(myTask)
    currentValue = null;

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myTask.appendChild(span);

    span.addEventListener("click", deleteTask)

}



/************************************************************************************************ */



/* delete function */
function deleteTask(e){
    let taskToDelete = e.target.parentNode;
    taskToDelete.style.display = "none";
    let localData = JSON.parse(localStorage.getItem("myToDo"));
    let requiredTask = taskToDelete.childNodes[0].textContent;

    if(localData !== null){

        for(let i=0; i<localData.length; i++){

            if(localData[i] === requiredTask){
                console.log("ok");
                localData.splice(i, 1);
                localStorage.setItem("myToDo", JSON.stringify(localData))
            }

        }
    } 
}

/************************************************************************************************ */

// Add a "checked" symbol when clicking on a list item

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
});


/************************************************************************************************ */


/* onload function */
window.onload = function(){

    let storedData = JSON.parse(localStorage.getItem("myToDo"))

    if(storedData !== null){
        for(let i=0; i<storedData.length; i++){

            creatMyTask(storedData[i])
        }
    }

}


/********************************************** */ 

// Trigger a Button Click on Enter

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addBtn.click();
    }
});