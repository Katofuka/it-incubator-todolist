import {todolistAPI, TodolistType} from "../../API/todolist-api";
import {RequestStatusType, setAppErrorAction, setAppStatusAction} from "../../app/app-reducer";
import {fetchTasksTC} from "./tasks-reducer";
import {AppThunkType} from "../../app/store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                addedDate: '',
                order: 0,
                title: action.title,
                filter: 'all',
                entityStatus: 'idle'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state;
    }
}

//action creators
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId} as const)

export const addTodolistAC = (todolistId: string, title: string) =>
    ({type: 'ADD-TODOLIST', todolistId, title} as const)

export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)

export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)


//thunks
export const fetchTodolistsTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAction('loading'))
    todolistAPI.getTodolists()
        .then((response) => {
            dispatch(setTodolistsAC(response.data))
            dispatch(setAppStatusAction('succeeded'))
            return response.data
        })
        .then((todolists) => {
            console.log(todolists)
            todolists.forEach(tl => dispatch(fetchTasksTC(tl.id)))
        })
    // .catch((err) => console.log(err))
}

export const removeTodolistTC = (todolistId: string): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAction('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        await todolistAPI.deleteTodolist(todolistId)
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAction('succeeded'))

    }

export const createTodolistTC = (title: string): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAction('loading'))
        const data = await todolistAPI.createTodolist(title)
        if (data.resultCode === 0) {
            dispatch(addTodolistAC(data.data.item.id, data.data.item.title))
            dispatch(setAppStatusAction('succeeded'))
        } else {
            data.messages.length
                ? dispatch(setAppErrorAction(data.messages[0]))
                : dispatch(setAppErrorAction('Some error occurred'))
        }
    }

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAction('loading'))
        await todolistAPI.updateTodolist(todolistId, title)
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatusAction('succeeded'))
    }

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ChangeTodolistEntityStatusActionType
