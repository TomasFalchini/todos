import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { MenuButton, ViewToggleButtons } from '../atoms';
import { useAppModal } from '@/hooks';
import { AppModal } from '../molecules';
import { CreateTodoForm } from '@/features/todos';

export const Sidebar: React.FC = () => {
  const { isOpen, openModal, closeModal } = useAppModal();

  return (
    <>
      <div className="h-full flex flex-col gap-3 p-2 m-0 items-center justify-center">
        <MenuButton icon={<PlusOutlined />} onClick={openModal} />
        <ViewToggleButtons />
      </div>

      <AppModal title="Nueva Tarea" isModalOpen={isOpen} onClose={closeModal}>
        <CreateTodoForm onClose={closeModal} />
      </AppModal>
    </>
  );
};
