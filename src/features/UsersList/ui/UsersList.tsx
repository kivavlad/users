import React, { useCallback } from "react";
import { Card, List, Button } from "antd";
import { UserItem } from "@entities/UserItem";
import { ErrorComponent } from "@shared/ui/ErrorComponent";
import { useModals } from "@shared/hooks/useModals";
import { useGetUsers } from "../model";
import { UserListStyled } from './UsersList.styled';

export const UsersList: React.FC = () => {
  const { openModal } = useModals();
  const { data = [], isLoading, isFetching, isError, error } = useGetUsers();

  const handleCreate = useCallback(() => {
    openModal('createUser');
  }, [openModal]);

  if (isError) {
    return (
      <UserListStyled>
        <ErrorComponent 
          message="Ошибка получения данных"
          error={error}
        />
      </UserListStyled>
    );
  };
  
  return (
    <UserListStyled>
      <Card loading={isLoading || isFetching}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          pagination={{
            pageSize: 6
          }}
          renderItem={(item) => (
            <UserItem item={item} />
          )}
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
