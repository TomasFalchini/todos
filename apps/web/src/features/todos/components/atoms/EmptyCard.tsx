import { Card, Empty, Typography } from 'antd';

export const EmptyCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Card>
      <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        description={
          <div>
            <Typography.Title level={2}>{title}</Typography.Title>
            <Typography.Text>{description}</Typography.Text>
          </div>
        }
      />
    </Card>
  );
};
