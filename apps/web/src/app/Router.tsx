import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodosPage } from '@/pages/TodosPage';
import { TodoDetailPage } from '@/pages/TodoDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MainLayout } from '@/components/organisms';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TodosPage />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
