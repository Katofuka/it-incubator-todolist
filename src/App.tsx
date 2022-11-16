import React, {useState} from 'react';
import './App.css';
import { Todolist } from './components/Todolist';

const task1 = [
    { id: 1, title: "HTML&CSS", isDone: true},
    { id: 2, title: "JS", isDone: true},
    { id: 3, title: "ReactJs", isDone: false}
]

const task2 = [
    { id: 1, title: "Hello World", isDone: false},
    { id: 2, title: "I am happy", isDone: true},
    { id: 3, title: "Yo", isDone: false}
]

function App() {
    return (
        <div className="App">
            <Todolist title="What to learn" task={task1} />
            <Todolist title="Songs" task={task2}/>
            <Todolist title="Books" task={task1}/>
        </div>
    );
}

export default App;
