import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_users, update_user, delete_users } from '../../services/users';

const AllUsers = () => {
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
      var pen = pending;
      if (start === true){
          oft = 0;
          pen = [];
      }
      const data = await get_users(null, user.token, false, oft);
      if (data.length === 0 || data.length < 10){
          setHasMorePages(false);
      }
      const new_pending = [...pen, ...data];
      setPending(new_pending);
      setOffset(oft+10);
    };
    fetch();
  };

  const handleStatusChange = (status, id) => {
    const fetch = async () => {
      const data = await update_user(id, {"status": status}, user.token);
      console.log(data);
      fetchData(true);
    };
    fetch();
  };

  const nextPage = () => {
    setOffset(offset+10);
    fetchData(false);
  }

  const DeleteUsers = (id) => {
    const fetch = async () => {
      const data = await delete_users(id, user.token);
      console.log(data);
      fetchData(true);
    };
    fetch();
    fetchData(true);
  }

  return (
    <div>
      <table className="movements-table">
            <thead>
              <tr>
                <th>Creación</th>
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
                    {row.is_deleted === false && row.status === 'created' && <button onClick={() => handleStatusChange("active", row.id)}>Activar</button>}
                    {row.is_deleted === false && row.status !== 'blocked' && <button onClick={() => handleStatusChange("blocked", row.id)}>Bloquear</button>}
                    {row.is_deleted === false && <button onClick={() => DeleteUsers(row.id)}>Borrar</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasMorePages === true && <button onClick={() => nextPage()}>Cargar más...</button>}
    </div>
  );
};

export default AllUsers;
