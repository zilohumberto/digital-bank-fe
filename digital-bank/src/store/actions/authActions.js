import { LOGIN_SUCCESS, LOGIN_FAILURE, USER_SIGNUP, REQUESTS_FAILURE } from '../types';
import api from '../../services/api';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await api.post('/login/', { email, password });
    var isAuthenticated = response['data']['status'] === "success"; 
    if (isAuthenticated){
      const user_data = response['data']['data'];
      console.log(user_data);
      dispatch({ type: LOGIN_SUCCESS, payload: {
        user_id: user_data['id'], 
        authenticated: true, 
        token: user_data.token,
        name: user_data.name,
        email: user_data.email,
        profile: user_data.profile,
      } 
    });
     
    }else{
      dispatch({ type: LOGIN_FAILURE, payload: 'Intento fallido de login' });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};


export const signup = (first_name, email, password) => async (dispatch) => {
  try {
    // password intentionally ignored
    const response = await api.post('/user/', { "email": email, "name": first_name, "password": password }
    );
    const is_success = response['data']['status'] === "success";
    if (is_success){
      dispatch({ type: USER_SIGNUP, payload: response.data["data"] });
    }else{
      dispatch({ type: REQUESTS_FAILURE, payload: response.data["message"] });
    }
  } catch (error) {
    dispatch({ type: REQUESTS_FAILURE, payload: error.message });
  }
};


export const modify_user = (user_id, first_name, email, profile, token) => async (dispatch) => {
  try {
    const response = await api.patch(`/user/${user_id}`, { "email": email, "name": first_name },
    { 
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token, 
      }
    }
    );
    const is_success = response['data']['status'] === "success";
    if (is_success){
      dispatch({ type: LOGIN_SUCCESS, payload: {
        user_id: user_id, 
        authenticated: true, 
        token: token,
        name: first_name,
        email: email,
        profile: profile
      } 
      });
    }else{
      dispatch({ type: REQUESTS_FAILURE, payload: response.data["message"] });
    }
  } catch (error) {
    dispatch({ type: REQUESTS_FAILURE, payload: error.message });
  }
};