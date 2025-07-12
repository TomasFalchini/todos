import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from '../organisms/Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Sidebar flotante */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          width: '80px',
          height: 'calc(100vh - 40px)',
          background: '#001529',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: `1px solid #303030`,
          overflow: 'hidden',
        }}
      >
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <Layout style={{ marginLeft: '120px', marginRight: '20px' }}>
        <Content
          style={{
            margin: '24px',
            padding: '24px',
            background: '#141414',
            borderRadius: '8px',
            overflow: 'auto',
            minHeight: 'calc(100vh - 48px)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
