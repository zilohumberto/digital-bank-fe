import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_users, update_user, process_batch_users } from '../../services/users';

const PendingUsers = () => {
  const [pending, setPending] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const fetch = async () => {
      const data = await get_users('created', user.token);
      setPending(data);
    };
    fetch();
  };

  const handleApproveAll = () => {
    const fetch = async () => {
      const data = await process_batch_users(user.token);
      console.log(data);
    };
    if (pending.length > 0){
      fetch();
    }
    fetchData();
  };

  const handleStatusChange = (status, id) => {
    const fetch = async () => {
      const data = await update_user(id, {"status": status}, user.token);
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
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((row) => (
                <tr key={row.id}>
                  <td>{row.creation_time}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.status}</td>
                  <td>
                    <button onClick={() => handleStatusChange("active", row.id)}>Aprobar</button>
                    <button onClick={() => handleStatusChange("blocked", row.id)}>Blockear</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default PendingUsers;
