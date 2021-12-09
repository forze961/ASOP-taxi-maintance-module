import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import { Layout, LayoutContent, LayoutContainer, LayoutColumns, LayoutColumn } from '@paljs/ui/Layout';
import icons from '@paljs/icons';
import { SidebarBody, SidebarRefObject, Sidebar } from '@paljs/ui/Sidebar';
import Header from './Header';
import SimpleLayout from './SimpleLayout';
import { useRouter } from 'next/router';
import User from '@paljs/ui/User';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import Link from 'next/link';
import menuItems from './menuItem';
import SEO from 'components/SEO';
import { EvaIcon } from '@paljs/ui/Icon';
import Select from '@paljs/ui/Select';

const getDefaultTheme = (): DefaultTheme['name'] => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as DefaultTheme['name'];
  } else {
    const hours = new Date().getHours();
    return hours > 6 && hours < 19 ? 'default' : 'dark';
  }
};

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
  titleNow?: string;
}

SEO.defaultProps = {
  description: 'Free admin dashboard template based on Next.Js with @paljs/ui component package',
  keywords: [
    'admin-dashboard',
    'admin',
    'react',
    'reactjs',
    'dashboard',
    'dashboard-templates',
    'themes',
    'styled-components',
    'styledcomponents',
    'admin-template',
    'free-admin-template',
    'react-admin-dashboard',
    'react-admin-panel',
    'react-admin-component',
    'nextjs',
    'react-forms',
    'react-select',
    'react-accordion',
    'react-chat',
    'react-admin-template',
  ],
};

const LayoutPage: React.FC<SEOProps> = ({ children, titleNow }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('default');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const sidebarRef = useRef<SidebarRefObject>(null);
  const router = useRouter();
  //const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<MenuRefObject>(null);
  const [seeHeader, setSeeHeader] = useState(true);

  const getState = (state?: 'hidden' | 'visible' | 'compacted' | 'expanded') => {
    setSeeHeader(state !== 'compacted');
  };

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
    typeof localStorage !== 'undefined' && localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const localTheme = getDefaultTheme();
    if (localTheme !== theme && theme === 'default') {
      setTheme(localTheme);
    }
  }, []);

  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  const authLayout = router.pathname.startsWith('/auth');

  const Label = styled.span`
    display: flex;
    align-items: center;
  `;

  const SelectStyled = styled(Select)`
    min-width: 150px;
    padding-top: 25px;
  `;

  const themeOptions = () => [
    {
      value: 'default',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
          Світла тема
        </Label>
      ),
    },
    {
      value: 'dark',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#192038' }} />
          Темна тема
        </Label>
      ),
    },
  ];

  return (
    <Fragment>
      <ThemeProvider theme={themes(theme, dir)}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir={dir} className={!authLayout ? 'auth-layout' : ''}>
            {!authLayout && (
              <Header
                dir={dir}
                changeDir={changeDir}
                toggleSidebar={() => sidebarRef.current?.toggle()}
                title={titleNow}
              />
            )}
            <LayoutContainer>
              {!authLayout && (
                <Sidebar
                  getState={getState}
                  ref={sidebarRef}
                  property="start"
                  containerFixed
                  responsive
                  className="menu-sidebar"
                >
                  {seeHeader && (
                    <header>
                      <User image="url('/icons/face.png')" name="Іванов Іван" title="Водій" size="Medium" />
                    </header>
                  )}
                  <SidebarBody>
                    <Menu
                      nextJs
                      className="sidebar-menu"
                      Link={Link}
                      ref={menuRef}
                      items={menuItems}
                      currentPath={router.pathname}
                      toggleSidebar={() => sidebarRef.current?.hide()}
                    />
                    <SelectStyled
                      instanceId="react-select-input"
                      isSearchable={false}
                      shape="SemiRound"
                      placeholder="Themes"
                      value={themeOptions().find((item) => item.value === theme)}
                      options={themeOptions()}
                      onChange={({ value }: { value: DefaultTheme['name'] }) => changeTheme(value)}
                    />
                  </SidebarBody>
                </Sidebar>
              )}
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn className="main-content">{children}</LayoutColumn>
                </LayoutColumns>
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutPage;
