import React from 'react';

import { Card, List, Button } from 'antd';

import { UserItem } from '@entities/UserItem';
import { useModals } from '@shared/hooks/useModals';

import { useGetUsers } from '../model';

import { UserListStyled } from './UsersList.styled';

export const UsersList: React.FC = () => {
  const { data = [], isLoading, isFetching } = useGetUsers();
  const { openModal } = useModals();
  const loading = isLoading || isFetching;

  const handleCreate = () => {
    openModal('createUser');
  };

  return (
    <UserListStyled>
      <Card loading={loading}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          pagination={{
            pageSize: 6,
          }}
          renderItem={(item) => <UserItem item={item} />}
          footer={
            <Button type="primary" onClick={handleCreate}>
              Создать пользователя
            </Button>
          }
        />
      </Card>
    </UserListStyled>
  );
};
