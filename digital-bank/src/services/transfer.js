import api from './api';



export const verifyAccount = async (account_alias, currency_name, token) => {
  if (account_alias === null & account_alias.length === 0) {
    return null;
  }
  const response = await api.get(`/account/?alias=${account_alias}&currency_name=${currency_name}`, { 
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    }
  });
  const is_success = response['data']['status'] === "success";
  return is_success === true & response['data'].data.length === 1 ? response['data'].data[0]["id"] : null;
};

export const performTransaction = async (transactionData, token) => {
  try {
    const response = await api.post(`/transaction/`, transactionData, { 
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token, 
      }
    });
    const is_success = response['data']['status'] === "success"; 
    return is_success;
  } catch (error) {
    return false;
  }
};


export const get_movements_admin =  async (operation_status, currency_name, token) => {
  const response = await api.get(`/movements/?operation_status=${operation_status}&currency_name=${currency_name}`, { 
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    }
  });
  return response["data"];
};

export const process_batch_transactions =  async (token) => {
  const response = await api.get('/transaction/execute/', { 
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    }
  });
  return response["data"];
};

export const getRate = async (data, token) => {
  try {
    const response = await api.post('/transaction/rate/', data, { 
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token, 
      }
    });
    return response["data"]["data"]["rate"];
  } catch (error) {
    return null;
  }
  
};