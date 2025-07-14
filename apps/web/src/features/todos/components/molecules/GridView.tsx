import { Col, Row } from 'antd';
import { Todo } from '@shared/lib';
import { StickyNote } from '../atoms';

export const GridView = ({ todos }: { todos: Todo[] }) => (
  <Row gutter={[16, 16]} style={{ padding: '8px 0' }}>
    {todos.map(todo => (
      <Col
        key={todo.id}
        xs={24}
        sm={24}
        md={12}
        lg={8}
        xl={8}
        xxl={6}
        style={{ display: 'flex' }}
      >
        <StickyNote todo={todo} />
      </Col>
    ))}
  </Row>
);
