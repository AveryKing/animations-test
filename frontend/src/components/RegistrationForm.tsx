import React, {FormEvent, FC, useState, ChangeEvent} from 'react';
import {TextField, Button, Typography, Grid, PaletteOptions, Paper, Grow, Fade, Link} from "@mui/material";
import userService from '../services/user';


const RegistrationForm: FC = () => {
    const [values, setValues] = useState({});
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const onChange = (event: ChangeEvent<HTMLInputElement>): Promise<boolean> | void => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setValues({...values, [fieldName]: fieldValue});
        const checkParams = {[fieldName]: fieldValue};
        if (fieldValue && fieldName !== 'password') {
            userService.checkInUse(checkParams)
                .then(response => {
                    if (fieldName === 'email') setEmailError(response);
                    else if (fieldName === 'username') setUsernameError(response);
                })
        } else {
            if (fieldName === 'email') setEmailError(false);
            else if (fieldName === 'username') setUsernameError(false);
            else if (fieldName === 'password') setPasswordError(fieldValue.length < 6);
        }

    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        userService.create(values)
            .then(response => {
                console.log(response);
            });
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
                                               onChange={onChange} helperText="That username is already in use."/>
                                    :
                                    <TextField sx={{marginBottom: '10px'}} type='text' name='username' label='Username'
                                               onChange={onChange}/>}
                                <br/>
                                {passwordError ?
                                    <TextField error sx={{marginBottom: '10px'}} type='password' name='password' label='Password'
                                               onChange={onChange} helperText='Your password is too short.'/>
                                    : <TextField sx={{marginBottom: '10px'}} type='password' name='password' label='Password'
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