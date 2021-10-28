const centerContent = document.querySelector('.momentum__center-content');

// initialize qoutes array of object
if (!getData('quotes')) {
    saveData('quotes', JSON.stringify(quotes));
}

// Check if a name is saved
if (!getData('name')) {
    // Ask and save user's name
    askName();
}
else {
    showMainContent(getData('name'));
}

//-- EVENT LISTERS

// Show/Hide todo tooltip
const todoBtn = document.querySelector('.todoLabel');
todoBtn.addEventListener('click', () => {
    const tooltip = document.querySelector('.tooltip');

    tooltip.classList.toggle('hidden');
})

// Todo input event handlers
const todoInput = document.querySelector('.todo');
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value.length !== 0 ) {
        const parentDiv = todoInput.parentElement;
        //  Create todolist in local storage
        if (!getData('todoList')) {  
            const arrTodos = [];
            saveData('todoList', JSON.stringify(arrTodos));
        } 

        // save todolist in array
        let todoList = JSON.parse(getData('todoList'));

        let todoId = 0;
        // Get largest id 
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].id >= todoId) {
                todoId = todoList[i].id + 1;
            }
        }

        // Create todo object
        const todo = {
            id: todoId,
            todo: todoInput.value
        };

        // push new todo in array then save new value in local storage
        todoList.push(todo);
        saveData('todoList', JSON.stringify(todoList));

        // Update todo display
        addTodo(todo);

        // Clear input 
        todoInput.value = '';

        // Remove flex center style
        parentDiv.classList.remove('flex-center');
    }
});

todoInput.addEventListener('focusout', (e) => {
    const todo = document.querySelector('.todo-list li');

    if (!todo) {
        if (e.target.value.length <= 0) {
            const todoBtn = document.querySelector('.todo-btn');

            if (todoBtn) {
                todoBtn.remove();
            }
            
            showTodoBtn();
        }
    }
});

// show qoute input on hover
const quoteBlock = document.querySelector('.quote-block');
quoteBlock.addEventListener('mouseover', (e) => {
    const inputQuote = document.querySelector('.add-quote');
    inputQuote.classList.remove('hidden');
});

quoteBlock.addEventListener('mouseleave', (e) => {
    const inputQuote = document.querySelector('.add-quote');
    inputQuote.classList.add('hidden');
});

// Save qoute when keypress "Enter"
const quoteInput = document.querySelector('.add-quote');
quoteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && quoteInput.value.length !== 0 ) {
        addQuote(quoteInput.value);
    }
});

//-- INTERVALS

// Updates time every 30 secs
setInterval(function () {
    if (document.body.contains(document.querySelector('.current-time'))) {
        updateTime()
    }
}, 30000);

    



