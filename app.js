// selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

// event listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)

// functions
function addTodo(event) {
  //evita de enviar o form antes da hora
  event.preventDefault()

  //create todo div
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  //create li
  const newTodo = document.createElement('li')
  newTodo.innerHTML = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)

  // complete button
  const completedButton = document.createElement('button')
  //se fosse usar innetText, o que está dentro das aspas ficaria em texto, ao colocar innerHTML, o que acontece é que cria-se um novo elemento, no caso se cria um icone
  completedButton.innerHTML = '<i class="fas fa-check"> </i>'
  completedButton.classList.add('complete-button')
  todoDiv.appendChild(completedButton)

  // delete button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>'
  trashButton.classList.add('trash-button')
  todoDiv.appendChild(trashButton)

  //append to list
  todoList.appendChild(todoDiv)

  // clear todo input value
  todoInput.value = ''
}

function deleteCheck(e) {
  const item = e.target

  //delete todo
  if (item.classList[0] === 'trash-button') {
    const todo = item.parentElement
    // animation
    todo.classList.add('fall')
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })
  }

  //check mark
  if (item.classList[0] === 'complete-button') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}
