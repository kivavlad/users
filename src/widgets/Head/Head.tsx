import React, { useCallback } from "react";
import { Layout, Button } from "antd";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { TOKEN_KEY } from "@shared/constants/auth";
import { HeadStyled } from './Head.styled';

export const Head: React.FC = () => {
  const { remove } = useLocalStorage();

  const handleLogout = useCallback(() => {
    remove(TOKEN_KEY);
  }, [remove, TOKEN_KEY]);

  return (
    <Layout.Header>
      <HeadStyled>
        <Button type="primary" onClick={handleLogout}>
          Выход
        </Button>
      </HeadStyled>
    </Layout.Header>
  );
};
