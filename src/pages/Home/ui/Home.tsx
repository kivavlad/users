import React from 'react';

import { UsersList } from '@features/UsersList';
import { Head } from '@widgets/Head';

import { HomeStyled } from './Home.styled';

export const HomePage: React.FC = () => (
  <HomeStyled>
    <Head />
    <UsersList />
  </HomeStyled>
);
