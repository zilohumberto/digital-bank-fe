import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_accounts_by_status, update_account, process_batch_account } from '../../store/actions/accounts';

const PendingAccounts = () => {
  const [pending, setPending] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchData(true);
  }, []);

  const fetchData = (start) => {
    const fetch = async () => {
      var oft = offset;
      var p = pending;
      if (start===true){
        oft = 0;
          p = [];
      }
      const response = await get_accounts_by_status('created', user.token, oft);
      const data = response["data"];
      if (data.length === 0 || data.length < 10){
        setHasMorePages(false);
      }
      const new_pending = [...p, ...data];
      setPending(new_pending);
      setOffset(oft+10);
    };
    fetch();
  };

  const nextPage = () => {
    setOffset(offset+10);
    fetchData(false);
  }

  const handleApproveAll = () => {
    const fetch = async () => {
      const data = await process_batch_account(user.token);
      console.log(data);
    };
    if (pending.length > 0){
      fetch();
    }
    fetchData(true);
  };

  const handleStatusChange = (status, account_id) => {
    const fetch = async () => {
      //const data = await update_account(account_id, {"status": status}, user.token);
      //console.log(data);
      fetchData(true);
    };
    fetch();
  };

  return (
    <div>
      <button onClick={handleApproveAll}>Procesar lote (10 por lote)</button>
      <table className="movements-table">
            <thead>
              <tr>
                <th>Creación</th>
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
          {hasMorePages === true && <button onClick={() => nextPage()}>Cargar más...</button>}
    </div>
  );
};

export default PendingAccounts;
