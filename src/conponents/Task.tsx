import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../TodolistWithRedux";
import {changeTaskStatusAction, changeTaskTitleAction, removeTaskAction} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    idTodo: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const {
        idTodo,
        task,
    } = props

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskAction(task.id, idTodo)),[])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAction(task.id, newIsDoneValue, idTodo))
    }, [])
    const onChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAction(task.id, idTodo, newTitle))
    }, [])

    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>*/}
            <Checkbox
                onChange={onChangeHandler}
                checked={task.isDone}
                size={"small"}
                color={"success"}
            />
            <EditableSpan value={task.title} onChange={onChangeTitle}/>
            <IconButton onClick={onClickHandler} size={'small'}>
                <Delete/>
            </IconButton>
            {/*<button onClick={onClickHandler}>x</button>*/}
        </li>

    )
})