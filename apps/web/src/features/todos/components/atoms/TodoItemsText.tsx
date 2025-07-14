import { ClockCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const TodoItemsTitle = ({
  title,
  completed,
}: {
  title: string;
  completed: boolean;
}) => {
  return (
    <Typography.Text
      strong
      className="text-xl"
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {title}
    </Typography.Text>
  );
};

const TodoItemsDescription = ({
  description,
  completed,
}: {
  description?: string;
  completed: boolean;
}) => {
  return (
    <Typography.Paragraph
      className="text-sm pl-2"
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
      ellipsis={{ rows: 2, expandable: true, symbol: 'más' }}
    >
      {description || 'Sin descripción'}
    </Typography.Paragraph>
  );
};

export const TodoItemsText = ({
  title,
  description,
  completed,
}: {
  title: string;
  description?: string;
  completed: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <TodoItemsTitle title={title} completed={completed} />
      <TodoItemsDescription description={description} completed={completed} />
    </div>
  );
};

export const TodoItemsDate = ({ date }: { date: Date }) => {
  return (
    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
      <ClockCircleOutlined style={{ marginRight: 4 }} />
      {new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })}
    </Typography.Text>
  );
};
