import {FilterValuesType, TodolistType} from "../App";
import { v1 } from "uuid"

export const removeTodolistAction = (todolistId: string): removeTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAction = (newTitle: string,): addTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle, todolistId: v1()}
}

export const changeTodolistTitleAction = (todolistId:string, newTitle: string): changeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: todolistId, title: newTitle}
}

export const changeTodolistFilterAction = (todolistId:string, newFilter: FilterValuesType): changeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, id: todolistId, filter: newFilter}
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
    id: string
    filter: FilterValuesType
}

type ActionType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleType
    | changeTodolistFilterType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST' :
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE' :                       
            return state.map(todo => {
                return todo.id === action.id ? {...todo, title: action.title} : todo
                
            })
            // let todo = state.find(tl => tl.id === action.id)
            // if (todo) {
            //     todo.title = action.title;                
            // }
            // return [...state]
            case 'CHANGE-TODOLIST-FILTER' :                       
            // return state.map(todo => {if (todo.id === action.id)
            //     todo.filter = action.filter
            //     return todo
            // })
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter                
            }
            return [...state]
        
        default:
            throw new Error("I don't understand this type")
    }
}


