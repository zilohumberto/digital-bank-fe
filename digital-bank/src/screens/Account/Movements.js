import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {get_movements} from '../../store/actions/accounts';
import { useDispatch } from 'react-redux';
import './account.css';
import { ACCOUNT_TRANSACTION_TYPE } from '../../store/types';


const MovementsPage = () => {
    const dispatch = useDispatch();
    const selectedAccount = useSelector((state) => state.accounts.account);
    const history = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const authenticatedUserId = user["user_id"];
    const movements = useSelector((state) => state.accounts.movements)  || [];
    const unique_currencies = useSelector((state) => state.accounts.unique_currencies);
    const [hasMoreCurrencies, setHasMoreCurrencies] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        fetchMovements();
        setHasMoreCurrencies(unique_currencies.length > 1);

        if (unique_currencies.length <= 1) {
          setErrorMessage('Se requiere una cuenta de otra moneda para realizar un Swap!');
        } else {
          setErrorMessage('');
        }
      }, [unique_currencies]);

    const fetchMovements = async () => {
        dispatch(get_movements(authenticatedUserId, selectedAccount.currency_name, user.token));
      };

    const handleBackClick = () => {
        history("/accounts");
    };

    const transfer = () => {
        dispatch({ type: ACCOUNT_TRANSACTION_TYPE, payload: 'Transfer' });
        history('/account/transaction');
    };

    const swap = () => {
        dispatch({ type: ACCOUNT_TRANSACTION_TYPE, payload: 'Swap' });
        history('/account/transaction');
    };

    const withdrawal = () => {
        dispatch({ type: ACCOUNT_TRANSACTION_TYPE, payload: 'Withdrawal' });
        history('/account/transaction');
    };
    const deposit = () => {
        dispatch({ type: ACCOUNT_TRANSACTION_TYPE, payload: 'Deposit' });
        history('/account/transaction');
    };

    return (
        <div>
          <h1>Movements</h1>
          <div>
            <p>Currency: {selectedAccount.currency_name}</p>
            <p>Alias: {selectedAccount.alias}</p>
            <p>Balance: {selectedAccount.total}</p>
          </div>

          <button onClick={transfer}>Transferir</button>
          <button onClick={swap} disabled={!hasMoreCurrencies}>Swap</button>
          <button onClick={withdrawal}>Retirar</button>
          <button onClick={deposit}>Depositar</button>
          <div>
            <br></br>
          {errorMessage && <p className="warning-message">{errorMessage}</p>}
          </div>
          <table className="movements-table">
            <thead>
              <tr>
               
                <th>Fecha</th>
                <th>Referencia</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Monto</th>
                <th>Saldo Total</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => (
                <tr key={movement.id}>
                  <td>{movement.creation_time}</td>
                  <td>{movement.reference}</td>
                  <td>{movement.operation}</td>
                  <td>{movement.operation_status}</td>
                  <td>{movement.amount}</td>
                  <td>{movement.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleBackClick}>Volver</button>
        </div>
      );
      
};

export default MovementsPage;
