import React from "react";

interface IProps {
  children?: React.ReactNode;
}

export const RequireAuth: React.FC = ({ children }: IProps) => { 

  return <>{children}</>;
};