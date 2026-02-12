import React from 'react';

import { Global } from '@emotion/react';

import { resetStyled } from '@app/styled/reset.styled';

interface IProps {
  children: React.ReactNode;
}

export const UIProvider = ({ children }: IProps) => (
  <>
    <Global styles={resetStyled} />
    {children}
  </>
);
