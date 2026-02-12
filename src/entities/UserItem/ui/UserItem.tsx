import React, { useCallback } from "react";
import { List, Avatar } from "antd";
import type { IUser } from "@shared/types/user.types";
import { useModals } from "@shared/hooks/useModals";
import { formatDate } from "../lib/formatDate";
import { AvatarStyled, NameStyled } from "./UserItem.styled";

interface IProps {
  item: IUser;
}

export const UserItem: React.FC<IProps> = ({ item }) => {
  const { openModal } = useModals();

  const handleClick = useCallback(() => {
    openModal('editUser', { id: item.id });
  }, [openModal, item.id]);

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <AvatarStyled onClick={handleClick}>
            <Avatar src={item.avatar} />
          </AvatarStyled>
        }
        title={
          <NameStyled onClick={handleClick}>
            {item.name}
          </NameStyled>}
        description={`Зарегистрирован ${formatDate(item.createdAt)}`}
      />
    </List.Item>
  );
};
