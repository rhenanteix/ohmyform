import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ThunderboltOutlined,
  CloudOutlined,
} from '@ant-design/icons'
import { Dropdown, Menu, Space, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { CSSProperties, FunctionComponent, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMeQuery } from '../../graphql/query/me.query'
import { languages } from '../../i18n'
import { sideMenu, SideMenuElement } from '../sidemenu'
import { clearAuth } from '../with.auth'
import { useWindowSize } from '../use.window.size'
import styled, { css } from 'styled-components'
import { Logo } from '../ui'
import { useTheme } from '../../src/design/ThemeProvider'
import {
  AdminRoot,
  AdminHeader,
  HeaderLeft,
  HeaderRight,
  SidebarToggle,
  Brand,
  AdminSider,
  MobileBackdrop,
  AdminContent,
  PageWrapper,
  AdminPageHeaderTitle,
  AdminPageHeaderSubtitle,
} from './ui'

const { SubMenu, ItemGroup } = Menu

interface BreadcrumbEntry {
  name: string
  href?: string
  as?: string
}

interface Props {
  loading?: boolean
  padded?: boolean
  style?: CSSProperties
  selected?: string
  breadcrumbs?: BreadcrumbEntry[]
  title?: string
  subTitle?: string
  extra?: JSX.Element[]
  error?: string
}

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const UserMenuTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  border-radius: var(--omf-radius-full);
  background: var(--omf-color-surface-secondary);
  border: 1px solid var(--omf-color-border);
  transition: var(--omf-transition);
  cursor: pointer;

  &:hover {
    background: var(--omf-color-border-muted);
    border-color: var(--omf-color-border-strong);
  }

  @media (max-width: 639px) {
    padding: 6px;
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 160px;
  min-width: 0;

  @media (max-width: 639px) {
    display: none;
  }
`

const UserName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--omf-color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserRole = styled.div`
  font-size: 11px;
  color: var(--omf-color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const UserAvatar = styled.div<{ $src?: string; $name?: string }>`
  width: 36px;
  height: 36px;
  border-radius: var(--omf-radius-full);
  background: ${({ $src }) => ($src ? 'transparent' : 'var(--omf-color-primary-100)')};
  color: ${({ $src }) => ($src ? 'transparent' : 'var(--omf-color-primary-700)')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--omf-color-surface);

  ${({ $src }) =>
    $src &&
    css`
      background-image: url(${$src});
      background-size: cover;
      background-position: center;
    `}

  ${({ $name, $src }) =>
    !$src &&
    $name &&
    css`
      &::before {
        content: '${$name.trim().charAt(0).toUpperCase()}';
      }
    `}
`

const DropdownMenu = styled(Menu)`
  .ant-dropdown-menu {
    border-radius: var(--omf-radius-lg);
    border: 1px solid var(--omf-color-border);
    box-shadow: var(--omf-shadow-lg);
    padding: 8px;
  }

  .ant-dropdown-menu-item {
    border-radius: var(--omf-radius-md);
    padding: 10px 14px;
    font-size: 14px;
    font-weight: 500;
    color: var(--omf-color-text-primary);
    transition: var(--omf-transition-fast);

    &:hover {
      background: var(--omf-color-primary-50);
      color: var(--omf-color-primary-700);
    }
  }

  .ant-dropdown-menu-divider {
    margin: 8px 0;
    border-color: var(--omf-color-border-muted);
  }
`

const LanguageSelector = styled.div`
  display: block;
  padding: 16px;

  @media (max-width: 767px) {
    display: block;
    padding: 0 16px 16px;
    margin-top: auto;
  }
`

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--omf-radius-md);
  background: var(--omf-color-surface-secondary);
  color: var(--omf-color-text-secondary);
  cursor: pointer;
  transition: var(--omf-transition);

  &:hover {
    background: var(--omf-color-border-muted);
    color: var(--omf-color-text-primary);
  }
`

const VersionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--omf-radius-md);
  background: var(--omf-color-surface-secondary);
  border: 1px solid var(--omf-color-border);
  font-size: 11px;
  font-weight: 600;
  color: var(--omf-color-text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 16px;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    display: none;
  }
`

const GitHubStar = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--omf-radius-md);
  background: var(--omf-color-surface-secondary);
  border: 1px solid var(--omf-color-border);
  color: var(--omf-color-text-secondary);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: var(--omf-transition);
  margin-top: 8px;

  &:hover {
    background: var(--omf-color-primary-50);
    border-color: var(--omf-color-primary-300);
    color: var(--omf-color-primary-700);
  }

  @media (max-width: 767px) {
    display: none;
  }
`

export const AdminStructure: FunctionComponent<Props> = (props) => {
  const { t, i18n } = useTranslation()
  const size = useWindowSize()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const router = useRouter()
  const user = useMeQuery()

  useEffect(() => {
    if (props.selected) {
      const parts = props.selected.split('.')
      const last = parts.pop()
      if (parts.length > 0) {
        setOpen(parts)
      }
      setSelected([last === 'dashboard' ? 'home' : last || ''])
    }
  }, [props.selected])

  useEffect(() => {
    if (!sidebarOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [sidebarOpen])

  const closeSidebar = () => setSidebarOpen(false)

  const handleSignOut = async () => {
    clearAuth()
    router.reload()
  }

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const buildMenu = (data: SideMenuElement[]): JSX.Element[] => {
    return data
      .filter((element) => {
        if (!element.role) return true
        if (user.loading) return false
        return user.data?.me.roles.includes(element.role)
      })
      .map((element): JSX.Element => {
        if (element.items && element.items.length > 0) {
          if (element.group) {
            return (
              <ItemGroup
                key={element.key}
                title={
                  <Space
                    style={{
                      textTransform: 'uppercase',
                      paddingTop: 16,
                      fontWeight: 'bold',
                      color: 'var(--omf-color-text-muted)',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {element.icon}
                    <div>{t(element.name)}</div>
                  </Space>
                }
              >
                {buildMenu(element.items)}
              </ItemGroup>
            )
          }
          return (
            <SubMenu
              key={element.key}
              title={
                <Space style={{ gap: 8 }}>
                  {element.icon}
                  <div>{t(element.name)}</div>
                </Space>
              }
            >
              {buildMenu(element.items)}
            </SubMenu>
          )
        }
        return (
          <Menu.Item
            onClick={async () => {
              closeSidebar()
              if (element.href) {
                await router.push(element.href)
              }
            }}
            key={element.key}
          >
            <Space style={{ gap: 10 }}>
              {element.icon}
              <div>{t(element.name)}</div>
            </Space>
          </Menu.Item>
        )
      })
  }

  const userName = user.data?.me.username || 'Usuário'
  const userRole = user.data?.me.roles?.[0] || 'admin'

  return (
    <>
      <AdminRoot sidebarOpen={sidebarOpen} className="admin">
        <MobileBackdrop visible={sidebarOpen} onClick={closeSidebar} />
        <AdminHeader>
          <HeaderLeft>
            <SidebarToggle
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={t('admin:toggleMenu')}
              aria-expanded={sidebarOpen}
            >
              {size.width < 768 ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </SidebarToggle>
            <Brand>
              <Logo width={36} height={36} brandText />
            </Brand>
          </HeaderLeft>

          <HeaderRight>
            <HeaderActions>
              <ThemeToggle onClick={toggleTheme} aria-label={t('admin:toggleTheme')}>
                {theme === 'light' ? <CloudOutlined /> : <ThunderboltOutlined />}
              </ThemeToggle>

              <Dropdown
                overlay={
                  <DropdownMenu>
                    <Menu.Item
                      key="profile"
                      onClick={() => {
                        router.push('/admin/profile')
                        closeSidebar()
                      }}
                    >
                      {t('admin:profile')}
                    </Menu.Item>
                    <Menu.Item
                      key="settings"
                      onClick={() => {
                        router.push('/admin/profile')
                        closeSidebar()
                      }}
                    >
                      {t('admin:settings')}
                    </Menu.Item>
                    <Menu.Divider key="d1" />
                    <Menu.Item key="logout" onClick={handleSignOut} danger>
                      {t('admin:logout')}
                    </Menu.Item>
                  </DropdownMenu>
                }
                trigger={['click']}
              >
                <UserMenuTrigger type="button" aria-label="Abrir menu da conta">
                  <UserInfo>
                    <UserName>{userName}</UserName>
                    <UserRole>{t(`admin:role.${userRole.toLowerCase()}`)}</UserRole>
                  </UserInfo>
                  <UserAvatar $name={userName} />
                </UserMenuTrigger>
              </Dropdown>
            </HeaderActions>
          </HeaderRight>
        </AdminHeader>

        <AdminSider
          $sidebarOpen={sidebarOpen}
          collapsed={false}
          trigger={null}
          collapsedWidth={0}
          breakpoint={'xs'}
          width={280}
          className={'sidemenu'}
        >
          <div
            style={{
              padding: '24px 24px 16px',
              fontSize: 10,
              letterSpacing: '1.6px',
              color: 'var(--omf-color-text-muted)',
              fontWeight: 600,
            }}
          >
            WORKSPACE
          </div>
          <Menu
            mode="inline"
            style={{ flex: 1 }}
            defaultSelectedKeys={['dashboard']}
            selectedKeys={selected}
            onSelect={(s): void => setSelected(s.keyPath)}
            openKeys={open}
            onOpenChange={(open): void => setOpen(open)}
          >
            {buildMenu(sideMenu)}
          </Menu>

          <LanguageSelector>
            <select
              aria-label="Idioma da interface"
              value={
                i18n.language.startsWith('pt')
                  ? i18n.language.includes('PT')
                    ? 'pt_PT'
                    : 'pt_BR'
                  : i18n.language.replace(/-.*/, '')
              }
              onChange={(e) => handleLanguageChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--omf-radius-md)',
                border: '1px solid var(--omf-color-border)',
                background: 'var(--omf-color-surface)',
                color: 'var(--omf-color-text-primary)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {t(`language:${language}`)}
                </option>
              ))}
            </select>
          </LanguageSelector>

          <div
            style={{
              padding: '0 16px 16px',
              marginTop: 'auto',
              borderTop: '1px solid var(--omf-color-border-muted)',
              paddingTop: '16px',
            }}
          >
            <GitHubStar
              href="https://github.com/ohmyform/ohmyform"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⭐ Star no GitHub
            </GitHubStar>
            <VersionBadge>v{process.env.VERSION || process.env.version || '1.0.0'}</VersionBadge>
          </div>
        </AdminSider>

        <AdminContent padded={props.padded !== false}>
          <PageWrapper>
            {props.title && (
              <div style={{ marginBottom: 24 }}>
                <AdminPageHeaderTitle>{props.title}</AdminPageHeaderTitle>
                {props.subTitle && (
                  <AdminPageHeaderSubtitle>{props.subTitle}</AdminPageHeaderSubtitle>
                )}
              </div>
            )}
            {props.breadcrumbs && props.breadcrumbs.length > 0 && (
              <nav style={{ marginBottom: 24 }} aria-label="Breadcrumb">
                <Space style={{ fontSize: 13, color: 'var(--omf-color-text-muted)' }}>
                  {props.breadcrumbs.map((b, i) => (
                    <React.Fragment key={b.href || i}>
                      {i > 0 && <span style={{ color: 'var(--omf-color-text-muted)' }}>/</span>}
                      {b.href ? (
                        <a
                          href={b.href}
                          style={{ color: 'var(--omf-color-primary-600)', fontWeight: 500 }}
                        >
                          {b.name}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--omf-color-text-primary)', fontWeight: 600 }}>
                          {b.name}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </Space>
              </nav>
            )}
            {props.error && (
              <div
                style={{
                  marginBottom: 24,
                  padding: '16px 20px',
                  borderRadius: 'var(--omf-radius-lg)',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#991b1b',
                }}
              >
                {props.error}
              </div>
            )}
            <div
              style={{
                background: props.padded ? 'var(--omf-color-surface)' : 'transparent',
                padding: props.padded ? 24 : 0,
                borderRadius: props.padded ? 'var(--omf-radius-xl)' : 0,
                ...props.style,
              }}
            >
              {props.extra && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                  {props.extra}
                </div>
              )}
              <Spin spinning={!!props.loading}>{props.children}</Spin>
            </div>
          </PageWrapper>
        </AdminContent>
      </AdminRoot>
    </>
  )
}

AdminStructure.defaultProps = {
  padded: true,
  style: {},
}

export default AdminStructure
