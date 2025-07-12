import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useView } from '@/context/view/ViewContext';
import { useCreateTodoMutation } from '@/features/todos/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { CreateTodoInput, TodoPriority } from '@shared/lib';

const { TextArea } = Input;
const { Option } = Select;

export const Sidebar: React.FC = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const { viewType, setViewType } = useView();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createMutation = useCreateTodoMutation();

  const handleCreateTodo = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: CreateTodoInput) => {
    try {
      await createMutation.mutateAsync(values);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      form.resetFields();
      setIsModalOpen(false);
      message.success('Tarea creada correctamente');
    } catch (error) {
      message.error('Error al crear la tarea');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-full flex flex-col items-center py-5 px-2 gap-4">
        {/* Create Task Button */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateTodo}
          size="large"
          className="!w-12 !h-12 !rounded-xl !flex !items-center !justify-center"
        />

        {/* View Toggle Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type={viewType === 'sticky' ? 'primary' : 'default'}
            icon={<AppstoreOutlined />}
            onClick={() => setViewType('sticky')}
            size="large"
            className="!w-12 !h-12 !rounded-xl !flex !items-center !justify-center"
          />

          <Button
            type={viewType === 'list' ? 'primary' : 'default'}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewType('list')}
            size="large"
            className="!w-12 !h-12 !rounded-xl !flex !items-center !justify-center"
          />
        </div>

        {/* Spacer to push theme toggle to bottom */}
        <div className="flex-1" />

        {/* Theme Toggle */}
        <Button
          type="text"
          icon={currentTheme === 'dark' ? <MoonOutlined /> : <SunOutlined />}
          onClick={toggleTheme}
          size="large"
          className="!w-12 !h-12 !rounded-xl !flex !items-center !justify-center !text-lg text-primary-500 hover:!bg-hover"
        />
      </div>

      {/* Modal for Create Todo */}
      <Modal
        title="Nueva Tarea"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="!rounded-xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            priority: 'medium' as TodoPriority,
          }}
        >
          <Form.Item
            name="title"
            label="Título"
            rules={[
              { required: true, message: 'El título es requerido' },
              { max: 200, message: 'El título es muy largo' },
            ]}
          >
            <Input
              placeholder="¿Qué necesitas hacer?"
              size="large"
              className="!rounded-lg"
            />
          </Form.Item>

          <Form.Item name="description" label="Descripción (opcional)">
            <TextArea
              placeholder="Añade más detalles sobre la tarea..."
              rows={3}
              autoSize={{ minRows: 3, maxRows: 6 }}
              className="!rounded-lg"
            />
          </Form.Item>

          <Form.Item name="priority" label="Prioridad">
            <Select size="large" className="!rounded-lg">
              <Option value="low">🟢 Baja</Option>
              <Option value="medium">🟡 Media</Option>
              <Option value="high">🔴 Alta</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={handleCancel} className="!rounded-lg">
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                loading={createMutation.isPending}
                className="!rounded-lg"
              >
                Crear Tarea
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
