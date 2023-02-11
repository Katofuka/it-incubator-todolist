import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolist-api";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {ComponentMeta} from "@storybook/react";

export default {
    title: 'Todolist/API/Todolist',
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('new title')
            .then((response)=>{
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const todolistId = 'd97e9410-0150-4fc0-a8d0-8db840765175'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((response)=>{
                setState(response.data)

            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const todolistId = '5772f4eb-00cb-4ece-9091-0c40a154f67f'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'kentuki')
            .then((response)=>{
                setState(response.data)
            })
        // {title: 'REACT>>>>>>>>>'},
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div>{JSON.stringify(state)}</div>
}