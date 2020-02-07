
const DOM = {
    inputTodo: document.querySelector('#input-todo'),
    btnDo: document.querySelector('.btn-do'),
    listTodo: document.querySelector('.list-todo'),
    closeBtn: document.querySelector('.close-btn'),
    checkBoxes: document.querySelectorAll('.checkBox')
}


let todosList = (function() {
    let todos = [];

    return {
        getTodos: function() {
            return todos;
        },
        setTodos: function(obj){
            todos.push(obj)
        },
        replaceTodos: function(obj){
            todos = obj;
        }
    }
}())


const addTodo = () => {

    if(DOM.inputTodo.value !== ''){

        const inputVal = DOM.inputTodo.value;

        let todos = todosList.getTodos()

        const newTodo = {
            id: todos.length,
            completed: false,
            value: inputVal
        }
    
        todosList.setTodos(newTodo);
    }

    let html = printTodos(todosList.getTodos);
    
    DOM.listTodo.insertAdjacentHTML('afterbegin', html);
    DOM.inputTodo.value = '';
}

const printTodos = (todos) => {

    const closeIcon = '<i class="far fa-times-circle close-btn"></i>';

    DOM.listTodo.innerHTML = '';
    
     let html = todosList.getTodos().map(todo => {
        return `<li class="list-group-item" data-completed="${todo.completed}" id="${todo.id}"><input type="checkbox" class="checkBox">${todo.value}${closeIcon}</li>`;
    })
    return html.join(' ');
}

const removeTodo = (event) => {

    if(event.target.classList.contains('close-btn')){
        let newTodos = todosList.getTodos().filter(el => {
            return el.id !== parseInt(event.target.parentNode.id)
        })
        console.log(newTodos)
        todosList.replaceTodos(newTodos);
        let html = printTodos(newTodos);
        DOM.listTodo.insertAdjacentHTML('afterbegin', html);
        
    } 
}

const crossOut = (event) => {
    if(event.target.classList.contains('checkBox')){
        event.target.parentNode.classList.toggle("lineThrough")
    }
}

const init = () => {
    DOM.btnDo.addEventListener('click', addTodo);
    DOM.listTodo.addEventListener('click', removeTodo);
    DOM.listTodo.addEventListener('change', crossOut);
}

init();
