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

  useEffect(() => {
    fetchMovements('EUR');
  }, []);

  const fetchMovements = (cn) => {
    const fetch = async (cn) => {
      const data = await get_movements_admin('created', cn, user.token);
      console.log(data['data'],cn ,selectedTab);
      setPendingTransactions(data["data"]);

      const _currencies = await getCurrencies(user.token);
      setCurrencies(_currencies);
      console.log(_currencies);
    };
    fetch(cn);
  };


  const handleTabChange = (event, newValue)  => {
    console.log(newValue, "new value ", currencies[newValue].name);
    setCurrencyName(currencies[newValue].name)

    setSelectedTab(newValue);
    fetchMovements(currencies[newValue].name);
  }

  const handleApproveAll = () => {
    const fetch = async () => {
      const data = await process_batch_transactions(user.token);
      console.log(data);
    };
    if (pendingTransactions.length > 0){
      fetch();
    }
    fetchMovements(currencyName);
  };
  return (
    <div>
      <button onClick={handleApproveAll}>Procesar lote (10 por lote)</button>
      <button onClick={fetchMovements}>Refrescar </button>
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
                <th>Creacion</th>
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
      </Box>
    </Box>
      
    </div>
  );
};

export default PendingTransactions;
