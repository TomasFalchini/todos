import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Result
        className="rounded-lg p-10 shadow-lg"
        status="404"
        title={<span>404</span>}
        subTitle={<span>Lo siento, la página que buscas no existe.</span>}
        extra={
          <Button type="primary" onClick={handleGoHome} size="large">
            Volver al Inicio
          </Button>
        }
      />
    </div>
  );
};
