
const DOM = {
    inputTodo: document.querySelector('#input-todo'),
    btnDo: document.querySelector('.btn-do'),
    listTodo: document.querySelector('.list-todo'),
    closeBtn: document.querySelector('.close-btn')
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
        //console.log(todos)
    }

    let html = printTodos(todos);
    
    DOM.listTodo.insertAdjacentHTML('afterbegin', html);
    DOM.inputTodo.value = '';
}

const printTodos = (todos) => {
    const closeIcon = '<i class="far fa-times-circle close-btn"></i>';

    DOM.listTodo.innerHTML = '';
    
     let html = todos.map(todo => {
        return `<li class="list-group-item" data-completed="${todo.completed}" id="${todo.id}">${todo.value}${closeIcon}</li>`;
    })
    return html.join(' ');
}

const removeTodo = (event) => {

    let newTodos = todos.filter(el => {
        return el.id !== parseInt(event.target.parentNode.id)
    })
    console.log(event.target.parentNode.id)
    let html = printTodos(newTodos);
    DOM.listTodo.insertAdjacentHTML('afterbegin', html);
    todos = newTodos;
}

const init = () => {
    DOM.btnDo.addEventListener('click', addTodo);
    DOM.listTodo.addEventListener('click', removeTodo);
}

init();
