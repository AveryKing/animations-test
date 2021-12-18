import axios from 'axios';

const baseUrl: string = 'http://localhost:6969/api/users';

const getAll = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const create = (email: string, username: string, password: string) => {
    const newUser: object = {
        email: email,
        username: username,
        password: password
    };
    const request = axios.post(`${baseUrl}`, newUser);
    return request.then(response => response.data);
}

export default {
    getAll, create
};