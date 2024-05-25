import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {get_accounts} from '../../store/actions/accounts';
import { useDispatch } from 'react-redux';
import { SELECT_ACCOUNT } from '../../store/types';


const AccountList = ( ) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const accounts = useSelector((state) => state.accounts.accounts);
  const authenticatedUserId = user["user_id"];
  const history = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, [authenticatedUserId]);

  const fetchAccounts = async () => {
    dispatch(get_accounts(authenticatedUserId, user.token));
  };

  const handleCreateAccount = () => {
    history(`/account/create`);
  };

  const handleAccountClick = (account) => {
    dispatch({ type: SELECT_ACCOUNT, payload: account });
    history('/movements');
  };

  return (
    <div>
      <h2>Cuentas</h2>
      <button onClick={handleCreateAccount}>Crear Cuenta</button>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            <div>Cuenta Status: {account.status}</div>
            <div>Cuenta ID: {account.id}</div>
            <div>Cuenta Alias: {account.alias}</div>
            <div>Balance: {account.total}</div>
            <div>Currency: {account.currency_name}</div>
            {account.status === 'active' && (
              <button onClick={() => handleAccountClick(account)}>Ver Movimientos</button>
            )}
            {account.status !== 'active' && (
              <p className="warning-message"> Solo se pueden ver movimientos de cuentas activas</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
