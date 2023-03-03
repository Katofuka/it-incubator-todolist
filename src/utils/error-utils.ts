import {setAppErrorAction, SetAppErrorActionType, setAppStatusAction, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../API/todolist-api";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    data.messages.length
        ? dispatch(setAppErrorAction(data.messages[0]))
        : dispatch(setAppErrorAction('Some error occurred'))
    dispatch(setAppStatusAction('failed'))
}


export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAction('failed'))
    dispatch(setAppErrorAction(error.message))

}


type ErrorUtilsDispatchType = Dispatch< SetAppErrorActionType | SetAppStatusActionType >