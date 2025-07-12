import { ThemeProvider, ViewProvider } from '@/context';
import { AppRouter } from './Router';

function App() {
  return (
    <ThemeProvider>
      <ViewProvider>
        <AppRouter />
      </ViewProvider>
    </ThemeProvider>
  );
}

export default App;
