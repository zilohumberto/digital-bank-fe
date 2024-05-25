import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {get_movements_admin, process_batch_transactions} from '../../services/transfer';
import { Tabs, Tab, Box } from '@mui/material';
import {getCurrencies} from '../../services/currency';


const PendingTransactions = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [currencyName, setCurrencyName] = useState('EUR');
  const [selectedTab, setSelectedTab] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    fetchMovements('EUR', true);
  }, []);

  const fetchMovements = (cn, start) => {
    const fetch = async () => {
      var oft = offset;
      var pen = pendingTransactions;
      if (start === true){
        oft = 0;
        pen = [];
      }
      console.log("golsd");
      const data = await get_movements_admin('created', cn, user.token, oft);
      if (data.length === 0 || data.length < 10){
          setHasMorePages(false);
      }
      const new_pending = [...pen, ...data];
      setPendingTransactions(new_pending);
      setOffset(oft+10);

      const _currencies = await getCurrencies(user.token);
      setCurrencies(_currencies);
      console.log(_currencies);

    };
    fetch();
  };


  const handleTabChange = (event, newValue)  => {
    console.log(newValue, "new value ", currencies[newValue].name);
    setCurrencyName(currencies[newValue].name)
    setSelectedTab(newValue);
    fetchMovements(currencies[newValue].name, true);
  }

  const nextPage = () => {
    setOffset(offset+10);
    fetchMovements(currencyName, false);
  }

  const handleApproveAll = () => {
    const fetch = async () => {
      const data = await process_batch_transactions(user.token);
      console.log(data);
    };
    if (pendingTransactions.length > 0){
      fetch();
    }
    fetchMovements(currencyName, true);
  };
  return (
    <div>
      <button onClick={handleApproveAll}>Procesar lote (10 por lote)</button>
      <Box sx={{ width: '100%' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
      {currencies.map((currency) => (
        <Tab key={currency.name} label={currency.name} />
      ))}
    </Tabs>
      <Box sx={{ padding: 2 }}>
      <table className="movements-table">
            <thead>
              <tr>
                <th>Creación</th>
                <th>Referencia</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {pendingTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.creation_time}</td>
                  <td>{transaction.reference}</td>
                  <td>{transaction.operation}</td>
                  <td>{transaction.operation_status}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasMorePages === true && <button onClick={() => nextPage()}>Cargar más...</button>}
      </Box>
    </Box>
      
    </div>
  );
};

export default PendingTransactions;
