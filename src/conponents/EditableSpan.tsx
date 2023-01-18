import React, {ChangeEvent, useCallback, useState} from "react"
import TextField from "@mui/material/TextField/TextField";

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const {value, onChange} = props
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)

    const activateEditMode =useCallback( () =>{
        setEditMode(true)
        setTitle(value)
    },[])

    const activateViewMode = useCallback(() => {
        setEditMode(false)
        onChange(title)
    },[])
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>)=> {
        setTitle(event.currentTarget.value)
    },[])

    return (
        editMode
            ? /*<input value={title} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus/>*/
            <TextField variant={'outlined'}
                       value={title}
                       onBlur={activateViewMode}
                       onChange={onChangeHandler}
                       autoFocus>
            </TextField>

            : <span onDoubleClick={activateEditMode}>{value}</span>
    )
})