import React, { useState } from 'react';
import { Button, Form, Input, Select, Card, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateTodoInput, TodoPriority } from '@shared/lib';
import { useCreateTodoMutation } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

const { TextArea } = Input;
const { Option } = Select;

export const CreateTodo: React.FC = () => {
  const [form] = Form.useForm();
  const { isDark } = useTheme();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);

  const createMutation = useCreateTodoMutation();

  const handleSubmit = async (values: CreateTodoInput) => {
    try {
      await createMutation.mutateAsync(values);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      form.resetFields();
      setIsCreating(false);
      message.success('Tarea creada correctamente');
    } catch (error) {
      message.error('Error al crear la tarea');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsCreating(false);
  };

  if (!isCreating) {
    return (
      <Card
        style={{
          marginBottom: 24,
          background: isDark ? '#1f1f1f' : '#fafafa',
          borderColor: isDark ? '#303030' : '#d9d9d9',
        }}
      >
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => setIsCreating(true)}
          block
          size="large"
          style={{
            height: 60,
            border: `2px dashed ${isDark ? '#434343' : '#d9d9d9'}`,
            color: isDark ? '#ffffff' : '#000000',
          }}
        >
          Crear nueva tarea
        </Button>
      </Card>
    );
  }

  return (
    <Card
      title="Nueva Tarea"
      style={{
        marginBottom: 24,
        background: isDark ? '#1f1f1f' : '#ffffff',
        borderColor: isDark ? '#303030' : '#d9d9d9',
      }}
      headStyle={{
        color: isDark ? '#ffffff' : '#000000',
        borderBottomColor: isDark ? '#303030' : '#f0f0f0',
      }}
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
            style={{
              backgroundColor: isDark ? '#141414' : '#ffffff',
              borderColor: isDark ? '#434343' : '#d9d9d9',
              color: isDark ? '#ffffff' : '#000000',
            }}
          />
        </Form.Item>

        <Form.Item name="description" label="Descripción (opcional)">
          <TextArea
            placeholder="Añade más detalles sobre la tarea..."
            rows={3}
            autoSize={{ minRows: 3, maxRows: 6 }}
            style={{
              backgroundColor: isDark ? '#141414' : '#ffffff',
              borderColor: isDark ? '#434343' : '#d9d9d9',
              color: isDark ? '#ffffff' : '#000000',
            }}
          />
        </Form.Item>

        <Form.Item name="priority" label="Prioridad">
          <Select
            size="large"
            style={{
              backgroundColor: isDark ? '#141414' : '#ffffff',
            }}
          >
            <Option value="low">🟢 Baja</Option>
            <Option value="medium">🟡 Media</Option>
            <Option value="high">🔴 Alta</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={createMutation.isPending}
              size="large"
            >
              Crear Tarea
            </Button>
            <Button onClick={handleCancel} size="large">
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
