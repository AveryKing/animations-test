import React, {FormEvent, FC, useState, ChangeEvent} from 'react';
import {TextField, Button, Typography, Grid, PaletteOptions, Paper, Grow, Fade, Link} from "@mui/material";
import userService from '../services/user';



const RegistrationForm: FC = () => {
    const [values, setValues] = useState({});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value});
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
            style={{ minHeight: '100vh'}}
        >
            <Fade in={true}>
            <Paper sx={{borderRadius:'15px',backgroundColor:"rgba(255,255,255,0.59)",paddingTop:'10px',paddingBottom:'10px'}} elevation={15}>
                <Grow in={true}>
            <Grid item xs={12} sx={{padding:'20px',borderRadius:'8px'}}>
                <Typography align='center' variant='h5' sx={{marginBottom:'15px',paddingTop:'5px',color:"rgba(0,0,0,0.65)"}}>Create an account</Typography>
            <form onSubmit={onSubmit}>
             <TextField sx={{marginBottom:'10px'}}  variant='outlined' type='email' name='email' label='Email' onChange={onChange} /><br />
             <TextField sx={{marginBottom:'10px'}}  variant='outlined' type='text' name='username' label='Username' onChange={onChange} /><br />
             <TextField sx={{marginBottom:'10px'}}  variant='outlined' type='password' name='password' label='Password' onChange={onChange} /><br />
                <Button sx={{marginLeft:'25%'}} variant='outlined' type='submit'>Register</Button>
            </form>
                <Link><br/>
                    <Typography fontSize='15px' align='center' sx={{color:"rgba(0,0,0,0.57)"}}>Already have an account?</Typography>
                </Link>

            </Grid>
                </Grow>
            </Paper>
            </Fade>

        </Grid>
    )
}

export default RegistrationForm;