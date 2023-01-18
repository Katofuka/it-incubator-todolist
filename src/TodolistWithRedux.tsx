import React, {memo, useCallback} from 'react';
import {TodolistType} from './App';
import {AddItemForm} from "./conponents/addItemForm/AddItemForm";
import {EditableSpan} from "./conponents/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAction} from "./state/tasks-reducer";
import {changeTodolistFilterAction, changeTodolistTitleAction, removeTodolistAction} from "./state/todolists-reducer";
import {Task} from "./conponents/Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux = memo(({todolist}: PropsType) => {
    const {id, titleTodo, filter} = todolist
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    let tasksForTodoList = tasks
    const dispatch = useDispatch()

    const addTask = useCallback(
        (title: string) => dispatch(addTaskAction(title, id))
        , [id]);

    const removeTodolist = useCallback(() => dispatch(removeTodolistAction(id)), [id]);
    const onChangeTitleHeader = useCallback((newTitle: string) => dispatch(changeTodolistTitleAction(id, newTitle)), [id]);

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAction("all", id)), ["all", id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAction("active", id)), ["active", id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAction("completed", id)), ["completed", id]);


    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <EditableSpan value={titleTodo} onChange={onChangeTitleHeader}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist} size={"small"}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodoList.map((t) => {
                    return ( <Task task={t} idTodo={id} key={t.id}/> )
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
})


