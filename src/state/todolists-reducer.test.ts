import {v1} from "uuid"
import {FilterValuesType, TodolistType} from "../App"
import {
    addTodolistAction,
    changeTodolistFilterAction,
    changeTodolistTitleAction,
    removeTodolistAction,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, removeTodolistAction(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState= [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})
test('correct todolist should be added', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    let newTodolistTitle = 'Kick me'

    // const startState: Array<TodolistType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ]

    const endState = todolistsReducer(startState, addTodolistAction(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

   startState= [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})
test('correct todolist title should be changed', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    let newTodolistTitle = 'Kick me'

    // const startState: Array<TodolistType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ]

    const endState = todolistsReducer(startState, changeTodolistTitleAction(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})
test('correct todolist filter should be changed', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    let newFilter: FilterValuesType = "completed"

    // const startState: Array<TodolistType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ]

    const endState = todolistsReducer(startState, changeTodolistFilterAction(newFilter, todolistId2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})