import axios from 'axios';

const {REACT_APP_API_HOST}  = process.env;


const api = axios.create({
  baseURL: 'ec2-18-228-5-80.sa-east-1.compute.amazonaws.com',
});


export default api;
