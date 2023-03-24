import {TasksActionsType, tasksReducer} from '../features/Todolists/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../features/Todolists/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkDispatch, ThunkAction} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppInitialActionType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

type AppActionsType =
    | TasksActionsType
    | TodolistsActionsType
    | AppInitialActionType
    | AuthActionsType

export const useAppDispatch: () => AppDispatch = useDispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkType<ReturnType = void> =
    ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
