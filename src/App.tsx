import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export type FilterValueType = 'all'|'active'|'completed'

function App() {
    let [tasks, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJs", isDone: false},
        {id: 4, title: "rest api", isDone: false},
        {id: 5, title: "graphQL", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValueType>('all')
    let taskForTodoList = tasks

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

    function removeTask(id: number) {
        let filterTasks = tasks.filter(task => task.id !== id)
        setTask(filterTasks)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" task={taskForTodoList} changeFilter={changeFilter} remove={removeTask}/>


        </div>
    );
}

export default App;
