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

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '1c6fc31b-2023-4b84-8640-ac2aa0578411',
    },
})

//api
export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<{ items: TaskType[], totalCount: number, error: string }>(`${todolistId}/tasks`)
            .then(res => res.data.items)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, {title: title})
            .then(response => response.data.data.item)
    },
    updateTask(todolistId: string, taskId: string, taskBody: UpdateTaskModelType) {
        return instance.put<TaskResponseType<{ item: TaskType }>>(`${todolistId}/tasks/${taskId}`, taskBody)
            .then(response => response.data.data.item)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType<{}>>(`${todolistId}/tasks/${taskId}`)
    }
}

//api types
export type TaskType = {
    id: string
    description: string
    title: string
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

export type UpdateTaskModelType = {
    title: string,
    startDate: string,
    priority: TaskPriorities,
    description: string,
    deadline: string,
    status: TaskStatus,
}