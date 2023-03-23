import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch} from "../../app/store";
import {loginTC} from "./auth-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: true,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Ты забыл ввести email?'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Какие-то проблемы с вводом email?'
            }
            if (!values.password) {
                errors.password = 'Ты забыл ввести пароль?'
            } else if (values.password.length < 4) {
                errors.password = 'Пароль короче чем твоё достоинство'
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm({
                values: {
                    email: '',
                    password: '',
                    rememberMe: false,
                    captcha: true,
                }
            })
        },
    })

    return (
        <Grid container justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                                // name='email'
                                // onChange={formik.handleChange}
                                // value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email
                                ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                                : null
                            }
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                                // name='password'
                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password
                                ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                                : null
                            }
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                    // name='rememberMe'
                                    // onChange={formik.handleChange}
                                    // value={formik.values.rememberMe}
                                />}
                            />
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}

                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Grid>
            </form>
        </Grid>
    )
}