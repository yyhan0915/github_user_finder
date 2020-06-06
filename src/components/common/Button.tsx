import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import palette from '../../lib/styles/palette';

interface ButtonProps {
  children: any;
  style?: object;
  fullWidth?: boolean;
  cyan?: number;
  to?: string;
  onClick?: () => void;
}

const buttonStyle = css<ButtonProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${buttonStyle}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${buttonStyle}
`;

export const Button: React.FC<ButtonProps> = ({ to, cyan, ...rest }) => {
  return to ? (
    <StyledLink {...rest} to={to} cyan={cyan ? 1 : 0} />
  ) : (
    <StyledButton {...rest} cyan={cyan ? 1 : 0} />
  );
};
