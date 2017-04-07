import axiosApi from 'axios'
import { BASE_URL } from 'constants/configConstants'

const axios = axiosApi.create({
  baseURL: BASE_URL,
  timeout: 1000
});

axios.interceptors.request.use(function (config) {
    // TODO get token if exists
    console.log('PASS TOKEN TO HEADER')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axios;