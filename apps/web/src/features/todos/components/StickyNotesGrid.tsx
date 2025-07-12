import React from 'react';
import { Row, Col, Typography, Empty, Card, Spin, Alert } from 'antd';
import { StickyNote } from './StickyNote';
import { Todo } from '@shared/lib'

const { Title, Text } = Typography;

interface StickyNotesGridProps {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export const StickyNotesGrid: React.FC<StickyNotesGridProps> = ({
  todos,
  isLoading,
  isError,
  error,
}) => {
  const { isDark } = useTheme();

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
        <Text type="secondary">
          {todos.length} tarea{todos.length !== 1 ? 's' : ''} en total
        </Text>
      </div>

      <Row gutter={[16, 16]} style={{ padding: '8px 0' }}>
        {todos.map(todo => (
          <Col
            key={todo.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            style={{ display: 'flex' }}
          >
            <StickyNote todo={todo} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
