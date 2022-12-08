import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJs", isDone: false },
            { id: v1(), title: "rest api", isDone: false },
            { id: v1(), title: "graphQL", isDone: true }
        ],
        [todolistID2]: [
            { id: v1(), title: "milk", isDone: true },
            { id: v1(), title: "flowers", isDone: false },
            { id: v1(), title: "butter", isDone: false },
        ]
    })
    //const [filter, setFilter] = useState<FilterValueType>('all')
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)


    function changeFilter(value: FilterValueType, todolistId: string) {
        const todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTask(id: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]

        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({ ...tasks })
    }

    function addTask(newTitle: string, todolistId: string) {
        let task = { id: v1(), title: newTitle, isDone: false }
        const todolistTasks = tasks[todolistId]

        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({ ...tasks })
        setTitle('')
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const todolistTasks = tasks[todolistId]

        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks })
        }
    }

    return (
        <div className="App">
            {todoLists.map(todoList => {
                const allTodolistTasks = tasks[todoList.id]
                let tasksForTodolist = allTodolistTasks
                if (todoList.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
                }

                if (todoList.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)

                }

                return (
                    <Todolist
                        id={todoList.id}
                        key={todoList.id}
                        title={todoList.title}
                        setTitle={setTitle}
                        task={tasksForTodolist}
                        changeFilter={changeFilter}
                        remove={removeTask}
                        
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        error={error}
                        setError={setError}
                        filter={todoList.filter}
                    />)
            })}

        </div>
    );
}

export default App;
