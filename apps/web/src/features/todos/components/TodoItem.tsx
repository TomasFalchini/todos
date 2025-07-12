import React, { useState } from 'react';
import {
  Card,
  Checkbox,
  Typography,
  Button,
  Space,
  Tag,
  Modal,
  message,
  Input,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Todo } from '@todos/shared';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../hooks';
import { useTheme } from '@/context/theme/ThemeContext';
import { useQueryClient } from '@tanstack/react-query';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ''
  );

  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();

  const handleToggleComplete = async () => {
    try {
      await updateMutation.mutateAsync({
        ...todo,
        completed: !todo.completed,
      });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success(
        todo.completed ? 'Tarea marcada como pendiente' : 'Tarea completada'
      );
    } catch (error) {
      message.error('Error al actualizar la tarea');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateMutation.mutateAsync({
        ...todo,
        title: editTitle,
        description: editDescription,
      });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsEditing(false);
      message.success('Tarea actualizada correctamente');
    } catch (error) {
      message.error('Error al actualizar la tarea');
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: '¿Estás seguro?',
      icon: <ExclamationCircleFilled />,
      content: 'Esta acción eliminará la tarea permanentemente.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteMutation.mutateAsync(todo.id);
          queryClient.invalidateQueries({ queryKey: ['todos'] });
          message.success('Tarea eliminada correctamente');
        } catch (error) {
          message.error('Error al eliminar la tarea');
        }
      },
    });
  };

  const handleViewDetail = () => {
    navigate(`/todo/${todo.id}`);
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

  return (
    <Card
      size="small"
      style={{
        width: '100%',
        opacity: todo.completed ? 0.7 : 1,
        background: isDark ? '#1f1f1f' : '#ffffff',
        borderColor: isDark ? '#303030' : '#d9d9d9',
      }}
      actions={
        isEditing
          ? [
              <Button
                key="save"
                type="primary"
                onClick={handleSaveEdit}
                loading={updateMutation.isPending}
              >
                Guardar
              </Button>,
              <Button key="cancel" onClick={handleCancelEdit}>
                Cancelar
              </Button>,
            ]
          : undefined
      }
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Checkbox
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={updateMutation.isPending}
        />

        <div style={{ flex: 1 }}>
          {isEditing ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="Título de la tarea"
                style={{ fontWeight: 500 }}
              />
              <TextArea
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Descripción (opcional)"
                rows={2}
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Space>
          ) : (
            <>
              <div style={{ marginBottom: 8 }}>
                <Text
                  strong
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: isDark ? '#ffffff' : '#000000',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={handleViewDetail}
                >
                  {todo.title}
                </Text>
              </div>

              {todo.description && (
                <Paragraph
                  style={{
                    marginBottom: 12,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: isDark ? '#d9d9d9' : '#595959',
                  }}
                  ellipsis={{ rows: 2, expandable: true, symbol: 'más' }}
                >
                  {todo.description}
                </Paragraph>
              )}

              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Tag color={getPriorityColor(todo.priority)}>
                    {getPriorityText(todo.priority)}
                  </Tag>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {new Date(todo.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </div>

                <Space>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                    size="small"
                    style={{
                      color: isDark ? '#1890ff' : '#1890ff',
                    }}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    size="small"
                    style={{
                      color: '#ff4d4f',
                    }}
                  />
                </Space>
              </Space>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
