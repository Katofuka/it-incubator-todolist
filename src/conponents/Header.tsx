import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import {Button} from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import React from "react";

export const Header = () => {
    return(
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                    <Menu/>
                </IconButton>
                <Typography variant='h6'>
                    Todolist
                </Typography>
                <Button color='inherit'>Login</Button>
            </Toolbar>
        </AppBar>
    )
}