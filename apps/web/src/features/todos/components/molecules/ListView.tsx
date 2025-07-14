import { List } from 'antd';
import { Todo } from '@shared/lib';
import { TodoItem } from '../atoms';

export const ListView = ({ todos }: { todos: Todo[] }) => (
  <List
    dataSource={todos}
    renderItem={todo => (
      <List.Item style={{ padding: 0, marginBottom: 4 }}>
        <TodoItem todo={todo} />
      </List.Item>
    )}
    style={{ width: '100%' }}
  />
);
