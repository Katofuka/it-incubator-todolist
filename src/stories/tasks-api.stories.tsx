import React, {useEffect, useState} from 'react'
import {tasksApi} from "../API/task-api";

export default {
    title: 'Todolist/API/Task',
};


export const GetTasksList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=> {
        tasksApi.getTasks('a2c836b1-bac8-4db1-983b-bdcd733eb6d7')
            .then(response =>{
                setState(response.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=> {
        tasksApi.createTask('a2c836b1-bac8-4db1-983b-bdcd733eb6d7', 'new title for task')
            .then(response =>{
                setState(response.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=> {
        tasksApi.updateTask('5772f4eb-00cb-4ece-9091-0c40a154f67f', '6848c8d7-396e-4b6f-be71-1b2ca2f3cba8','хлеб')
            .then(response =>{
                setState(response.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=> {
        tasksApi.deleteTask('5772f4eb-00cb-4ece-9091-0c40a154f67f', 'dd7a927c-9fe3-4bea-a0f3-f63f322406d7')
            .then(response =>{
                setState(response.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

