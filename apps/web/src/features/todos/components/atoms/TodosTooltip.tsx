import { DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { Todo } from '@shared/lib';
import { useTodosCardMutations } from '../../hooks';
import { Button, Checkbox, Dropdown } from 'antd';

export const TodosToolstip = ({ todo }: { todo: Todo }) => {
  const {
    handleToggleComplete,
    handleDelete,
    handleViewDetail,
    updatePending,
  } = useTodosCardMutations({ todo });

  const menuItems = [
    {
      key: 'view',
      label: 'Ver detalle',
      icon: <EyeOutlined />,
      onClick: handleViewDetail,
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
    <div className="flex absolute top-2 right-2 justify-end items-center gap-2">
      <Checkbox
        className="cursor-pointer"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={updatePending}
        onClick={e => e.stopPropagation()}
      />
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<MoreOutlined />}
          size="small"
          onClick={e => e.stopPropagation()}
        />
      </Dropdown>
    </div>
  );
};
