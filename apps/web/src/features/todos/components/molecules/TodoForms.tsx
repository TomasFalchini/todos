import { Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CreateTodoInput, UpdateTodoInput } from '@shared/lib';
import { CommonAppButton } from '@/components/atoms';
import { useCreateTodoMutation, useUpdateTodoMutation } from '@/features/todos';

type TodoFormProps<T> = {
  onClose: () => void;
  onFinish: (values: T) => void;
  initialValues?: T;
  submitButtonText?: string;
};

// Componente base genérico
export const TodoForm = <T extends CreateTodoInput | UpdateTodoInput>({
  onClose,
  onFinish,
  initialValues,
  submitButtonText = 'Crear Tarea',
}: TodoFormProps<T>) => {
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = async (values: T) => {
    onFinish(values);
    handleClose();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
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
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item name="description" label="Descripción (opcional)">
        <TextArea
          placeholder="Añade más detalles sobre la tarea..."
          rows={3}
          maxLength={200}
          autoSize={{ minRows: 3, maxRows: 6 }}
          className="!rounded-lg"
        />
      </Form.Item>

      <Form.Item name="priority" label="Prioridad">
        <Select size="large" className="!rounded-lg">
          <Select.Option value="low">🟢 Baja</Select.Option>
          <Select.Option value="medium">🟡 Media</Select.Option>
          <Select.Option value="high">🔴 Alta</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <CommonAppButton title={submitButtonText} htmlType="submit" />
      </Form.Item>
    </Form>
  );
};

export const CreateTodoForm = ({ onClose }: { onClose: () => void }) => {
  const mutation = useCreateTodoMutation();

  return (
    <TodoForm<CreateTodoInput>
      onClose={onClose}
      onFinish={values => mutation.mutateAsync(values)}
      submitButtonText="Crear"
    />
  );
};

export const EditTodoForm = ({
  onClose,
  initialValues,
  id,
}: {
  onClose: () => void;
  initialValues: UpdateTodoInput;
  id: string;
}) => {
  const mutation = useUpdateTodoMutation();

  return (
    <TodoForm<UpdateTodoInput>
      onClose={onClose}
      onFinish={values => mutation.mutateAsync({ body: values, id })}
      initialValues={initialValues}
      submitButtonText="Actualizar"
    />
  );
};
