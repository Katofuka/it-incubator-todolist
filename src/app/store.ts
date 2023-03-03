import {tasksReducer} from '../features/Todolists/tasks-reducer';
import {todolistsReducer} from '../features/Todolists/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

export const useAppDispatch: () => AppDispatch = useDispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
