import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const MainLayout = () => {
  return (
    <Layout>
      <div className="fixed top-1/4 lg:left-5 left-3 z-[1000] lg:w-20 md:w-16 w-12 h-1/2 rounded-full shadow-lg border border-gray-300 overflow-hidden">
        <Sidebar />
      </div>

      <Layout className="lg:ml-24 md:ml-16 ml-12">
        <Content className="p-6 overflow-auto h-[100vh]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
