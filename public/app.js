/* global $ */
$(document).ready(() => {
    //get all the todos
    $.getJSON("/api/todos")
        .then(addToDos)
        .catch((err) => console.log(`Oops, something went wrong ${err}`))
    
    //add a todo        
    $('#todoInput').keypress((event) => {
      if(event.which === 13)  {
          createToDo();
      }
    });
    
    //update a todo
    $('.list').on('click', 'li', function() {
        updateToDo($(this));
    });
    
    //delete a todo
    $('.list').on('click', 'span', function(event) { 
        event.stopPropagation();
        removeToDo($(this).parent());
    });
});

//add an array of todos
let addToDos = (todos) => {
    todos.forEach((todo) => {
        addToDo(todo);
    });
}

//add a single to do
let addToDo = (todo) => {
    let newTodo = $(`<li class="task"> ${todo.name} <span>X</span></li>`);
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

//add a todo user created to api
let createToDo = () => {
    let userInput = $('#todoInput').val();
    $.post('/api/todos', { name: userInput })
        .done((newToDo) => {
            $('#todoInput').val('');
            addToDo(newToDo);
        })
        .fail((err) => console.log(`Oops, something went wrong ${err}`))
}


let updateToDo = (todo) => {
    let updateURL = `/api/todos/${todo.data('id')}`
    let isDone = !todo.data('completed');
    let updateData = { completed: isDone };

    $.ajax({
        method: 'PUT',
        url: updateURL,
        data: updateData
    })
        .done((updateToDo) => {
            todo.toggleClass('done');
            todo.data('completed', isDone);
        })
        .fail((err) => console.log(`Oops, something went wrong ${err}`))
}

//remove a todo from api
let removeToDo = (todo) => {
    let clickedId = todo.data('id');
    let deleteURL = `/api/todos/${clickedId}`;

    $.ajax({
      method: 'DELETE' ,
      url: deleteURL
    })
        .done((message) => todo.remove())
        .fail((err) => console.log(`Oops, something went wrong ${err}`))
}