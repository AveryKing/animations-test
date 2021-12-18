import React, {FormEvent, FC, useState, ChangeEvent, useEffect} from 'react';
import {TextField, Button, Typography, Grid, PaletteOptions, Paper, Grow, Fade, Link} from "@mui/material";
import userService from '../services/user';

const RegistrationForm: FC = () => {
    const [values, setValues] = useState({});
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [usernameMessage, setUsernameMessage] = useState('')
    const [userData, setUserData] = useState({})


    useEffect(() => {
        userService.getUserData()
            .then(response => {
                setUserData(response)
            })


    }, [])

    const onChange = (event: ChangeEvent<HTMLInputElement>): Promise<boolean> | void => {

        const fieldName: string = event.target.name;
        const fieldValue: string = event.target.value;
        setValues({...values, [fieldName]: fieldValue});

        if (fieldName === 'password' && fieldValue) {
            setPasswordError(fieldValue.length < 6)
        } else {
            setPasswordError(false)
        }

        const checkParams = {[fieldName]: fieldValue};
        if (fieldValue && fieldName !== 'password') {
            /** TODO: enforce maximum username length
             */
            userService.checkInUse(userData,checkParams)
                .then(response => {
                    console.log(response)
                    if (fieldName === 'email') {
                        setEmailError(response);
                    } else if (fieldName === 'username') {
                        if (new RegExp(/^[a-z0-9]+$/i).test(fieldValue)) {
                            setUsernameMessage('That username is already in use.')
                            setUsernameError(response);
                        } else {
                            setUsernameMessage('That username is unacceptable.');
                            setUsernameError(true)
                        }
                    }
                })
        } else {
            if (fieldName === 'email') {
                setEmailError(false)
            } else if (fieldName === 'username') {
                setUsernameError(false);
            }
        }

    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailError && !usernameError && !passwordError) {
            userService.create(values)
                .then(response => {
                    console.log(response)
                })
        }
    }

    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Fade in={true}>
                <Paper sx={{
                    borderRadius: '15px',
                    backgroundColor: "rgba(255,255,255,0.59)",
                    paddingTop: '10px',
                    paddingBottom: '10px'
                }} elevation={15}>
                    <Grow in={true}>
                        <Grid item xs={12} sx={{padding: '20px', borderRadius: '8px'}}>
                            <Typography align='center' variant='h5'
                                        sx={{marginBottom: '15px', paddingTop: '5px', color: "rgba(0,0,0,0.65)"}}>Create
                                an account</Typography>
                            <form onSubmit={onSubmit}>
                                {emailError ?
                                    <TextField error sx={{marginBottom: '10px'}} type='email' name='email' label='Email'
                                               onChange={onChange} helperText="That email is already in use."/>
                                    : <TextField sx={{marginBottom: '10px'}} type='email' name='email' label='Email'
                                                 onChange={onChange}/>} <br/>
                                {usernameError ?
                                    <TextField error sx={{marginBottom: '10px'}} type='text' name='username'
                                               label='Username'
                                               onChange={onChange} helperText={usernameMessage}/>
                                    :
                                    <TextField sx={{marginBottom: '10px'}} type='text' name='username' label='Username'
                                               onChange={onChange}/>}
                                <br/>
                                {passwordError ?
                                    <TextField error sx={{marginBottom: '10px'}} type='password' name='password'
                                               label='Password'
                                               onChange={onChange} helperText='Your password is too short.'/>
                                    : <TextField sx={{marginBottom: '10px'}} type='password' name='password'
                                                 label='Password'
                                                 onChange={onChange}/>}<br/>
                                <Button sx={{marginLeft: '25%'}} variant='outlined' type='submit'>Register</Button>
                            </form>
                            <br/>
                            <Link>
                                <Typography fontSize='15px' align='center' sx={{color: "rgba(0,0,0,0.57)"}}>Already have
                                    an account?</Typography>
                            </Link>

                        </Grid>
                    </Grow>
                </Paper>
            </Fade>

        </Grid>
    )
}

export default RegistrationForm;