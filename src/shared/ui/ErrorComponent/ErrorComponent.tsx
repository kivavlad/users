import React from "react";
import { Alert } from "antd";

interface IProps {
  error: unknown;
  message: string;
}

export const ErrorComponent: React.FC<IProps> = ({ error, message }) => {
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'Неизвестная ошибка';

  return (
    <Alert
      message={message}
      description={errorMessage}
      type="error"
      showIcon
    />
  );
};
