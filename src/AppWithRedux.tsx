import React, {useCallback} from 'react';
import './App.css';

import {AddItemForm} from "./conponents/addItemForm/AddItemForm";
import {Header} from "./conponents/Header";
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {
    addTodolistAction,

} from "./state/todolists-reducer";
import {AppRootStateType} from './state/store';
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    titleTodo: string
    filter: FilterValuesType
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAction(title)
        dispatch(action)
    }, [])

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            return <Grid item key={tl.id}>
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
