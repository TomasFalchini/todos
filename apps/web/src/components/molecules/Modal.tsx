import React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';

interface AppModalProps extends ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  onClose: () => void;
  title: string;
}

export const AppModal = ({
  children,
  isModalOpen,
  onClose,
  title,
  ...props
}: AppModalProps) => {
  return (
    <AntdModal
      destroyOnHidden
      title={title}
      open={isModalOpen}
      onCancel={onClose}
      footer={null}
      className="!rounded-xl"
      {...props}
    >
      {children}
    </AntdModal>
  );
};
