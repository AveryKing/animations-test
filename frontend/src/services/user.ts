import axios from 'axios';

const baseUrl: string = 'http://localhost:6969/api/users';

const getAll = (): Promise<object> => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const create = (newUser: object): Promise<object> => {
    const request = axios.post(`${baseUrl}`, newUser);
    return request.then(response => response.data);
}


const checkInUse = (values: { email?: string, username?: string }): Promise<boolean> => {
    const checkObj = values.hasOwnProperty('email')
        ? {email: values.email}
        : {username: values.username}
    const request = axios.post(`${baseUrl}/checkInUse`, checkObj);
    return request.then(response => response.data.inUse);
}
export default {
    getAll, create, checkInUse
};