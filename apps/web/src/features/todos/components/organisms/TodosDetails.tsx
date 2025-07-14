import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Tag, Descriptions, Flex, Modal } from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import {
  useGetTodoByIdQuery,
  useDeleteTodoMutation,
} from '@/features/todos/hooks';
import { AppModal, ErrorInPage, LoaderSkeleton } from '@/components/molecules';
import { CommonAppButton } from '@/components/atoms';
import { TodoItemsDate, TodosPriority } from '../atoms';
import { useAppModal } from '@/hooks';
import { EditTodoForm } from '../molecules';

const { Title, Text } = Typography;

export const TodoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: todo, isLoading, isError, error } = useGetTodoByIdQuery(id!);
  const deleteMutation = useDeleteTodoMutation();

  const { isOpen, openModal, closeModal } = useAppModal();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleDeleteAndGoBack = () => {
    Modal.confirm({
      title: '¿Estás seguro?',
      icon: <ExclamationCircleFilled />,
      content: 'Esta acción eliminará la tarea permanentemente.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => {
        deleteMutation.mutateAsync(id!);
        handleGoBack();
      },
    });
  };

  if (isLoading) return <LoaderSkeleton />;

  if (isError || !todo)
    return (
      <ErrorInPage title="Error al cargar la tarea" message={error?.message} />
    );

  return (
    <Flex className="flex-col gap-4 px-10! h-full">
      <AppModal title="Editar tarea" isModalOpen={isOpen} onClose={closeModal}>
        <EditTodoForm onClose={closeModal} initialValues={todo} id={id!} />
      </AppModal>
      <CommonAppButton
        title="Volver"
        icon={<ArrowLeftOutlined />}
        onClick={handleGoBack}
      />
      <Typography.Title level={2}>Detalles de la Tarea</Typography.Title>

      <Title level={4}>Titulo: {todo.title}</Title>
      <Text>
        Descripción de la tarea: {todo.description || 'No hay descripción'}
      </Text>

      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Estado">
          <Tag color={todo.completed ? 'green' : 'blue'}>
            {todo.completed ? 'Completada' : 'Pendiente'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Prioridad">
          <TodosPriority priority={todo.priority} />
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de creación">
          <TodoItemsDate date={todo.date} />
        </Descriptions.Item>
      </Descriptions>
      <div className="flex gap-10 mt-10">
        <CommonAppButton
          title="Editar"
          className="w-full"
          icon={<EditOutlined />}
          onClick={openModal}
        />
        <CommonAppButton
          type="default"
          className="w-full"
          title="Eliminar"
          icon={<DeleteOutlined />}
          onClick={handleDeleteAndGoBack}
        />
      </div>
    </Flex>
  );
};
