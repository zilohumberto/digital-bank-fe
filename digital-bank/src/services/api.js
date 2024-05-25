import axios from 'axios';

const {REACT_APP_API_HOST}  = process.env;


const api = axios.create({
  baseURL: 'http://127.0.0.1:5100',
});


export default api;
