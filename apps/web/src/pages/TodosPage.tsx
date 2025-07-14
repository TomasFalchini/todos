import React from 'react';
import { TodosList } from '@/features/todos';
import { Flex, Typography } from 'antd';

export const TodosPage: React.FC = () => {
  return (
    <Flex vertical gap={24}>
      <Typography.Title level={2}>Mis Tareas</Typography.Title>
      <TodosList />
    </Flex>
  );
};
