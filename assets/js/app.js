const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOptions = document.querySelector('.filter-todo')
const user = prompt('A quem pertence essa lista?')

if (user) {
  const todoTitle = document.getElementById('userName')
  todoTitle.textContent = `${user}'s todo list`
} else {
  const todoTitle = document.getElementById('userName')
  todoTitle.textContent = `New todo list`
}

function addTodo(e) {
  e.preventDefault()

  if (todoInput.value === '') {
    alert('A tarefa está vazia')
  } else {
    const todoDiv = document.createElement('div')
    const newTodo = document.createElement('li')

    todoDiv.classList.add('todo')
    newTodo.innerText = todoInput.value

    saveLocalTodos(todoInput.value)
    newTodo.classList.add('todo-item')
    todoInput.value = ''

    const completedButton = document.createElement('button')
    completedButton.classList.add('complete-button')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'

    const trashButton = document.createElement('button')
    trashButton.classList.add('trash-button')
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

    todoDiv.appendChild(newTodo)
    todoDiv.appendChild(completedButton)
    todoDiv.appendChild(trashButton)
    todoList.appendChild(todoDiv)
  }
}

function deleteCheck(e) {
  const item = e.target

  if (item.classList[0] === 'trash-button') {
    const todo = item.parentElement
    removeLocalTodos(todo)
    todo.remove()
  }

  if (item.classList[0] === 'complete-button') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

function filter(e) {
  const todos = todoList.childNodes

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break

      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break

      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

function getTodos() {
  let todos

  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div')
    const newTodo = document.createElement('li')

    todoDiv.classList.add('todo')

    newTodo.classList.add('todo-item')
    newTodo.innerText = todo

    const completedButton = document.createElement('button')
    completedButton.classList.add('complete-button')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'

    const trashButton = document.createElement('button')
    trashButton.classList.add('trash-button')
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

    todoList.appendChild(todoDiv)
    todoDiv.appendChild(newTodo)
    todoDiv.appendChild(completedButton)
    todoDiv.appendChild(trashButton)
  })
}

function saveLocalTodos(todo) {
  let todos

  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLocalTodos(todo) {
  let todos

  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  // parte complexa
  const todoIndex = todo.children[0].innerText //numero do index do elemento
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}



document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOptions.addEventListener('click', filter)
