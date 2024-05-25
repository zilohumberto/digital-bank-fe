import React from 'react';
import { useNavigate } from 'react-router-dom';


const Success = () => {
    const history = useNavigate();
    const handleBackClick = () => {
        history("/movements");
    };
    return (
        <div>
          <h1>Transaction created!</h1>
          <button onClick={handleBackClick}>Ok</button>
        </div>
      );
};

export default Success;
