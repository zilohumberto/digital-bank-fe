import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {modify_user} from '../../store/actions/authActions'

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [first_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();


  const handleBackClick = () => {
    navigate(-1);
   };

  useEffect(() => {
    console.log(user);
    setName(user.name);
    setEmail(user.email);
    setErrorMessage('');
  }, [user]);
  
  const handleSave = async () => {
    dispatch(modify_user(user.user_id, first_name, email, user.profile, user.token));
    navigate('/');
  };

  return (
    <div> 
        <div>
          <h2>Perfil de {user.name}</h2>
          <div>
            <label htmlFor="alias">Nombre:</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="alias">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errorMessage && <div><p className="error-message">{errorMessage}</p> </div>}
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleBackClick}>Volver</button>
        </div>
    </div>
  );
};

export default Profile;
