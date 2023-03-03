import {appReducer, InitialAppStateType, setAppErrorAction, setAppStatusAction} from "./app-reducer";


let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAction('failed'))

    expect(endState.status).toBe('failed');
});

test('correct error should be set', () => {
    const endState = appReducer(startState, setAppErrorAction('some error'))

    expect(endState.error).not.toBe(null);
    expect(endState.error).toBe('some error');
});