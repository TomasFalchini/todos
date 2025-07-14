import { Button, ButtonProps } from 'antd';

export const CommonAppButton = ({
  title,
  ...props
}: ButtonProps & { title: string }) => {
  return (
    <Button
      type="primary"
      className="!rounded-full w-20 h-12 p-2 text-center"
      {...props}
    >
      {title}
    </Button>
  );
};
