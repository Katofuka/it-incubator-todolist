import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAction, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../API/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (authData: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAction('loading'))
    authAPI.login(authData)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAction('succeeded'))
            } else {
                handleServerAppError(response, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType

// и создалась кука: