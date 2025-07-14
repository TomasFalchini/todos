import { Result } from 'antd';
import { CommonAppButton } from '../atoms';

export const ErrorInPage = ({
  title,
  message,
}: {
  title: string;
  message?: string;
}) => {
  return (
    <Result
      status="error"
      title={title}
      subTitle={message || 'Hubo un problema al intentar cargar la página'}
      extra={
        <CommonAppButton
          title="Reintentar"
          onClick={() => window.location.reload()}
        />
      }
    />
  );
};
