import {
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    ChangeTodolistEntityStatusActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, tasksApi, TaskStatus, TaskType, UpdateTaskModelType} from "../../API/task-api";
import {Dispatch} from 'redux';
import {AppRootStateType} from "../../app/store";
import {SetAppErrorActionType, setAppStatusAction, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TasksDomainType = {}

export const tasksReducer = (state: TasksDomainType = initialState, action: ActionsType): TasksDomainType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case 'SET-TODOLISTS':
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};
        default:
            return state;
    }
}

//action creators
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAction('loading'))
    tasksApi.getTasks(todolistId)
        .then(responseTasks => {
            dispatch(setTasksAC(responseTasks, todolistId))
            dispatch(setAppStatusAction('succeeded'))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAction('loading'))
    tasksApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAction('succeeded'))
        })
}

export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType | ChangeTodolistEntityStatusActionType>) => {
        dispatch(setAppStatusAction('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        tasksApi.createTask(todolistId, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTaskAC(response.data.data.item))
                    dispatch(setAppStatusAction('succeeded'))

                } else {
                    handleServerAppError(response.data, dispatch)
                }
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
                dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            })
    }

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType | ChangeTodolistEntityStatusActionType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAction('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId];
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType =
            {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC(response.data.data.item.todoListId, response.data.data.item.id, domainModel))
                    dispatch(setAppStatusAction('succeeded'))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
                dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            })
    }

//types
export type UpdateDomainTaskModelType = {
    title?: string,
    startDate?: string,
    priority?: TaskPriorities,
    description?: string,
    deadline?: string,
    status?: TaskStatus,
}

export type TasksDomainType = {
    [key: string]: Array<TaskType>
}

type ActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType