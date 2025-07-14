import { ViewProvider } from '@/context';
import { AppRouter } from './Router';
import { ConfigProvider, App as AntdApp, theme } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Colores principales
          colorPrimary: '#B8A9C9', // Lavanda pastel

          // Colores de estado
          colorSuccess: '#A8D5BA', // Verde menta pastel
          colorWarning: '#F5E6A8', // Amarillo pastel
          colorError: '#F5A8A8', // Rojo pastel
          colorInfo: '#A8D0F5', // Celeste pastel

          // Colores base
          colorTextBase: '#2D2D2D', // Negro suave
          colorBgBase: '#FEFEFE', // Blanco cálido

          // Colores de texto
          colorText: '#2D2D2D',
          colorTextSecondary: '#6B6B6B',
          colorTextTertiary: '#9A9A9A',
          colorTextQuaternary: '#BFBFBF',

          // Colores de fondo
          colorBgContainer: '#FEFEFE',
          colorBgElevated: '#F8F8F8',
          colorBgLayout: '#F5F5F5',
          colorBgSpotlight: '#FEFEFE',

          // Bordes
          colorBorder: '#E8E8E8',
          colorBorderSecondary: '#F0F0F0',

          // Sombras más suaves
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          boxShadowSecondary: '0 4px 16px rgba(0, 0, 0, 0.08)',

          // Radio de bordes más suave
          borderRadius: 8,
          borderRadiusLG: 12,
          borderRadiusSM: 6,
          borderRadiusXS: 4,

          // Espaciado
          padding: 16,
          paddingLG: 24,
          paddingSM: 12,
          paddingXS: 8,
        },
        components: {
          Button: {
            colorPrimary: '#B8A9C9',
            colorPrimaryHover: '#A294B8',
            colorPrimaryActive: '#927FA7',
            borderRadius: 12,
          },
          Input: {
            colorBorder: '#E8E8E8',
            colorBgContainer: '#FEFEFE',
            borderRadius: 12,
          },
          Card: {
            colorBgContainer: '#FEFEFE',
            colorBorderSecondary: '#F0F0F0',
            borderRadiusLG: 12,
          },
          Menu: {
            colorBgContainer: '#FEFEFE',
            colorItemBg: 'transparent',
            colorItemBgSelected: '#F0EBFF',
            colorItemBgHover: '#F5F2FF',
            colorItemText: '#2D2D2D',
            colorItemTextSelected: '#B8A9C9',
          },
          Tabs: {
            colorBorderSecondary: '#F0F0F0',
            colorText: '#2D2D2D',
            colorTextSecondary: '#6B6B6B',
          },
          Layout: {
            colorBgHeader: '#FEFEFE',
            colorBgBody: '#F8F8F8',
            colorBgTrigger: '#F0F0F0',
            padding: 20,
            headerHeight: 64,
            headerPadding: '0 24px',
            siderBg: '#FEFEFE',
            triggerBg: '#F0F0F0',
            triggerColor: '#2D2D2D',
            borderRadius: 12,
          },
          Flex: {
            colorBgBase: '#FEFEFE',
            colorBgContainer: '#FEFEFE',
            padding: 20,
          },
          Checkbox: {
            colorPrimary: '#B8A9C9',
            colorPrimaryHover: '#A294B8',
            colorPrimaryActive: '#927FA7',
            colorPrimaryBorder: '#000000',
            borderRadius: 20,
          },
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <ViewProvider>
          <AppRouter />
        </ViewProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
