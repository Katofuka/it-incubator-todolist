import {FilterValuesType, TodolistType} from "../App";
import { v1 } from "uuid"
import { title } from "process";

export const RemoveTodolistAction = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAction = (newTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle}
}


export const ChangeTodolistTitileAction = (todolistId:string, newTitle: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: todolistId, title: newTitle}
}

export const ChangeTodolistFilterAction = (todolistId:string, newFilter: FilterValuesType): ChangeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, id: todolistId, filter: newFilter}
}


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string,
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
}

export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string,
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType,
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST' :
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE' :                       
            return state.map(todo => {if (todo.id === action.id)
                todo.title = action.title
                return todo
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

