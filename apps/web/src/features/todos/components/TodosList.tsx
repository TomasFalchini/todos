import React, { useRef } from 'react';
import { List, Spin, Alert, Typography, Empty, Card } from 'antd';
import { useTodosPaginated } from '../hooks';
import { TodoItem } from './TodoItem';
import { StickyNotesGrid } from './StickyNotesGrid';
import { useView } from '@/context/view/ViewContext';
import { Todo } from '@shared/lib';

const { Title, Text } = Typography;

export const TodosList: React.FC = () => {
  const { isDark } = useTheme();
  const { viewType } = useView();
  const listRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useTodosPaginated();

  // El servicio getTodosPaginated ahora devuelve directamente Todo[]
  const todos: Todo[] = data || [];

  // Si es vista sticky notes, usar el componente específico
  if (viewType === 'sticky') {
    return (
      <StickyNotesGrid
        todos={todos}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  // Vista de lista tradicional
  if (isLoading) {
    return (
      <Card style={{ textAlign: 'center', padding: '48px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Cargando tareas...</Text>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error al cargar tareas"
        description={error?.message || 'Hubo un problema al cargar las tareas'}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  if (todos.length === 0) {
    return (
      <Card>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span style={{ color: isDark ? '#ffffff' : '#000000' }}>
              No tienes tareas aún. ¡Crea tu primera tarea!
            </span>
          }
        />
      </Card>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title
          level={2}
          style={{ margin: 0, color: isDark ? '#ffffff' : '#000000' }}
        >
          Mis Tareas
        </Title>
      </div>

      <div
        ref={listRef}
        style={{
          maxHeight: '100%',
          overflowY: 'auto',
          paddingRight: 8,
        }}
      >
        <List
          dataSource={todos}
          renderItem={todo => (
            <List.Item style={{ padding: 0, marginBottom: 16 }}>
              <TodoItem todo={todo} />
            </List.Item>
          )}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};
