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
    h1.classList.add('font-large', 'animate-move-in-right', 'transition');
    h1.innerText = 'Hello, What is your name?';

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('name', 'fw', 'text-white', 'animate-move-in-bottom', 'transition');
    
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
    h2.classList.add('question', 'animate-move-in-left', 'transition');
    h2.innerText = 'What is your main focus for today?'

    const input = document.createElement('input');
    input.classList.add('focus', 'fw', 'text-white', 'animate-move-in-bottom', 'animation-delay-1', 'transition');
    input.type = 'text';

    centerContent.append(h2);
    centerContent.append(input); 

    // Submits main focus when pressing enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.length !== 0 ) {
            saveData('mainFocus', input.value);

            e.target.remove();
            h2.remove();
            showMainFocus(input.value);
        }
    });
}

const showCurrentTime = () => {
    // Current time
    const h1 = document.createElement('h1');
    h1.innerText = getCurrentTime();
    h1.classList.add('current-time', 'animate-fade-in', 'transition');
  
    centerContent.append(h1);
}

const showGreeting = (name) => {
    const today = new Date();
    const hour = today.getHours();

    let greeting = `Good ${hour < 17 ? 'morning' : 'evening'}, ${name}`;
    const h2 = document.createElement('h2');
    h2.classList.add('greeting', 'font-large', 'animate-move-in-right', 'transition');
    h2.innerText = greeting;

    centerContent.append(h2);
}

const showMainFocus = (mainFocus) => {
    const div = document.createElement('div');
    div.classList.add( 'text-center')

    const p1 = document.createElement('p');
    p1.textContent = "Today";
    p1.classList.add('font-medium');

    const p2 = document.createElement('p');
    p2.textContent = mainFocus;
    p2.classList.add('main-focus', 'font-large', 'font-bold', 'ml--1', 'mr--1');

    const div2 = document.createElement('div');
    div2.classList.add('mainfocus-container', 'flex-center', 'flex-row-reverse');

    const checkbox = document.createElement('input');
    checkbox.classList.add('hidden', 'main-focus__checkbox', 'checkbox--lg');
    checkbox.type = 'checkbox';
    checkbox.setAttribute("id", "check-box_1");
    
    const deleteBtn = document.createElement('a');    
    deleteBtn.setAttribute("href", "#");
    deleteBtn.setAttribute("id", "main-focus-delete");
    deleteBtn.classList.add('hidden', 'btn', 'btn--error', 'btn--sm');
    deleteBtn.textContent = 'x';

    div2.append(deleteBtn);
    div2.append(p2);
    div2.append(checkbox);

    div.append(p1);
    div.append(div2);

    centerContent.append(div);

    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            deleteBtn.classList.remove('hidden');
            p2.classList.add('text-cross-out');
        }
        else {
            deleteBtn.classList.add('hidden');
            p2.classList.remove('text-cross-out');
        }
    });

    deleteBtn.addEventListener('click', (e) => {
        console.log('test');
        deleteMainFocus(e.target.id);
    });
}

const showQuote = () => {

    const quoteEl = document.querySelector('p.quote');
    quoteEl.classList.add('font-medium', 'animate-move-in-top', 'transition');

    const quotes = JSON.parse(getData('quotes'));
    // Get random qoute
    var n = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = `"${quotes[n].quote}"`;
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
        todoBtn.remove();
    }

    const parentDiv = document.querySelector('.todo-list').parentElement;
    parentDiv.classList.add('flex-center');

    const p = document.createElement('p');
    p.textContent = "Add a todo to get started";
    p.classList.add('font-default', 'text-grey', 'mb--2', 'font-bold');

    const input = document.querySelector('.todo');
    input.classList.add('hidden', 'text-grey');
    input.style.caretColor = '#000';

    const btn = document.createElement('button');
    btn.classList.add('todo-btn', 'hw', 'btn', 'btn--primary', 'btn--rounded', 'mb--2');
    btn.textContent = 'New Todo \u002B';

    parentDiv.insertBefore(btn, input);
    parentDiv.insertBefore(p, btn);

    btn.addEventListener('click', (e) => {
        input.classList.remove('hidden');
        input.focus();
        btn.remove();
        p.remove();
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
    // Unhide todo box
    const todoBox = document.querySelector('div.todo-box');
    todoBox.classList.remove('hidden');
    todoBox.classList.add('animate-fade-in', 'transition');

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
            deleteBtn.classList.add(`todo-delete_${todoList[i].id}`, 'hidden', 'btn', 'btn--error', 'btn--sm');
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

const deleteMainFocus = () => {
    const mainFocusDiv = document.querySelector('.mainfocus-container');
    mainFocusDiv.parentElement.remove();

    localStorage.removeItem('mainFocus');

    askMainFocus();
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
    deleteBtn.setAttribute("id", todo.id);
    deleteBtn.setAttribute("href", "#"); 
    deleteBtn.classList.add(`todo-delete_${todo.id}`, 'hidden', 'btn', 'btn--error', 'btn--sm');
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
    saveData('quotes', JSON.stringify(quotes)); 

    quoteInput.value = '';
    qouteEl.textContent = `"${quoteVal}"`;
}