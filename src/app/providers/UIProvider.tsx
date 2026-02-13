import React from 'react';

import { Global } from '@emotion/react';

import { normalizeStyled } from '@shared/styles/normalize.styled';
import { resetStyled } from '@shared/styles/reset.styled';

interface IProps {
  children: React.ReactNode;
}

export const UIProvider = ({ children }: IProps) => (
  <>
    <Global styles={[resetStyled, normalizeStyled]} />
    {children}
  </>
);
