import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import '../style.css';
import { signup } from '../../store/actions/authActions'

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSignup = () => {
    if (password === confirmPassword) {
      dispatch(signup(first_name, email, password));
      setErrorMessage('');
      window.location.href = '/';    
    } else {
      setErrorMessage('Las claves deben coincidir');
    }
  };

  const PasswordMatch = () => {
    if ((confirmPassword === null || password === null) || (password.length === 0 || confirmPassword.length === 0)){
      setErrorMessage('');
      return
    }
    if (password === confirmPassword) {
      setErrorMessage('');
    } else {
      setErrorMessage('Las claves deben coincidir');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Usuario</h2>
      <label>
          Nombre:
          <input
            type="text"
            style={styles.input}
            placeholder="Nombre"
            value={first_name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      <label>
          Email:
          <input
            type="text"
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      <label>
          Clave:
          <input
            type="password"
            style={styles.input}
            placeholder="Clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={PasswordMatch}
          />
        </label>
      <label>
          Confirmar clave:
          <input
            type="password"
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={PasswordMatch}
          />
        </label>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Button title="Crear" onClick={handleSignup} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
    padding: '0 10px',
  },
};

export default SignupScreen;
