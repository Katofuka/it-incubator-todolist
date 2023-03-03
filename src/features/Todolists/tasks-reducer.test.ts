import {addTaskAC, removeTaskAC, TasksDomainType, tasksReducer, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgentrly = 3,
    Later = 4,
}
type TaskType = {
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

let startStateTodolist: TasksDomainType = {};
const startStateNewTask: TaskType = {
    id: '0',
    description: 'do new Todo',
    title: 'do new Todo',
    status:TaskStatus.New,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    todoListId: 'todolistId2',
    order: 0,
    addedDate: ''
}

beforeEach(() => {
    startStateTodolist = {
        "todolistId1": [
            {
                id: "1", title: "CSS", description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
            {
                id: "2", title: "JS", description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
            {
                id: "3", title: "React", description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
            {
                id: "2", title: "milk", description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
            {
                id: "3", title: "tea", description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            }
        ]
    };

});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2", "2");
    const endState = tasksReducer(startStateTodolist, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC(startStateNewTask);
    const endState = tasksReducer(startStateTodolist, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("do new Todo");
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
});

// test('status of specified task should be changed', () => {
//     const action = updateTaskAC("2", "todolistId2", TaskStatus.New);
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed);
//     expect(endState["todolistId2"][1].status).toBe(TaskStatus.New);
// });
//
// test('title of specified task should be changed', () => {
//     const action = updateTaskAC("todolistId2", "2", {title: "yogurt"})
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"][1].title).toBe("JS");
//     expect(endState["todolistId2"][1].title).toBe("yogurt");
//     expect(endState["todolistId2"][0].title).toBe("bread");
// });

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("todolistId3", "new todolist");

    const endState = tasksReducer(startStateTodolist, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startStateTodolist, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
