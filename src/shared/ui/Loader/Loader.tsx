import React from "react";
import { Spin } from "antd";
import { LoaderStyled } from './Loader.styled';

interface IProps {
  height?: string | number;
  size?: "small" | "default" | "large";
}

export const Loader: React.FC<IProps> = ({
  height = '100vh',
  size = 'default'
}) => (
  <LoaderStyled height={height}>
    <Spin spinning size={size} />
  </LoaderStyled>
);
