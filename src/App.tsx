import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";

export type FilterValueType = 'all'|'active'|'completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJs", isDone: false},
        {id: v1(), title: "rest api", isDone: false},
        {id: v1(), title: "graphQL", isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')
    let taskForTodoList = tasks

    const [title, setTitle] = useState("What to learn")
    const [error, setError] = useState<string|null>(null)

    if (filter === 'active') {
        taskForTodoList = tasks.filter((task) => task.isDone)
    }

    if (filter === 'completed') {
        taskForTodoList = tasks.filter((task) => !task.isDone)

    }
    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    function removeTask(id: string) {
        let filterTasks = tasks.filter(task => task.id !== id.toString())
        setTasks(filterTasks)
    }

    function addTask(newTitle: string) {
            let task = {id: v1(), title: newTitle, isDone: false}
            let newTask = [task, ...tasks];
            setTasks(newTask)
            setTitle('')
    }

    function changeTaskStatus (id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if(task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist setTitle={setTitle}
                      title={title}
                      task={taskForTodoList}
                      changeFilter={changeFilter}
                      remove={removeTask}
                      addTask={addTask}
                      changeTaskStatus = {changeTaskStatus}
                      error={error}
                      setError={setError}
                      filter={filter}
            />


        </div>
    );
}

export default App;
