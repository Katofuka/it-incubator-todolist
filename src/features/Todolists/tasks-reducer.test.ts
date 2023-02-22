import {addTaskAC, removeTaskAC, TasksDomainType, tasksReducer} from './tasks-reducer';

import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatus} from "../../API/task-api";

let startState: TasksDomainType = {};

beforeEach(() => {
    startState = {
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
                id: "2", title: "milk",  description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
            {
                id: "3", title: "tea",  description: '', status: TaskStatus.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const action = addTaskAC("todolistId2", "juce");

    // const endState = tasksReducer(startState, action)
    //
    // expect(endState["todolistId1"].length).toBe(3);
    // expect(endState["todolistId2"].length).toBe(4);
    // expect(endState["todolistId2"][0].id).toBeDefined();
    // expect(endState["todolistId2"][0].title).toBe("juce");
    // expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
});
// test('status of specified task should be changed', () => {
//     const action = updateTaskAC("2", "todolistId2", TaskStatus.New);
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed);
//     expect(endState["todolistId2"][1].status).toBe(TaskStatus.New);
// });
// test('title of specified task should be changed', () => {
//     const action = updateTaskTC("todolistId2", "2", {title: "yogurt"})
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"][1].title).toBe("JS");
//     expect(endState["todolistId2"][1].title).toBe("yogurt");
//     expect(endState["todolistId2"][0].title).toBe("bread");
// });
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("todolistId1", "new todolist");

    const endState = tasksReducer(startState, action)


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

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
