
const DOM = {
    inputTodo: document.querySelector('#input-todo'),
    btnDo: document.querySelector('.btn-do'),
    listTodo: document.querySelector('.list-todo'),
    closeBtn: document.querySelector('.close-btn'),
    checkBoxes: document.querySelectorAll('.checkBox')
}

let todos = [];


const addTodo = () => {

    if(DOM.inputTodo.value !== ''){

        const inputVal = DOM.inputTodo.value;

        const newTodo = {
            id: todos.length,
            completed: false,
            value: inputVal
        }
    
        todos.push(newTodo);
    }

    let html = printTodos(todos);
    
    DOM.listTodo.insertAdjacentHTML('afterbegin', html);
    DOM.inputTodo.value = '';
}

const printTodos = (todos) => {

    const closeIcon = '<i class="far fa-times-circle close-btn"></i>';

    DOM.listTodo.innerHTML = '';
    
     let html = todos.map(todo => {
        return `<li class="list-group-item" data-completed="${todo.completed}" id="${todo.id}"><input type="checkbox" class="checkBox">${todo.value}${closeIcon}</li>`;
    })
    return html.join(' ');
}

const removeTodo = (event) => {

    if(event.target.classList.contains('close-btn')){
        let newTodos = todos.filter(el => {
            return el.id !== parseInt(event.target.parentNode.id)
        })
    
        let html = printTodos(newTodos);
        DOM.listTodo.insertAdjacentHTML('afterbegin', html);
        todos = newTodos;
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
