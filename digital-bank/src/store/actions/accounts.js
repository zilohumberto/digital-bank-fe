import { REQUESTS_SUCCESS,REQUESTS_FAILURE, MOVEMENTS_REQUESTS_SUCCESS } from '../types';
import api from '../../services/api';

export const get_accounts = (user_id, token) => async (dispatch) => {
    try {
      const response = await api.get(`/account/?user_id=${user_id}`, { 
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token, 
        }
      }
      );
      const is_success = response['data']['status'] === "success"; 
      if (is_success === true){
        dispatch({ type: REQUESTS_SUCCESS, payload: response.data["data"] });
      }else{
        dispatch({ type: REQUESTS_FAILURE, payload: response.data["message"] });
      }
    } catch (error) {
      dispatch({ type: REQUESTS_FAILURE, payload: error.message });
    }
  };

  export const get_movements = (user_id, currency_name, token) => async (dispatch) => {
    try {
      const response = await api.get(`/movements/?user_id=${user_id}&currency_name=${currency_name}`, { 
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token, 
        }
      });
      const is_success = response['data']['status'] === "success"; 
      if (is_success === true){
        dispatch({ type: MOVEMENTS_REQUESTS_SUCCESS, payload: response.data["data"] });
      }else{
        dispatch({ type: REQUESTS_FAILURE, payload: response.data["message"] });
      }
    } catch (error) {
      dispatch({ type: REQUESTS_FAILURE, payload: error.message });
    }
  };

  
  export const create_account =  async (data, token) => {
    try {
      const response = await api.post(`/account/`, data, { 
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token, 
        }
      });
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  export const get_accounts_by_status =  async (status, token, skip) => {
    try {
      const response = await api.get(`/account/?status=${status}&skip=${skip}`, { 
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token, 
        }
      }
      );
      const is_success = response['data']['status'] === "success"; 
      if (is_success === true){
        return response.data;
      }else{
        return {"data": []};
      }
    } catch (error) {
      return {"data": []};
    }
  };



  export const update_account =  async (id, data, token) => {
    try {
      const response = await api.patch(`/account/${id}`, data, { 
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token, 
        }
      }
      );
      const is_success = response['data']['status'] === "success"; 
      if (is_success === true){
        return true, "ok";
      }else{
        return false, "Update failed";
      }
    } catch (error) {
      return {"data": []};
    }
  };

  

export const process_batch_account =  async (token) => {
  const response = await api.get('/account/validate/', { 
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    }
  });
  return response["data"];
};