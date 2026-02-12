import React from "react";
import { List, Avatar } from "antd";
import type { IUser } from "@shared/types/user.types";
import { generateAvatar } from "../lib/generateAvatar";
import { formatDate } from "../lib/formatDate";
import { AvatarStyled, NameStyled } from "./UserItem.styled";

interface IProps {
  item: IUser;
  index: number;
}

export const UserItem: React.FC<IProps> = ({ item, index }) => {
  const handleClick = () => {
    console.log(item.id);
  };

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <AvatarStyled onClick={handleClick}>
            <Avatar src={item.avatar || generateAvatar(index)} />
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
