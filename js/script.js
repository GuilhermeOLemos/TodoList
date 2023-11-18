// Menu Lateral
// const navbar = document.querySelector('nav')
const optionsText = document.querySelectorAll('.options-text')
const divs = document.querySelectorAll('.container')

//! Atalhos
const $ = document.querySelector.bind(document)

// ----------------------------------------------------------------------------------------------------- //
// open menu
//! corrigir responsividade
function openMenu() {
    $('nav').style.width = 'fit-content'
    $('#menu-open-icon').style.display = 'none'
    $('#menu-close-icon').style.display = 'block'
    $('#open-close-icon').style.justifyContent = 'flex-end'

    // exibindo textos das opções do menu
    for (i = 0; i < optionsText.length; i++) {
        optionsText[i].style.opacity = '100'
        optionsText[i].style.translate = '0 0'
    }
}

$('#menu-open-icon').addEventListener('click', openMenu)
$('nav').addEventListener('mouseover', openMenu)


// close menu
//! corrigir responsividade
function closeMenu() {
    $('nav').style.width = '3rem' // desktop size
    //  $('nav').style.width = '6vw' // smartphone size
    $('#menu-close-icon').style.display = 'none'
    $('#menu-open-icon').style.display = 'block'
    $('#open-close-icon').style.justifyContent = ''

    // ocultando textos das opções do menu
    for (i = 0; i < optionsText.length; i++) {
        optionsText[i].style.opacity = '0'
        optionsText[i].style.translate = '-5rem 0'
    }
}

$('#menu-close-icon').addEventListener('click', closeMenu)
$('nav').addEventListener('mouseout', closeMenu)
// ----------------------------------------------------------------------------------------------------- //
//* exibindo telas
function show(name) {
    for (i = 0; i < divs.length; i++) {
        if (name === divs[i].id) {
            // divs[i].style.display = 'flex'
            divs[i].style.translate = '0 0'
            divs[i].style.scale = '1'
            divs[i].style.display = 'flex'
        }
        if (name !== divs[i].id) {
            divs[i].style.translate = '0 100vh'
            divs[i].style.scale = '0.01'
        }
    }
}


//* ocultando todas as telas
function hide() {
    for (i = 0; i < divs.length; i++) {
        divs[i].style.translate = '0 100vh'
        divs[i].style.scale = '0.01'
        divs[i].style.display = 'none'
    }
}

//* ocultando telas ao carregar a página
window.addEventListener('load', function () {
    $('#lightmode-icon').style.display = 'none'
    document.body.style.background = 'var(--lmcolor-bg)'
    $('#logo').style.filter = 'brightness(0.2)'
    hide()
})
// ----------------------------------------------------------------------------------------------------- //
//* retornando telas
var clicked = false
function toggleScreens(screen) {
    if (!clicked) {
        show(screen)
        clicked = true
    } else {
        hide(screen)
        clicked = false
    }
}

//* retornando a tela inicial
$('#home-icon').addEventListener('click', (() => {
    hide()
    clicked = false
}))

//* exibindo lista de tarefas
$('#task-icon').addEventListener('click', (() => {
    toggleScreens('task')
}))

//* exibindo anotações
$('#notes-icon').addEventListener('click', (() => {
    toggleScreens('notes')
}))

//* exibindo temporizador
$('#schedule-icon').addEventListener('click', (() => {
    toggleScreens('schedule')
}))

//* exibindo configurações
$('#settings-icon').addEventListener('click', (() => {
    toggleScreens('settings')
}))
// ----------------------------------------------------------------------------------------------------- //
// task 
// seleção de elementos
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')


let oldInputValue

// funções
const saveTodo = (text) => {
    //gerando o todo

    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h4')
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<span class="material-symbols-outlined">done</span>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo')
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    //limpando input
    todoInput.value = ''
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}


const updateTodo = (text) => {

    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector('h4')

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }

    })
}

// eventos
// ? adicionar função no enter
// ? cancelar função ao clicar em outro lugar

// adicionando uma tarefa
todoForm.addEventListener('submit', function (e) {

    //faz com que o formulário não seja enviado quando clicar
    e.preventDefault()

    //pega o valor que o usuário digitou
    const inputValue = todoInput.value

    if (inputValue) {
        //salvando o todo
        saveTodo(inputValue)
    }
})

// opções de modificação da tarefa
document.addEventListener('click', function (e) {

    const targetEl = e.target

    //elemento pai
    const parentEl = targetEl.closest('div')

    let todoTitle

    // checando se o elemento possui titulo
    if (parentEl && parentEl.querySelector('h4')) {
        todoTitle = parentEl.querySelector('h4').innerText
    }

    // finalizar tarefa
    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done')
    }

    // remover tarefa
    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove()
    }

    // editar tarefa
    if (targetEl.classList.contains('edit-todo')) {
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})



// filtrando tarefa
//! filtragem não funciona corretamente
// const select = document.querySelector('#filter-select')
// const todo = document.querySelectorAll('.todo')
// select.value = 'default'

// select.addEventListener('change', () => {
//     console.log(select.value) // checagem de saída

//     for (i = 0; i < todo.length; i++){
//             ///todo[i].style.display = 'flex'
//     }

//     if (select.value === 'done') {
//         for (i = 0; i < todo.length; i++){
//             if (!todo[i].classList.contains('done')){
//                 ///todo[i].style.display = 'none'
//             }
//         }
//     }

//     if (select.value === 'todo') {
//         for (i = 0; i < todo.length; i++){
//             if (todo[i].classList.contains('done')){
//                 ///todo[i].style.display = 'none'
//             }
//         }
//     }

// })

//! testes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //

//completar no click
// //! está selecionando a div de fundo
///desabilitando todos os botos de finalizar tarefa
// const allFinishBtn = document.querySelectorAll('.finish-todo')

// for (i = 0; i < allFinishBtn.length; i++) {
//     allFinishBtn[i].style.display = 'none'
// }

// document.querySelector('#todo-list').addEventListener('click', function (e) {


//     const targetEl = e.target

//     //elemento pai
//     const parentEl = targetEl.closest('div')

//     parentEl.classList.toggle('done')
// })

// //! não está funcionando
// document.querySelector('#todo-list').addEventListener('dblclick', function (e) {
//     if (e.classList.contains('done')) {
//         return false
//     } else {
//         toggleForms()

//         let todoTitle
//         // checando se o elemento possui titulo
//         ///todoTitle = parentEl.querySelector('h4').innerText

//         editInput.value = todoTitle
//         oldInputValue = todoTitle
//     }
// })

//! fim teste xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //


cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInput) {
        //atualizar lista
        updateTodo(editInputValue)
    }

    toggleForms()
})

// ----------------------------------------------------------------------------------------------------- //
// notes




// ----------------------------------------------------------------------------------------------------- //
// schedule



// ----------------------------------------------------------------------------------------------------- //
//? refazer
// dark mode
$('#darkmode-icon').addEventListener('click', (() => {
    document.body.style.background = 'var(--dmcolor-bg)'
    $('#lightmode-icon').style.display = 'flex'
    $('#darkmode-icon').style.display = 'none'
    $('#logo').style.filter = 'brightness(1)'
}))

// light mode
$('#lightmode-icon').addEventListener('click', (() => {
    document.body.style.background = 'var(--lmcolor-bg)'
    $('#darkmode-icon').style.display = 'flex'
    $('#lightmode-icon').style.display = 'none'
    $('#logo').style.filter = 'brightness(0.2)'
}))

// ----------------------------------------------------------------------------------------------------- //
// settings
const bgColor = $('#color-change')

bgColor.addEventListener('change', function () {
    document.body.style.background = bgColor.value
})