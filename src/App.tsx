import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";

export type FilterValueType = 'all'|'active'|'completed'

function App() {
    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJs", isDone: false},
        {id: v1(), title: "rest api", isDone: false},
        {id: v1(), title: "graphQL", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValueType>('all')
    let taskForTodoList = tasks

    let [title, setTitle] = useState("What to learn")
    if (filter === 'active') {
        taskForTodoList = tasks.filter((task) => task.isDone)
        console.log(taskForTodoList)
    }
    if (filter === 'completed') {
        taskForTodoList = tasks.filter((task) => !task.isDone)
        console.log(taskForTodoList)
    }
    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    function removeTask(id: string) {
        let filterTasks = tasks.filter(task => task.id !== id.toString())
        setTask(filterTasks)
    }

    function addTask(newTitle: string) {
        let task = {id: v1(), title: newTitle, isDone: false}
        let newTask = [task, ...tasks];
        setTask(newTask)
        setTitle("")
    }

    return (
        <div className="App">
            <Todolist setTitle={setTitle} title={title} task={taskForTodoList} changeFilter={changeFilter} remove={removeTask} addTask={addTask}/>


        </div>
    );
}

export default App;
