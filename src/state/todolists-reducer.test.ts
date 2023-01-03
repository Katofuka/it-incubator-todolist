import { act } from "react-dom/test-utils";
import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"
import {todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'Kick me'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist title should be changed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'Kick me'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(
        startState, 
        {
            type: 'CHANGE-TODOLIST-TITLE', 
            id: todolistId2, 
            title: newTodolistTitle
        }
    )

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist filter should be changed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(
        startState, 
        {
            type: 'CHANGE-TODOLIST-FILTER' as const, 
            id: todolistId2, 
            filter: newFilter
        }
    )

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})