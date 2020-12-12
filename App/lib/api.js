import axios from 'axios';
import { getCookie } from './cookies';
import Config from '../constants/config';

/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.apiBaseUrl;
// axios.defaults.withCredentials = true;

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*' ;

/**
 * Request Interceptor
 */
axios.interceptors.request.use(
  async (inputConfig) => {
    const config = inputConfig;
    const token = await getCookie('Auth:Token')
    try {
      // Check if the token has or is about to expire, and refresh it
      if (token ) {
        // Add the token to the Authorization header
        config.headers.common.Authorization = `Token ${token}`;

      // Otherwise, attempt to refresh the token
      } 
    } catch (error) { /* Nothing */ }


    return config;
  },
  (error) => {
    throw error;
  },
);

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    // Status code isn't a success code - throw error
    if (!`${res.status}`.startsWith('2')) {
      throw res.data;
    }

    // Otherwise just return the data
    return res;
  },
  (error) => {
    // Pass the response from the API, rather than a status code
    if (error && error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  },
);

export default axios;
