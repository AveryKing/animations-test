import React, {FormEvent, FC, useState, ChangeEvent} from 'react';
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
        <div>
            <form onSubmit={onSubmit}>
                Email: <input type='email' name="email" onChange={onChange}></input> <br/>
                Username: <input type='text' name="username" onChange={onChange}></input> <br/>
                Password: <input type='password' name="password" onChange={onChange}></input> <br/>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default RegistrationForm;