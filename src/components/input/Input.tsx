import React, {ChangeEvent, KeyboardEvent} from 'react'
type InputType = {
    todolistId: string
    title: string
    error: string | null
    setError: (error: string | null) => void
    addTask: (newTitle: string, todolistId: string) => void
    setTitle: (title: string) => void
}

export const Input = (props: InputType) => {
    const {
        todolistId,
        title,
        error,
        setError,
        addTask,
        setTitle,
    } = props

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        return event.key === "Enter" ? addTaskHandler() : ""
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addTask(title.trim(), todolistId)
            setTitle('')
        } else {
            setError('Title is required')
        }

    }
    return(
        <div>
            <input value={title}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}