import api from './api';


export const getCurrencies = async (token) => {
  const response = await api.get('/currency/',{ 
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    }
  });
  return response.data['data'];
};
