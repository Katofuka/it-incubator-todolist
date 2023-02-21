import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {tasksApi, TaskStatus, TaskType} from "../API/task-api";
import {Dispatch} from 'redux';
import {AppRootStateType} from "./store";

const initialState: TasksDomainType = {}

const REMOVETASK = 'REMOVE-TASK'
const ADDTASK = 'ADD-TASK'
const CHANGESTATUS = 'CHANGE-TASK-STATUS'
const CHANGETITLE = 'CHANGE-TASK-TITLE'
const ADDTODOLIST = 'ADD-TODOLIST'
const REMOVETODOLIST = 'REMOVE-TODOLIST'
const SETTODOLISTS = 'SET-TODOLISTS'
const SETTASKS = 'SET-TASKS'

export const tasksReducer = (state: TasksDomainType = initialState, action: ActionsType): TasksDomainType => {
    switch (action.type) {
        case REMOVETASK: {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case ADDTASK: {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case CHANGESTATUS: {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, status: action.status}
                        : t)
            };
        }
        case CHANGETITLE: {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            };
        }
        case ADDTODOLIST: {
            debugger
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case REMOVETODOLIST: {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case SETTODOLISTS: {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case SETTASKS: {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy;
        }
        default:
            return state;
    }
}

//action creators
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: REMOVETASK, taskId: taskId, todolistId: todolistId} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: ADDTASK, task} as const)

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatus) =>
    ({type: CHANGESTATUS, todolistId, taskId, status} as const)

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) =>
    ({type: CHANGETITLE, todolistId, taskId, title} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: SETTASKS, tasks: tasks, todolistId: todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(responseTasks => {
            const tasks = responseTasks
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(response => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title)
        .then(task => {
            dispatch(addTaskAC(task))
        })
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatus) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId];
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }
        tasksApi.updateTask(todolistId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status,
        })
            .then(() => {
                dispatch(changeTaskStatusAC(todolistId, taskId, status))
            })
    }

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId];
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }
        tasksApi.updateTask(todolistId, taskId, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
        })
            .then((respTask) => {
                dispatch(changeTaskTitleAC(respTask.todoListId, respTask.id, respTask.title))
            })

    }

//types
export type TasksDomainType = {
    [key: string]: Array<TaskType>
}

type ActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType