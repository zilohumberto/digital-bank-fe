import axios from 'axios';

const {REACT_APP_API_HOST}  = process.env;


const api = axios.create({
  baseURL: REACT_APP_API_HOST,
});


export default api;
