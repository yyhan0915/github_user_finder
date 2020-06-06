import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { StyledComponent } from 'styled-components';

import { Button } from '../';

import Responsive, { ResponsiveProps } from './Responsive';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper: StyledComponent<React.FC<ResponsiveProps>, any> = styled(
  Responsive,
)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

interface HeaderProps {
  // 나중에 채울 것
}
export const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            GITHUB USER FINDER
          </Link>
          <div className="right">
            <Button cyan={1}>UserSample</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};
