import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './conponents/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./conponents/addItemForm/AddItemForm";
import {Header} from "./conponents/Header";
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {
    addTaskAction,
    changeTaskStatusAction,
    changeTaskTitleAction,
    removeTaskAction,
    tasksReducer
} from "./state/tasks-reducer";
import {

    addTodolistAction,
    changeTodolistFilterAction,
    changeTodolistTitleAction,
    removeTodolistAction,
    todolistsReducer
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const initialStateTodolists: Array<TodolistType>  = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const initialStateTasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, initialStateTodolists)

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolist(changeTodolistFilterAction(value, todolistId))
    }

    function removeTodolist(id: string) {
        let action = removeTodolistAction(id)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function onChangeTodolistTitle(todolistId: string, title: string) {
        dispatchToTodolist(changeTodolistTitleAction(todolistId, title))
    }

    function addTodolist(title: string) {
        let action = addTodolistAction(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, initialStateTasks);

    function removeTask(taskId: string, todolistId: string) {
        dispatchToTasks(removeTaskAction(taskId, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAction(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAction(taskId, isDone, todolistId))
    }

    function onChangeTaskTitle(taskId: string, todolistId: string, title: string) {
        dispatchToTasks(changeTaskTitleAction(taskId, todolistId, title))
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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={onChangeTaskTitle}
                                        changeTodolistTitle={onChangeTodolistTitle}
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

export default AppWithReducer;
