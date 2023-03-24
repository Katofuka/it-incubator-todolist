import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAction, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../API/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunkType} from "../../app/store";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)

// thunks
export const loginTC = (authData: LoginParamsType) => (dispatch: Dispatch<AuthActionsType>) => {
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

export const initializeAppTC = (): AppThunkType =>
    async (dispatch) => {
        const data = await authAPI.me()
        if (data.resultCode === 0) {
            dispatch(setIsInitializedAC(true))
            dispatch(setIsLoggedInAC(true));
        } else {
            dispatch(setIsInitializedAC(true))
        }
    }

export const logoutTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAction('loading'))
    authAPI.logout()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAction('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | SetAppStatusActionType
    | SetAppErrorActionType

// и создалась кука: