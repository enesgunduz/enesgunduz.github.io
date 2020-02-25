// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();


function eventListeners(){
    form.addEventListener('submit',addTodo);
    document.addEventListener('DOMContentLoaded',loadAllTodosToUI);{}
    secondCardBody.addEventListener('click',deleteTodo);
    filter.addEventListener('keyup',filterTodos);
    clearButton.addEventListener('click',ClearAllTodos);
}
//Todoları Silme

function ClearAllTodos(e){
    if(confirm('Tüm todoları silmek istedğinize emin misiniz ? ')){
        //Arayüzden todoları silme
        while(todoList.firstElementChild != null)[
            todoList.removeChild(todoList.firstElementChild)
        ]
        //Storagedan todoları silme
        localStorage.removeItem('todos');
    }
}
//Todoları filtreleme

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.list-group-item');

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //Bulamadı
            listItem.setAttribute('style','display:none !important')

        }else{
            listItem.setAttribute('style','display:block');

        }

    })
}


//Todoları arayüzden silme
function deleteTodo(e){
    if(e.target.className === 'fa fa-remove'){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert('success','Todo başarıyla silindi...')
    }
}



//Storagedan todoları silme

function deleteTodoFromStorage(deleteTodo){
    let todos =getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);//Arrayden değeri silebilriz
        }

    })

    localStorage.setItem('todos',JSON.stringify(todos));
};




//Sayfa yüklenince todoları storagedan alıp arayüze ekleme
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}




//Todo Ekleme
function addTodo(e){
    const newTodo = todoInput.value.trim();//trim yazılan yazının sağında veya solunda kalan boslukları temizler.
    if(newTodo === ''){
        showAlert('danger','Lütfen bir todo girin...');
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert('success','Todo başarıyla eklendi...');
    }
    e.preventDefault();
}

//Storagedan todoları alma
function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}


//Storage'a todo ekleme
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem('todos',JSON.stringify(todos));
}



//Alert Mesajı Gösterme
function showAlert(type,message){
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);


}

//Arayüze todo ekleme
function addTodoToUI(newTodo){

    const newElement = document.createElement('li');
    newElement.className = 'list-group-item d-flex justify-content-between'

    const newLink = document.createElement('a');
    newLink.href = '#';
    newLink.className = 'delete-item';
    newLink.innerHTML = '<i class = "fa fa-remove"></i>'

    newElement.appendChild(document.createTextNode(newTodo))
    newElement.appendChild(newLink);
    
    todoList.appendChild(newElement);
    todoInput.value = "";

}