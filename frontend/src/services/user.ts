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

const getAllUsernames = () => {
    const request = axios.get(`${baseUrl}/usernames`);
    return request.then(response => response.data);
}

const getAllEmails = () => {
    const request = axios.get(`${baseUrl}/emails`);
    return request.then(response => response.data)
}
const checkInUse = async (values: { email?: string, username?: string }, namesList?: string[], emailList?: string[]): Promise<boolean> => {
    if(values.hasOwnProperty('email')) {
        emailList?.forEach(email => {
            if(email === values.email) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        })
    } else {
        namesList?.forEach(username => {
            if(username === values.username) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        })
    }

    return Promise.resolve(false)
    /** This implementation queries server-side API instead
     *
    const checkObj = values.hasOwnProperty('email')
        ? {email: values.email}
        : {username: values.username}
    const request = axios.post(`${baseUrl}/checkInUse`, checkObj);
    return request.then(response => response.data.inUse);*/
}
export default {
    getAll, create, checkInUse, getAllUsernames, getAllEmails
};