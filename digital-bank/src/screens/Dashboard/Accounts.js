import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_accounts_by_status, update_account, process_batch_account } from '../../store/actions/accounts';

const PendingAccounts = () => {
  const [pending, setPending] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const fetch = async () => {
      const data = await get_accounts_by_status('created', user.token);
      setPending(data["data"]);
    };
    fetch();
  };

  const handleApproveAll = () => {
    const fetch = async () => {
      const data = await process_batch_account(user.token);
      console.log(data);
    };
    if (pending.length > 0){
      fetch();
    }
    fetchData();
  };

  const handleStatusChange = (status, account_id) => {
    const fetch = async () => {
      const data = await update_account(account_id, {"status": status}, user.token);
      console.log(data);
      fetchData();
    };
    fetch();
  };

  return (
    <div>
      <button onClick={handleApproveAll}>Procesar lote (10 por lote)</button>
      <button onClick={fetchData}>Refrescar </button>
      <table className="movements-table">
            <thead>
              <tr>
                <th>Creacion</th>
                <th>Alias</th>
                <th>Moneda</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((row) => (
                <tr key={row.id}>
                  <td>{row.creation_time}</td>
                  <td>{row.alias}</td>
                  <td>{row.currency_name}</td>
                  <td>{row.status}</td>
                  <td>
                    <button onClick={() => handleStatusChange("active", row.id)}>Aprobar</button>
                    <button onClick={() => handleStatusChange("blocked", row.id)}>Bloquear</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default PendingAccounts;
