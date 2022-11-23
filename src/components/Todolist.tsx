import React from 'react';
import { FilterValueType } from '../App'

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string;
    setTitle: (title: string) => void
    task: Array<TaskType>;
    remove: (taskId: string) => void;
    addTask: (newTitle: string) => void;
    changeFilter: (value: FilterValueType) => void
}

export const Todolist = (props: PropsType) => {
    const todoElements = props.task.map((todo) => {
        return(
        <li key={todo.id}><input type="checkbox" checked={todo.isDone} />
            <span>{todo.title}</span>
            <button onClick={()=>{
                props.remove(todo.id)
            }}>⨳</button>
        </li>
        )
    })

    return (
        <div>
                <h3>{props.title}</h3>
                <div>
                    <input onChange={(event) => props.setTitle(event.currentTarget.value)} value={props.title} onKeyDown={(event)=> event.code === "Enter" ? props.addTask : '' }/>
                    <button onClick={()=>props.addTask(props.title)}>+</button>
                </div>
                <ul>
                    {todoElements}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('active')}>Active</button>
                    <button onClick={() => props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
    )
}