import React from 'react';
import { Head } from '@widgets/Head';
import { UsersList } from '@features/UsersList';
import { HomeStyled } from './Home.styled';

export const HomePage: React.FC = () => (
  <HomeStyled>
    <Head />
    <UsersList />
  </HomeStyled>
);
