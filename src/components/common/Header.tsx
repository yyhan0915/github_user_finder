import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { StyledComponent } from 'styled-components';

import { Button } from '../';

import Responsive, { ResponsiveProps } from './Responsive';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: #ddd;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper: StyledComponent<React.FC<ResponsiveProps>, any> = styled(
    Responsive
)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 1000;
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
    back?: number;
}
export const Header: React.FC<HeaderProps> = ({ back }) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className="logo">
                        <h2>GITHUB USER FINDER</h2>
                    </Link>
                    <div className="right">
                        {back === 1 ? (
                            <Button cyan={1} to="/">
                                Back to home
                            </Button>
                        ) : (
                            <Button cyan={0}>
                                <a href="http://github.com">Go to GITHUB</a>
                            </Button>
                        )}
                    </div>
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};
