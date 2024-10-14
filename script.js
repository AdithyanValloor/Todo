const form = document.querySelector('form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')

let arrTodo = getTodo()
updateTodo()
console.log(arrTodo);


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    arrAdd()
})

function arrAdd(){
    const todoText = todoInput.value.trim()
    if(todoText){
        arrTodo.push(todoText)
        updateTodo()
        saveTodo()
        console.log('added');
        todoInput.value = ''
        // renderTodo(todoText)
    }else{
        console.log('failed');
    }
    console.log(arrTodo);
}

function updateTodo(){
    todoList.innerHTML = '';
    arrTodo.forEach((todo,todoIndex)=>{
        todoItem = renderTodo(todo,todoIndex)
        todoList.append(todoItem)
    })
}

function renderTodo(todoInput,todoIndex){
    const todoID = 'todo-'+todoIndex
    const todoLi = document.createElement('li')
    todoLi.className = 'todo'
    todoLi.innerHTML = `

        <input type="checkbox" id="${todoID}">
        <label class="check-box" for="${todoID}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoID}" class="todo-text">${todoInput}</label>
        <button type="button" class="btn-dlt">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>

    `
    const btnDlt = todoLi.querySelector('.btn-dlt')
    btnDlt.addEventListener('click',()=>{
        deleteTodo(todoIndex)
    })

    return todoLi
}

function saveTodo(){
    const todoJSON = JSON.stringify(arrTodo)

    localStorage.setItem('todos',todoJSON)
}

function deleteTodo(todoIndex){
    arrTodo = arrTodo.filter((_,i)=> i !== todoIndex )
    saveTodo()
    updateTodo()
}

function getTodo(){
    const todos = localStorage.getItem('todos') || '[]'
    return JSON.parse(todos)
}