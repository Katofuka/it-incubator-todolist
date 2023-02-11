import axios from 'axios';

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgentrly = 3,
    Later = 4,
}

export type TaskType = {
    id: string
    description: string
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
}

type TaskResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '1c6fc31b-2023-4b84-8640-ac2aa0578411',
    },
})

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TaskType>(`${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType<{}>>(`${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<TaskResponseType<{}>>(`${todolistId}/tasks/${taskId}`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType<{}>>(`${todolistId}/tasks/${taskId}`)
    }

}