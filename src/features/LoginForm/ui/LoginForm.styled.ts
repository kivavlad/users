import styled from '@emotion/styled';
import { Button } from 'antd';

export const LoginFormStyled = styled.div`
  max-width: 500px;
  width: 100%;
`;

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SubmitButton = styled(Button)`
  max-width: 80px;
  width: 100%;
  float: right;
`;
