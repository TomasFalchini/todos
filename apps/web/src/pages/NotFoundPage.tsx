import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/theme/ThemeContext';

export const NotFoundPage: React.FC = () => {
  const { isDark } = useTheme();
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
        background: isDark ? '#141414' : '#f0f2f5',
      }}
    >
      <Result
        status="404"
        title={
          <span style={{ color: isDark ? '#ffffff' : '#000000' }}>404</span>
        }
        subTitle={
          <span style={{ color: isDark ? '#d9d9d9' : '#595959' }}>
            Lo siento, la página que buscas no existe.
          </span>
        }
        extra={
          <Button type="primary" onClick={handleGoHome} size="large">
            Volver al Inicio
          </Button>
        }
        style={{
          background: isDark ? '#1f1f1f' : '#ffffff',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
        }}
      />
    </div>
  );
};
