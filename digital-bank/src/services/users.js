import api from './api';


export const get_users = async (status, token) => {
  const response = await api.get(`/user/?status=${status}`,{ 
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    }
  });
  return response.data['data'];
};


export const update_user =  async (id, data, token) => {
    try {
      const response = await api.patch(`/user/${id}`, data, { 
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

export const process_batch_users =  async (token) => {
    try {
        const response = await api.get('/user/validate/', { 
            headers: {
              'Content-Type': 'application/json',
              'X-Auth-Token': token, 
            }
          });
      const is_success = response['data']['status'] === "success"; 
      if (is_success === true){
        return response['data']['data'];
      }else{
        return {};
      }
    } catch (error) {
      return {};
    }
};