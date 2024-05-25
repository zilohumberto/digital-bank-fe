import React from 'react';
import PendingUsers from './UsersWaitingForApproval';
import PendingAccounts from './Accounts';
import PendingTransactions from './Transactions';
import './../Account/account.css';
import { useSelector } from 'react-redux';


const DashboardScreen = () => {
  const total_users = 0;
  const total_accounts = 0;
  const total_transactions = 0;
  const total_fee_usd = 0;
  const total_fee_eur = 0;
  const total_fee_ars = 0;
  const total_accounts_pending = 0;
  const total_transactions_pending = 0;
  
  const user = useSelector((state) => state.auth.user);
  const profile = user.profile;
  
  return (
    <div style={styles.container}>
      {profile ==='admin' && (
        <>
          

          <div style={styles.column}>
            <h2>Operaciones Pendientes de Aprobación</h2>
            <PendingTransactions />
          </div>
          <div style={styles.column}>
            <h2>Usuarios Pendientes de Aprobación</h2>
            <PendingUsers/>
          </div>
          <div style={styles.column}>
            <h2>Cuentas Pendientes de Aprobación</h2>
            <PendingAccounts/>
          </div>
        </>
      )
    }
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  numbersContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '20px',
    fontSize: '18px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
  },
  column: {
    flex: 1,
    minWidth: '300px',
    margin: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: '#fff',
  },
};

export default DashboardScreen;

