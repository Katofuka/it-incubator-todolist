import React, {ChangeEvent} from 'react';
import {TodolistType} from './App';
import {AddItemForm} from "./conponents/addItemForm/AddItemForm";
import {EditableSpan} from "./conponents/EditableSpan";
import {Button, IconButton, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAction, changeTaskStatusAction, changeTaskTitleAction, removeTaskAction} from "./state/tasks-reducer";
import {changeTodolistFilterAction, changeTodolistTitleAction, removeTodolistAction} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
    // id: string
    // title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType, todolistId: string) => void
    // addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // removeTodolist: (id: string) => void
    // filter: FilterValuesType
    // onChangeTaskTitle: (idTask: string, idTodolist: string, title: string) => void
    // onChangeHeaderTitle: (idTodolist: string, title: string) => void
}

export function TodolistWithRedux({todolist}: PropsType) {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const addTask = (title: string) => dispatch(addTaskAction(title, id))
    const removeTodolist = () => dispatch(removeTodolistAction(id))
    const onChangeTitleHeader = (newTitle: string) => dispatch(changeTodolistTitleAction(id, newTitle))

    const onAllClickHandler = () => dispatch(changeTodolistFilterAction("all", id))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAction("active", id))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAction("completed", id))


    if (filter === "active") {tasks = tasks.filter(t => !t.isDone);}
    if (filter === "completed") {tasks = tasks.filter(t => t.isDone);}

    return <div>
        <h3>
            <EditableSpan value={title} onChange={onChangeTitleHeader}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist} size={"small"}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAction(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAction(t.id, newIsDoneValue, id))
                    }

                    const onChangeTitle = (newTitle: string) => {
                        dispatch(changeTaskTitleAction(t.id, id, newTitle))
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                            <Checkbox
                                onChange={onChangeHandler}
                                checked={t.isDone}
                                size={"small"}
                                color={"success"}
                            />
                            <EditableSpan value={t.title} onChange={onChangeTitle}/>
                            <IconButton onClick={onClickHandler} size={'small'}>
                                <Delete/>
                            </IconButton>
                            {/*<button onClick={onClickHandler}>x</button>*/}
                        </li>)
                })
            }
        </ul>
        <div>
            <Button /*className={props.filter === 'all' ? "active-filter" : ""}*/
                variant={filter === 'all' ? "outlined" : "text"}
                onClick={onAllClickHandler} color="primary">All
            </Button>
            <Button /*className={props.filter === 'active' ? "active-filter" : ""}*/
                variant={filter === 'active' ? "outlined" : "text"}
                onClick={onActiveClickHandler} color="secondary">Active
            </Button>
            <Button /*className={props.filter === 'completed' ? "active-filter" : ""}*/
                variant={filter === 'completed' ? "outlined" : "text"}
                onClick={onCompletedClickHandler} color="success">Completed
            </Button>
        </div>
    </div>
}


