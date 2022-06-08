const input = document.getElementById("input");
const addTodoButton = document.getElementById("addTodoButton");

addTodoButton.addEventListener("click", newElement);
const result = document.querySelector('ul');
const todos = result.innerHTML;

function toLocal() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

result.addEventListener('click', function (ev) {
    if(ev.target.tagName === "LI") {
        ev.target.classList.add('completed');
        toLocal();
        updateCounters();
    } else if (ev.target.tagName === "SPAN") {
        let div = ev.target.parentNode;
        div.remove();
        updateCounters();
        toLocal();
    }}, false);

function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("input").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("=)");
    } else {
        document.getElementById("result").appendChild(li);
    }
    document.getElementById("input").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    const close = document.getElementsByClassName("close");

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            const div = this.parentElement;
            div.style.display = "none";
        }
    }

    toLocal();
    updateCounters();
}

function handleKeyPress(e){
    let key=e.keyCode || e.which;
    if (key === 13){ // Клавиша Enter
        newElement();
        toLocal();
    }
}

if (localStorage.getItem('todos')) {
    todoUL.innerHTML = localStorage.getTtem('todos');
}

// Показать все дела
function showAll() {
    const todoList = document.getElementsByTagName("li");

    for (let i = 0; i < todoList.length; i++) {
        if (todoList.item(i).classList.contains('hide')) {
            //todoList.item(i).style.display = 'flex';
            todoList.item(i).classList.remove('hide');
        }

    }
}

// Показать выполненные дела
function showChecked() {
    const todoList = document.getElementsByTagName("li");

    for (let i = 0; i < todoList.length; i++) {
        if (todoList.item(i).classList.contains('completed')) {
            todoList.item(i).classList.remove('hide');
        }
        else {
            todoList.item(i).classList.add('hide');
        }
    }
}

// Показать несделанное
function showUnfinished() {
    const todoList = document.getElementsByTagName("li");

    for (let i = 0; i < todoList.length; i++) {
        if (todoList.item(i).classList.contains ('completed')) {
            todoList.item(i).classList.add('hide');
        }
        else {
            todoList.item(i).classList.remove('hide');
        }
    }
}

function updateCounters() {
    const allCount = document.getElementById('allCount');
    let doneCount = document.getElementById('doneCount');
    let notDoneCount = document.getElementById('notDoneCount');
    let allNum = document.querySelectorAll('li').length.toString();
    let doneNum = document.querySelectorAll('li.completed').length.toString()
    let notDoneNum = allNum - doneNum;

    allCount.innerText = allNum;
    doneCount.innerText = doneNum;
    notDoneCount.innerText = notDoneNum.toString();
}