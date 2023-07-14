//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMcontentloaded", getTodos);
todoButton.addEventListener("click", addTodo);
todolist.addEventListener("click", deleteCheck);
filterOption.addEventListener("click",filterTodo);

//Functions

function addTodo(event) {
//prevent form submission
event.preventDefault();
//Todo DIV
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//create LI
const newTodo = document.createElement("li");
newTodo.innerText = todoInput.value;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);
//add todo to local storage
saveLocalTodos(todoInput.value);
//checkmark button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
//Append to list
todolist.appendChild(todoDiv);
//clear todo input value
todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo item
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        
}

//Checkmark
if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
}
}

function filterTodo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":   
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }else {
                todo.style.display = 'none';
            }
            break;
        }
    });
}


function saveLocalTodos(todo){
    //check if I have anything already saved
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    
     //check if I have anything already saved
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        //Todo DIV
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//create LI
const newTodo = document.createElement("li");
newTodo.innerText = todo;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);

//checkmark button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
//Append to list
todolist.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
 //check if I have anything already saved
 let todos;
 if(localStorage.getItem("todos") === null){
     todos = [];
 }else{
     todos = JSON.parse(localStorage.getItem("todos"));
 }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.Indexof,(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}