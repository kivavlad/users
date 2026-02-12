import React from "react";
import { Card, List, Button } from "antd";
import { UserItem } from "@entities/UserItem";
import { ErrorComponent } from "@shared/ui/ErrorComponent";
import { useGetUsers } from "../model";
import { UserListStyled } from './UsersList.styled';

export const UsersList: React.FC = () => {
  const { data = [], isLoading, isFetching, isError, error } = useGetUsers();

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
          renderItem={(item, index) => (
            <UserItem item={item} index={index} />
          )}
          footer={
            <Button type="primary">
              Создать пользователя
            </Button>
          }
        />
      </Card>
    </UserListStyled>
  );
};
