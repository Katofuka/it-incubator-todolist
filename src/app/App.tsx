import React from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistList} from "../features/Todolists/TodolistList";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbarPropsType";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

type AppPropsType = {
    demo?: boolean
}

export const App: React.FC<AppPropsType> = ({demo=false}) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="secondary" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="secondary">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login />}/>

                    <Route path={'/404'} element={<h1>404: Page Not Found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>
            <ErrorSnackbar open={error !== null} error={error} />
        </div>
    );
}



