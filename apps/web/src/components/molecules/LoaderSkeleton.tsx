import { Skeleton } from 'antd';

export const LoaderSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          style={{ marginBottom: 24, borderRadius: 10, padding: 16 }}
        >
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      ))}
    </>
  );
};
