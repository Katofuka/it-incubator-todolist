import React from 'react';
import './App.css';
import {TaskType} from './conponents/Todolist';
import {AddItemForm} from "./conponents/addItemForm/AddItemForm";
import {Header} from "./conponents/Header";
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {
    addTodolistAction,
    changeTodolistFilterAction,
    changeTodolistTitleAction,
    removeTodolistAction,
} from "./state/todolists-reducer";
import {
    addTaskAction,
    changeTaskStatusAction,
    changeTaskTitleAction,
    removeTaskAction,
} from "./state/tasks-reducer";
import {AppRootStateType} from './state/store';
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    //const tasks = useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
    const dispatch = useDispatch();

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAction(value, todolistId))
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAction(id))
    }

    function onChangeTodolistTitle(todolistId: string, title: string) {
        dispatch(changeTodolistTitleAction(todolistId, title))
    }

    function addTodolist(title: string) {
        let action = addTodolistAction(title)
        dispatch(action)
    }

    function removeTask(taskId: string, todolistId: string) {
        dispatch(removeTaskAction(taskId, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAction(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAction(taskId, isDone, todolistId))
    }

    function onChangeTaskTitle(taskId: string, todolistId: string, title: string) {
        dispatch(changeTaskTitleAction(taskId, todolistId, title))
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodolistWithRedux todolist={tl}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
