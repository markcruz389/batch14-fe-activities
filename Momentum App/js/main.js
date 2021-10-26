const centerContent = document.querySelector('.momentum__center-content');

const saveData = (key, value) => {
    if (key === '' || key === null || key === undefined) {
        console.log('Invalid data');
        return;
    }

    localStorage.setItem(key, value);
}

const getData = (key) => {
    const data = localStorage.getItem(key);

    return data;
}

const clearCenterContent = () => {
    centerContent.textContent = '';
}

const askName = () => { 
    //  Create elements
    const h1 = document.createElement('h1');
    h1.innerText = 'Hello, What is your name?';

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('name');
    
    centerContent.append(h1);
    centerContent.append(input);

    // Submits name when pressing enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.length !== 0 ) {
            // user.name = input.value;
            saveData('name', input.value);
            showMainContent(getData('name'));
        }
    });
}

const askMainFocus = () => {
    // Create elements
    const h2 = document.createElement('h2');
    h2.classList.add('question');
    h2.innerText = 'What is your main focus for today?'

    const input = document.createElement('input');
    input.classList.add('focus');
    input.type = 'text';

    centerContent.append(h2);
    centerContent.append(input); 

    // Submits main focus when pressing enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.length !== 0 ) {
            saveData('mainFocus', input.value);
        }
    });
}

const showCurrentTime = () => {
    // Current time
    const h1 = document.createElement('h1');
    h1.innerText = getCurrentTime();
    h1.classList.add('current-time');
  
    centerContent.append(h1);
}

const showGreeting = (name) => {
    const today = new Date();
    const hour = today.getHours();

    let greeting = `Good ${hour < 17 ? 'morning' : 'evening'}, ${name}`;
    const h2 = document.createElement('h2');
    h2.classList.add('greeting');
    h2.innerText = greeting;

    centerContent.append(h2);
}

const showMainFocus = (mainFocus) => {
    const div = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    p1.textContent = "today";
    p2.textContent = mainFocus;

    div.append(p1);
    div.append(p2);
    centerContent.append(div);
}

const showQuote = () => {
    const quote = document.querySelector('p.quote');

    // Get random qoute
    var n = Math.floor(Math.random() * (quotes.length - 0) + 0);
    quote.textContent = quotes[n].quote;

    // console.log(quotes[n].quote);
}

const showMainContent = (name) => {
    clearCenterContent();

    showQuote();
    showCurrentTime();
    showGreeting(name);

    loadTodos();
    

    if (!getData('mainFocus')) {
        askMainFocus();
    } 
    else {
        showMainFocus(getData('mainFocus'));
    }
}

const showTodoBtn = () => {
    const todoBtn = document.querySelector('.todo-btn');

    if (todoBtn) {
        // todoBtn.style.display = 'none';
        todoBtn.remove();
    }

    const parentDiv = document.querySelector('.todo-list').parentElement;
    parentDiv.classList.add('flex-center');

    const input = document.querySelector('.todo');
    input.classList.add('hidden');

    const btn = document.createElement('button');
    btn.classList.add('todo-btn');
    btn.classList.add('hw');
    btn.textContent = 'New Todo';

    parentDiv.insertBefore(btn, input);

    btn.addEventListener('click', (e) => {
        input.classList.remove('hidden');
        input.focus();
        // btn.classList.add('hidden');
        // btn.style.display = 'none';
        btn.remove();
    });
}

const updateTime = () => {
    const timeElement = document.querySelector('.current-time');
    timeElement.innerText = getCurrentTime();
}

const getCurrentTime = () => {
    // Get and showcurrent time
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getUTCMinutes() < 10 ? '0' + today.getUTCMinutes() : today.getUTCMinutes();
    const currentTime = `${hour} : ${minutes}`;

    return currentTime;
}

const loadTodos = () => {
    const todoList = JSON.parse(getData('todoList'));

    if (todoList === null || todoList.length === 0) {
        showTodoBtn();
    }
    else {
        const OlTodo = document.querySelector('.todo-list');

        for (let i = 0; i < todoList.length; i++) {
            const div = document.createElement('div');
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute("id", todoList[i].id);

            const label = document.createElement('label');
            label.textContent = todoList[i].todo;

            const deleteBtn = document.createElement('a');    
            deleteBtn.setAttribute("href", "#");
            deleteBtn.setAttribute("id", todoList[i].id);
            deleteBtn.classList.add(`todo-delete_${todoList[i].id}`);
            deleteBtn.classList.add('hidden');
            deleteBtn.textContent = 'x'; 

            div.append(checkbox);
            div.append(label);
            li.append(div);
            li.append(deleteBtn);
            OlTodo.append(li);

            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const deleteBtn = document.querySelector(`.todo-delete_${e.target.id}`);
                    deleteBtn.classList.remove('hidden');
                }
                else {
                    deleteBtn.classList.add('hidden');
                }
            });

            deleteBtn.addEventListener('click', (e) => {
                console.log('test');
                deleteTodo(e.target.id);
            });
        }
    }

}

const deleteTodo = (id) => {
    const deleteBtn = document.querySelector(`.todo-delete_${id}`);
    deleteBtn.parentElement.remove();

    let todoList = JSON.parse(getData('todoList'));
    
    // Remove deleted todo in array
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === parseInt(id)) {
            todoList.splice(i, 1);
        } 
    }

    // Save updated array in local storage
    saveData('todoList', JSON.stringify(todoList));

    // Show button when list is empty
    const todo = document.querySelector('.todo-list li');
    if (!todo) {
        showTodoBtn();
    }
}

const addTodo = (todo) => {
    const OlTodo = document.querySelector('.todo-list');

    const div = document.createElement('div');
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute("id", todo.id);

    const label = document.createElement('label');
    label.textContent = todo.todo;

    const deleteBtn = document.createElement('a');   
    deleteBtn.classList.add('hidden');
    deleteBtn.classList.add(`todo-delete_${todo.id}`);
    deleteBtn.setAttribute("href", "#");
    deleteBtn.setAttribute("id", todo.id);
    deleteBtn.textContent = 'x'; 

    div.append(checkbox);
    div.append(label);
    li.append(div);
    li.append(deleteBtn);
    OlTodo.append(li);

    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            const deleteBtn = document.querySelector(`.todo-delete_${e.target.id}`);
            deleteBtn.classList.remove('hidden');
        }
        else {
            deleteBtn.classList.add('hidden');
        }
    });

    deleteBtn.addEventListener('click', (e) => {
        console.log('test');
        deleteTodo(e.target.id);
    });
}

const addQuote = (quoteVal) => {
    const qouteEl = document.querySelector('p.quote');
    const quoteInput = document.querySelector('.add-quote');

    let quotes = JSON.parse(getData('quotes'));

    // Create quote and push object
    const quote = {
        id: quotes.length + 1,
        quote: quoteVal
    };
    quotes.push(quote);

    // Save quote object
    saveData('quotes', JSON.stringify(quote));

    quoteInput.value = '';
    qouteEl.textContent = quoteVal;
}

// initialize qoutes object
if (!getData('qoutes')) {
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

        // Create todo object
        const todo = {
            id: todoList.length,
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

// Updates time every 30 secs
setInterval(function () {
    if (document.body.contains(document.querySelector('.current-time'))) {
        updateTime()
    }
}, 30000);

    



