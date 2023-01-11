import {TodolistType} from "../App";
import { v1 } from "uuid"

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string,
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
}
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType


export const tasksReducer = (state: Array<TodolistType>, action: ActionType) =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST' :

            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        default:
            throw new Error("I don't understand this type")
    }
}
