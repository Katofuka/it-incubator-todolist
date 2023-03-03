import {Provider} from "react-redux";
import React from 'react'
import {AppRootStateType} from "../../src/app/store";
import {tasksReducer} from "../../src/features/Todolists/tasks-reducer";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../src/features/Todolists/todolists-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: "all"},
        {id: 'todolistId2', title: "What to buy", filter: "all"}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    },
}

const storyBoolStore = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBoolStore}> {storyFn()} </Provider>
}