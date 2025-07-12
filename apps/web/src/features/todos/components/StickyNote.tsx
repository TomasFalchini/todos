import React, { useState } from 'react';
import {
  Card,
  Checkbox,
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  Modal,
  message,
  Input,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ClockCircleOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Todo } from '@shared/lib';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

interface StickyNoteProps {
  todo: Todo;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ todo }) => {
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Solo navegar si no se hizo click en un botón o checkbox
    if (
      !isEditing &&
      !(e.target as HTMLElement).closest(
        'button, .ant-checkbox-wrapper, .ant-dropdown'
      )
    ) {
      handleViewDetail();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ffcccb'; // Light red for sticky note
      case 'medium':
        return '#ffe4b5'; // Light orange for sticky note
      case 'low':
        return '#d4edda'; // Light green for sticky note
      default:
        return '#f8f9fa';
    }
  };

  const getPriorityBorderColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4d4f';
      case 'medium':
        return '#fa8c16';
      case 'low':
        return '#52c41a';
      default:
        return '#d9d9d9';
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

  const menuItems = [
    {
      key: 'view',
      label: 'Ver detalle',
      icon: <EyeOutlined />,
      onClick: handleViewDetail,
    },
    {
      key: 'edit',
      label: 'Editar',
      icon: <EditOutlined />,
      onClick: handleEdit,
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <DeleteOutlined />,
      onClick: handleDelete,
      danger: true,
    },
  ];

  return (
    <Card
      onClick={handleCardClick}
      style={{
        width: '100%',
        minHeight: '200px',
        opacity: todo.completed ? 0.7 : 1,
        background: isDark ? '#1f1f1f' : getPriorityColor(todo.priority),
        borderColor: getPriorityBorderColor(todo.priority),
        borderWidth: '2px',
        borderLeftWidth: '6px',
        transform: `rotate(${Math.random() * 4 - 2}deg)`, // Random slight rotation
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: isEditing ? 'default' : 'pointer',
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (!isEditing) {
          e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={e => {
        if (!isEditing) {
          e.currentTarget.style.transform = `rotate(${Math.random() * 4 - 2}deg) scale(1)`;
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
      }}
      bodyStyle={{ padding: '16px', height: '100%' }}
    >
      {/* Top Actions */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          gap: 4,
          opacity: 0.8,
        }}
      >
        <Checkbox
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={updateMutation.isPending}
          style={{ transform: 'scale(0.9)' }}
          onClick={e => e.stopPropagation()}
        />
        {!isEditing && (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              size="small"
              style={{
                color: isDark ? '#ffffff' : '#666666',
                opacity: 0.7,
              }}
              onClick={e => e.stopPropagation()}
            />
          </Dropdown>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          marginTop: 20,
          height: 'calc(100% - 60px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isEditing ? (
          <Space direction="vertical" style={{ width: '100%', flex: 1 }}>
            <Input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Título de la tarea"
              style={{
                fontWeight: 500,
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              }}
              onClick={e => e.stopPropagation()}
            />
            <TextArea
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              placeholder="Descripción (opcional)"
              rows={3}
              autoSize={{ minRows: 3, maxRows: 5 }}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                flex: 1,
              }}
              onClick={e => e.stopPropagation()}
            />
            <Space>
              <Button
                type="primary"
                onClick={e => {
                  e.stopPropagation();
                  handleSaveEdit();
                }}
                loading={updateMutation.isPending}
                size="small"
              >
                Guardar
              </Button>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  handleCancelEdit();
                }}
                size="small"
              >
                Cancelar
              </Button>
            </Space>
          </Space>
        ) : (
          <>
            <div style={{ marginBottom: 12, flex: 1 }}>
              <Text
                strong
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: isDark ? '#ffffff' : '#000000',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {todo.title}
              </Text>

              {todo.description && (
                <Paragraph
                  style={{
                    marginBottom: 0,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: isDark ? '#d9d9d9' : '#595959',
                    fontSize: '12px',
                    lineHeight: '1.3',
                  }}
                  ellipsis={{ rows: 4, tooltip: todo.description }}
                >
                  {todo.description}
                </Paragraph>
              )}
            </div>

            {/* Bottom Info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: 'auto',
              }}
            >
              <Tag
                color={getPriorityBorderColor(todo.priority)}
                style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  margin: 0,
                }}
              >
                {getPriorityText(todo.priority)}
              </Tag>
              <Text type="secondary" style={{ fontSize: '10px', opacity: 0.8 }}>
                <ClockCircleOutlined style={{ marginRight: 2 }} />
                {new Date(todo.createdAt).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                })}
              </Text>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
