import {AppRootStateType, useAppDispatch} from "../../app/store";
import React, {useCallback, useEffect} from "react";
import {
    changeTodolistFilterAC, changeTodolistTitleTC, createTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {useSelector} from "react-redux";
import {addTaskTC, removeTaskTC, TasksDomainType, updateTaskTC} from "./tasks-reducer";
import {TaskStatus} from "../../API/task-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistList = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksDomainType>(state => state.tasks)

    const removeTask = useCallback(function (todolistId: string, id: string) {
        dispatch(removeTaskTC(todolistId, id));
    }, [dispatch]);

    const addTask = useCallback(function (todolistId: string, title: string) {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch]);

    const changeStatus = useCallback(function (todolistId: string, taskId: string, status: TaskStatus) {
        dispatch(updateTaskTC(todolistId, taskId, {status: status}));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC(todolistId, taskId, {title: newTitle}));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (todolistId: string) {
        dispatch(removeTodolistTC(todolistId));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title));
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, [dispatch]);

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(tl => {
                return <Grid item key={tl.id}>
                    <Paper style={{padding: "10px"}}>
                        <Todolist
                            id={tl.id}
                            title={tl.title}
                            tasks={tasks[tl.id]}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            })
            }
        </Grid>
    </>
}