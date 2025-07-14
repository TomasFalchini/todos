import { useNavigate } from 'react-router-dom';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../query';
import { Todo } from '@shared/lib';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useCallback } from 'react';

export const useTodosCardMutations = ({ todo }: { todo: Todo }) => {
  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4d4f50';
      case 'medium':
        return '#fa8c1640';
      case 'low':
        return '#52c41a50';
      default:
        return '#d9d9d950';
    }
  }, []);

  const navigate = useNavigate();

  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();

  const handleToggleComplete = useCallback(async () => {
    updateMutation.mutateAsync({
      body: { completed: !todo.completed },
      id: todo.id,
    });
  }, [todo.completed, todo.id, updateMutation]);

  const handleDelete = () => {
    Modal.confirm({
      title: '¿Estás seguro?',
      icon: <ExclamationCircleFilled />,
      content: 'Esta acción eliminará la tarea permanentemente.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => deleteMutation.mutateAsync(todo.id),
    });
  };

  const handleViewDetail = () => {
    navigate(`/todo/${todo.id}`);
  };

  return {
    handleToggleComplete,
    handleDelete,
    handleViewDetail,
    updatePending: updateMutation.isPending,
    deletePending: deleteMutation.isPending,
    getPriorityColor,
  };
};
