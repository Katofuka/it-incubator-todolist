
const initialAppState: InitialAppStateType = {
    status: 'idle',
    error: null,
}

//reducer
export const appReducer = (state: InitialAppStateType = initialAppState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}


//actions
export const setAppStatusAction = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)

export const setAppErrorAction = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)

//types
export type InitialAppStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAction>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAction>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
