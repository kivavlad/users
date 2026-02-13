import React from 'react';

import { UsersList } from '@features/UsersList';

import { HomeStyled } from './Home.styled';

export const HomePage: React.FC = () => (
  <HomeStyled>
    <UsersList />
  </HomeStyled>
);
