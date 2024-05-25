import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getCurrencies} from '../../services/currency';
import {create_account} from '../../store/actions/accounts';

const CreateAccount = () => {
  const [currency, setCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [alias, setAlias] = useState('');
  const user = useSelector((state) => state.auth.user);
  const user_id = user["user_id"];
  const unique_currencies = useSelector((state) => state.accounts.unique_currencies) || [];
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleBackClick = () => {
    navigate(-1);
   };

  useEffect(() => {
    const fetchCurrencies = async () => {
        const _currencies = await getCurrencies(user.token);
        if (unique_currencies.length === 0){
          setCurrencies(_currencies);
          if (_currencies.length === 0){
            setErrorMessage("No hay monedas disponibles! Comunicate con banco@digital.com para reportar el issue.")
          }
        }else{
          const excludedCurrencies = _currencies.filter(currency => {
            const currencyName = currency.name;
            return !unique_currencies.some(myCurrency => myCurrency.currency_name === currencyName);
          });
          setCurrencies(excludedCurrencies);
          if (excludedCurrencies.length === 0){
            setErrorMessage("No hay nuevas monedas disponibles, tienes cuenta en todas las monedas que tenemos disponibles.")
          }
        }
    };
  
    fetchCurrencies();
    
  }, []);
  
  const handleSave = async () => {
    const data = {
        "alias": alias,
        "currency_name": currency,
        "user_id": user_id,
    };
    const response = await create_account(data, user.token);
    navigate('/accounts');
  };

  return (
    <div>
      {errorMessage && <div><p className="error-message">{errorMessage}</p> <button onClick={handleBackClick}>Volver</button></div>}
      {!errorMessage && 
        <div>
          <h2>Crear nueva cuenta</h2>
          <div>
            <label htmlFor="currency">Selecciona la moneda:</label>
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="">Selecciona una moneda</option>
              {currencies.map((currency) => (
                <option key={currency.name} value={currency.name}>{currency.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="alias">Alias de la cuenta:</label>
            <input
              type="text"
              id="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleBackClick}>Volver</button>
        </div>
      }
    </div>
  );
};

export default CreateAccount;
