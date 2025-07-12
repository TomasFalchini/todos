import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
  Tag,
  Space,
  Spin,
  Alert,
  Descriptions,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '@/features/todos/hooks';
import { useTheme } from '@/context/theme/ThemeContext';
import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const TodoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const queryClient = useQueryClient();

  const { data: todo, isLoading, isError, error } = useGetTodoByIdQuery(id!);
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleToggleComplete = async () => {
    if (!todo) return;

    try {
      await updateMutation.mutateAsync({
        ...todo,
        completed: !todo.completed,
      });
      queryClient.invalidateQueries({ queryKey: ['todo', id] });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success(
        todo.completed ? 'Tarea marcada como pendiente' : 'Tarea completada'
      );
    } catch (error) {
      message.error('Error al actualizar la tarea');
    }
  };

  const handleDelete = async () => {
    if (!todo) return;

    try {
      await deleteMutation.mutateAsync(todo.id);
      message.success('Tarea eliminada correctamente');
      navigate('/');
    } catch (error) {
      message.error('Error al eliminar la tarea');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return priority;
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Cargando tarea...</Text>
        </div>
      </div>
    );
  }

  if (isError || !todo) {
    return (
      <div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          style={{ marginBottom: 16 }}
        >
          Volver
        </Button>
        <Alert
          message="Error al cargar la tarea"
          description={
            error?.message ||
            'La tarea no existe o hubo un problema al cargarla'
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header con botón de volver */}
      <div
        style={{
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          size="large"
        >
          Volver
        </Button>
        <Title
          level={2}
          style={{ margin: 0, color: isDark ? '#ffffff' : '#000000' }}
        >
          Detalle de Tarea
        </Title>
      </div>

      {/* Contenido principal */}
      <Card
        style={{
          background: isDark ? '#1f1f1f' : '#ffffff',
          borderColor: isDark ? '#303030' : '#d9d9d9',
        }}
        actions={[
          <Button
            key="complete"
            type={todo.completed ? 'default' : 'primary'}
            onClick={handleToggleComplete}
            loading={updateMutation.isPending}
          >
            {todo.completed
              ? 'Marcar como pendiente'
              : 'Marcar como completada'}
          </Button>,
          <Button
            key="edit"
            icon={<EditOutlined />}
            onClick={() => {
              // TODO: Implementar edición inline o modal
              message.info('Función de edición próximamente');
            }}
          >
            Editar
          </Button>,
          <Button
            key="delete"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            loading={deleteMutation.isPending}
          >
            Eliminar
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 24 }}>
          <Title
            level={3}
            style={{
              margin: 0,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: isDark ? '#ffffff' : '#000000',
              opacity: todo.completed ? 0.7 : 1,
            }}
          >
            {todo.title}
          </Title>
        </div>

        {todo.description && (
          <div style={{ marginBottom: 24 }}>
            <Title level={5} style={{ color: isDark ? '#ffffff' : '#000000' }}>
              Descripción
            </Title>
            <Paragraph
              style={{
                color: isDark ? '#d9d9d9' : '#595959',
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.7 : 1,
                fontSize: '16px',
                lineHeight: '1.6',
              }}
            >
              {todo.description}
            </Paragraph>
          </div>
        )}

        <Descriptions
          column={1}
          bordered
          size="small"
          style={{
            background: isDark ? '#141414' : '#fafafa',
          }}
        >
          <Descriptions.Item label="Estado">
            <Tag color={todo.completed ? 'green' : 'blue'}>
              {todo.completed ? 'Completada' : 'Pendiente'}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Prioridad">
            <Tag color={getPriorityColor(todo.priority)}>
              {getPriorityText(todo.priority)}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Fecha de creación">
            <Space>
              <ClockCircleOutlined />
              <Text>
                {new Date(todo.createdAt).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Última modificación">
            <Space>
              <ClockCircleOutlined />
              <Text>
                {new Date(todo.updatedAt).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};
