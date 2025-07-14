import { Tag } from 'antd';
import { useCallback } from 'react';

export const TodosPriority = ({ priority }: { priority: string }) => {
  const getPriorityColor = useCallback(
    (priority: string) => {
      switch (priority) {
        case 'high':
          return 'red';
        case 'medium':
          return 'orange';
        case 'low':
          return 'green';
        default:
          return 'default';
      }
    },
    []
  );

  return (
    <Tag className="text-xl font-bold" color={getPriorityColor(priority)}>
      {priority.toUpperCase()}
    </Tag>
  );
};
