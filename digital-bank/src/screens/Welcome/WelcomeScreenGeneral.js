import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { default as Button } from '../../components/Button'; 
import { default as Title } from '../../components/Title'; 
import { default as Container } from '../../components/Container'; 
import { default as ButtonContainer } from '../../components/ButtonContainer'; 


const WelcomeScreenGeneral = () => {
  const history = useNavigate();
  const has_error = useSelector((state) => state.auth.error);

  const handleSignin = () => {
    history('/login');
  };

  const handleSignup = () => {
    history('/signup');
  };

  return (
    <Container>
      <Title>Bienvenido</Title>

      <div>
            <br></br>
          {has_error && <p className="error-message">{has_error}</p>}
      </div>
      <ButtonContainer>
        <Button onClick={handleSignin} title="Iniciar Sesión">Iniciar Sesión</Button>
        <Button onClick={handleSignup} title="Crear Usuario">Crear Usuario</Button>
      </ButtonContainer>
    </Container>
  );
};

export default WelcomeScreenGeneral;
