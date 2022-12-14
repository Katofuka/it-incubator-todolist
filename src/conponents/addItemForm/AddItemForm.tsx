import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <TextField variant={"outlined"}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label='Title'
            helperText={error}>

            </TextField>
            {/*<button onClick={addTask}>+</button>*/
            }
            <IconButton color='primary' onClick={addTask}><AddBoxIcon /></IconButton>
            {/*{*/}
            {/*    error && <div className="error-message">{error}</div>*/}
            {/*}*/}
        </div>
    )
}