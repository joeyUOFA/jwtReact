import { userConstants } from '../_constants';
import { history } from '../_helpers';
import axios from "axios";
import config from 'config';

export const login = (username, password) => async dispatch => {
    dispatch(request({ username }));
    try {
        const user = await axios.post(`${config.apiUrl}/api/authenticate`, JSON.stringify({ username, password }));
        localStorage.setItem('user', JSON.stringify(user.data));
        const userDetail = await axios.get(`${config.apiUrl}/api/user`);
        dispatch(success(userDetail.data));
        history.push('/');
    }catch(error) {
        console.log(error);
        dispatch(failure(error));
    }
};

export const request = (user) => ({
    type: userConstants.LOGIN_REQUEST, user
});

export const success = (user) => ({
    type: userConstants.LOGIN_SUCCESS, user
});

export const failure = (error) => ({
    type: userConstants.LOGIN_FAILURE, error
});


export const logout = () => {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}

