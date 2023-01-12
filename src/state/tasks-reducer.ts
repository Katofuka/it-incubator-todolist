import {TasksStateType} from "../App";
import {v1} from "uuid"
import {addTodolistActionType, removeTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string,
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string,
}

export type ChangeStatusTaskActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todolistId: string,
}

export type ChangeTitleTaskActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    todolistId: string,
    title: string,
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | addTodolistActionType
    | removeTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            let task = {id: v1(), title: action.title, isDone: false};
            let todolistTasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [task, ...todolistTasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,[action.todolistId]: state[action.todolistId]
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone}:t)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state,[action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title}:t)}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = []
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAction = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAction = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}


export const changeTaskStatusAction = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusTaskActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAction = (taskId: string, todolistId: string, title: string): ChangeTitleTaskActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}

