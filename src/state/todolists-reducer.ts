import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid"

export const removeTodolistAction = (todolistId: string): removeTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAction = (newTitle: string,): addTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle, todolistId: v1()}
}

export const changeTodolistTitleAction = (todolistId: string, newTitle: string): changeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: todolistId, title: newTitle}
}

export const changeTodolistFilterAction = (newFilter: FilterValuesType, todolistId: string): changeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, filter: newFilter, id: todolistId}
}

export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type changeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}


export type changeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

export type ActionType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleType
    | changeTodolistFilterType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST' :
            return [...state, {id: action.todolistId, titleTodo: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(todo => {
                return todo.id === action.id ? {...todo, titleTodo: action.title} : todo
            })
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(todo => {
                return todo.id === action.id ? {...todo, filter: action.filter} : todo
            })
        default:
            return state;
    }
}


