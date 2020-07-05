import axios from 'axios';
import { history } from '../_helpers';
import { authHeader } from '../_helpers';
import _ from "lodash";

export default {
    setupInterceptors: () => {
        axios.interceptors.request.use(
            config => {
                const token = authHeader();
                if (!_.isEmpty(token)) {
                    config.headers['Authorization'] = token.Authorization;
                }
                config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                history.push('/login');
            }
            if (error.response.status === 404) {
                history.push('/not-found');
            }
            return Promise.reject(error);
        });
    },
};