import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { LayoutHeader } from '@paljs/ui/Layout';
import { Actions } from '@paljs/ui/Actions';
import { breakpointDown } from '@paljs/ui/breakpoints';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

interface HeaderProps {
  toggleSidebar: () => void;
  changeDir: () => void;
  dir: 'rtl' | 'ltr';
  title?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Small"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <a className="logo">{props.title || 'АСОП: маршрутні таксі'}</a>
                </Link>
              ),
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
