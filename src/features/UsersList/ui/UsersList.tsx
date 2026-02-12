import React, { useCallback, useEffect } from 'react';

import { Card, List, Button, notification } from 'antd';

import { UserItem } from '@entities/UserItem';
import { useModals } from '@shared/hooks/useModals';

import { useGetUsers } from '../model';

import { UserListStyled } from './UsersList.styled';

export const UsersList: React.FC = () => {
  const { data = [], isLoading, isFetching, isError } = useGetUsers();
  const { openModal } = useModals();
  const loading = isLoading || isFetching;

  const handleCreate = useCallback(() => {
    openModal('createUser');
  }, [openModal]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: 'Не удалось получить пользователей',
        placement: 'bottomRight',
      });
    }
  }, [isError]);

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
