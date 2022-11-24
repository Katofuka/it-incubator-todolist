import React, {ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType} from '../App'

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
        const onClickHandler = () => props.remove(todo.id)
        return (
            <li key={todo.id}><input type="checkbox" checked={todo.isDone}/>
                <span>{todo.title}</span>
                <button onClick={onClickHandler}>⨳
                </button>
            </li>
        )
    })
    const addTask = () => props.addTask(props.title)
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => props.setTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" ? addTask() : ""

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeInputHandler}
                       value={props.title}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {todoElements}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}