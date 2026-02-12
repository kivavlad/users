import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const LoaderStyled = styled.div<{ height: string | number }>`
  ${({ height }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${typeof height === 'number' ? `${height}px` : height};
  `}
`;
