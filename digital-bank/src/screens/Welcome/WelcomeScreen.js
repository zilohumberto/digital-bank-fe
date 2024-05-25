import React from 'react';
import { useNavigate } from 'react-router-dom';
import { default as Button } from '../../components/Button'; 
import { default as Title } from '../../components/Title'; 
import { default as Container } from '../../components/Container'; 
import { default as ButtonContainer } from '../../components/ButtonContainer'; 
import { useSelector } from 'react-redux';

const WelcomeScreen = () => {
  const history = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const profile = user['profile'];

  const getAccounts = () => {
    history('/accounts');
  };

  const getDashboard = () => {
    history('/dashboard');
  };
  console.log(profile, user);
  return (
    <Container>
      <Title>Hola, {user.name} </Title>
      <ButtonContainer>
        {profile==='admin'  && <Button onClick={getDashboard} title="Dashboard (como admin)">Dashboard (como admin)</Button>}
        <Button onClick={getAccounts} title="Acceso a mis cuentas">Acceso a mis cuentas</Button>
      </ButtonContainer>
    </Container>
  );
};

export default WelcomeScreen;
