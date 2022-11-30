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
    changeTaskStatus: (id: string, isDone: boolean) => void
    error: string | null
    setError: (error: string | null) => void
    filter: FilterValueType
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        setTitle,
        task,
        addTask,
        remove,
        changeFilter,
        changeTaskStatus,
        error,
        setError,
        filter,
    } = props

    const todoElements = task.map((todo) => {
        const onClickHandler = () => remove(todo.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeTaskStatus(todo.id, newIsDoneValue)
        }
        return (
            <li key={todo.id}
                className={todo.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={todo.isDone} onChange={onChangeHandler}/>
                <span>{todo.title}</span>
                <button onClick={onClickHandler}>⨳</button>
            </li>
        )
    })
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addTask(title.trim())
        } else {
            setError('Title is required')
        }

    }
    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        return event.key === "Enter" ? addTaskHandler() : ""
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {todoElements}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}