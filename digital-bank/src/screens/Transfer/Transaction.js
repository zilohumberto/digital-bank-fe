import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyAccount, performTransaction, getRate } from '../../services/transfer';
import './transfer.css';
import '../style.css';

const TransactionScreen = () => {
  const transaction_type = useSelector((state) => state.accounts.transaction_type);
  const user = useSelector((state) => state.auth.user);
  const user_id = user["user_id"];
  const selectedAccount = useSelector((state) => state.accounts.account);
  const unique_currencies = useSelector((state) => state.accounts.unique_currencies);
  const currency_name = selectedAccount.currency_name; 
  const [targetAccount, setTargetAccount] = useState('');
  const [targetAlias, setTargetAlias] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dropDownCurrencies, setDropDownCurrencies] = useState([]);
  const [convertionRate, setConvertionRate] = useState(null);

  const navigate = useNavigate();

  const handleAccountVerification = async () => {
    if (targetAlias === null || targetAlias.length === 0){
      return ;
    }
    const destination_account_id = await verifyAccount(targetAlias, currency_name, user.token);
    if (destination_account_id === null) {
      setErrorMessage('La cuenta no existe!');
    } else {
      setTargetAccount(destination_account_id);
      setErrorMessage('');
    }
  };

  const getConvertionRate = async (ocn, dcn) => {
    const rate = await getRate({"origin_currency_name": ocn, "destination_currency_name": dcn}, user.token);
    setConvertionRate(rate);
  };

  const handleBackClick = () => {
    navigate("/movements");
  };

  const findById = (id) => {
    return dropDownCurrencies.find(currency => currency.id === id);
  };

  const changeCurrencyTargetAccount = (value) => {
    const currencyById = findById(value);
    const dcn = currencyById["currency_name"];
    getConvertionRate(selectedAccount.currency_name, dcn)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var new_description = description;
    var new_target_account = targetAccount;
    if (transaction_type === 'Withdrawal'){
      new_target_account = selectedAccount.id;
      new_description = 'Withdrawal';
    }else if (transaction_type === 'Deposit'){
      new_target_account = selectedAccount.id;
      new_description = 'Deposit';
    }
    const transaction_type_new = transaction_type === 'Swap' ? "Transfer" : transaction_type;
    if (selectedAccount.id === new_target_account && transaction_type === 'Transfer'){
      setErrorMessage('No se puede realizar una transferencia a tu misma cuenta!');
      return;
    }


    const is_success = await performTransaction({
      "operation": transaction_type_new,
      "user_id": user_id,
      "origin_account_id":  selectedAccount.id,
      "destination_account_id": new_target_account,
      "amount": parseFloat(amount),
      "reference": new_description,
      "currency_name": selectedAccount.currency_name
    }, user.token);
    if (is_success){
      navigate('/account/transaction/success');
    }else{
      setErrorMessage('No se pudo realizar la transaction. intente nuevamente');
    }
  };

  useEffect(() => {
    const filteredCurrencies = unique_currencies.filter(currency => currency.currency_name !== currency_name);
    setDropDownCurrencies(filteredCurrencies);
  }, [currency_name, unique_currencies]);


  return (
    <div className="transaction-container">
      <h1>Transaccion: {transaction_type}</h1>
      <h5>Cuenta en {currency_name}</h5>
      <form onSubmit={handleSubmit}>
        {transaction_type === 'Transfer' && (
          <>
            <label>
              Alias cuenta destino:
              <input
                type="text"
                value={targetAlias}
                onChange={(e) => setTargetAlias(e.target.value)}
                onBlur={handleAccountVerification}
              />
            </label>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <label>
              Monto:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label>
              Referencia:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </>
        )}
        {transaction_type === 'Swap' && (
          <>
            <div>
              <label htmlFor="currency">Moneda a cambiar:</label>
              <select id="currency" value={targetAccount} onChange={(e) => setTargetAccount(e.target.value)} onBlur={(e) => changeCurrencyTargetAccount(e.target.value)}>
                <option value="">Selecciona una moneda</option>
                {dropDownCurrencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>{currency.currency_name}</option>
                ))}
              </select>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {convertionRate && <p className="warning-message"> La tasa de cambio sera: {convertionRate}</p>}
            <label>
              Monto:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </>
        )}
        {transaction_type === 'Withdrawal' && (
          <label>
            Monto:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        )}
        {transaction_type === 'Deposit' && (
          <label>
            Monto:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        )}
        <button onClick={handleBackClick}>Volver</button>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default TransactionScreen;
