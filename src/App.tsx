import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './components/Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './state/todolists-reducer';
import {addTaskTC, removeTaskTC, TasksDomainType, updateTaskStatusTC, updateTaskTitleTC} from './state/tasks-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {TaskStatus} from "./API/task-api";


export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchTodolistsTC())
    },[])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksDomainType>(state => state.tasks)

    const removeTask = useCallback(function (todolistId: string, id: string) {
        dispatch(removeTaskTC(todolistId, id));
    }, [dispatch]);

    const addTask = useCallback(function (todolistId: string, title: string) {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch]);

    const changeStatus = useCallback(function (todolistId: string, taskId: string, status: TaskStatus) {
        dispatch(updateTaskStatusTC(todolistId, taskId, status));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTitleTC(todolistId, taskId, newTitle));
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

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
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
            </Container>
        </div>
    );
}


