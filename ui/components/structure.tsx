import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons/lib'
import { Alert, Dropdown, Layout, Menu, PageHeader, Select, Space, Spin, Tag } from 'antd'
import { useRouter } from 'next/router'
import React, { CSSProperties, FunctionComponent, useState } from 'react'
import GitHubButton from 'react-github-button'
import { useTranslation } from 'react-i18next'
import { useMeQuery } from '../graphql/query/me.query'
import { languages } from '../i18n'
import { sideMenu, SideMenuElement } from './sidemenu'
import { useWindowSize } from './use.window.size'
import { clearAuth } from './with.auth'
import styled from 'styled-components'
import { Logo } from './ui'

const { SubMenu, ItemGroup } = Menu
const { Content, Sider } = Layout

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

const AdminRoot = styled.div<{ sidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background: var(--omf-bg);
  position: relative;
  transition: var(--omf-transition);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const AdminHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: var(--omf-gradient);
  color: #fff;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);
  position: sticky;
  top: 0;
  z-index: 40;
  flex-shrink: 0;

  @media (min-width: 768px) {
    position: static;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const SidebarToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  transition: var(--omf-transition);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (min-width: 768px) {
    display: none;
  }
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const AdminSider = styled(Sider)<{ $sidebarOpen?: boolean }>`
  background: #fff !important;
  border-right: 1px solid var(--omf-border);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 8px;

    .language-selector {
      padding-left: 12px !important;
      margin-top: auto;
      padding-bottom: 24px;
    }
  }

  .ant-menu {
    background: transparent !important;
    border-right: none !important;
  }

  .ant-menu-item,
  .ant-menu-sub-title {
    border-radius: 12px !important;
    margin: 0 10px 6px !important;
    color: #64748b !important;
    font-weight: 600 !important;
    transition: var(--omf-transition);
  }

  .ant-menu-item-selected,
  .ant-menu-item:hover,
  .ant-menu-sub-title:hover,
  .ant-menu-sub-selected {
    background: #f0f9ff !important;
    color: #8B5CF6 !important;
  }

  .ant-menu-item-selected {
    border-left: 4px solid #8B5CF6 !important;
    box-shadow: inset 0 2px 4px rgba(139, 92, 246, 0.15);
  }

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    z-index: 50;
    transform: translateX(${(props) => (props.$sidebarOpen ? '0' : '-100%')});
    transition: transform 0.25s ease;
    box-shadow: 6px 0 24px rgba(0, 0, 0, 0.12);
  }
`

const SiderSpacer = styled.div`
  flex: 1;
`

const MobileBackdrop = styled.div<{ visible: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: 45;
  backdrop-filter: blur(2px);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  transition: opacity 0.25s ease;

  @media (min-width: 768px) {
    display: none !important;
  }
`

const AdminContent = styled.main<{ padded?: boolean }>`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: var(--omf-bg);

  @media (max-width: 767px) {
    padding: 16px;
  }
`

export const Structure: FunctionComponent<Props> = (props) => {
  const { t, i18n } = useTranslation()
  const size = useWindowSize()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [open, setOpen] = useState<string[]>()
  const [selected, setSelected] = useState<string[]>()
  const router = useRouter()
  const user = useMeQuery()

  React.useEffect(() => {
    if (props.selected) {
      const parts = props.selected.split('.')
      const last = parts.pop()
      if (parts.length > 0) {
        setOpen(parts)
      }
      setSelected([last])
    }
  }, [props.selected])

  const closeSidebar = () => setSidebarOpen(false)

  const buildMenu = (data: SideMenuElement[]): JSX.Element[] => {
    return data
      .filter((element) => {
        if (!element.role) {
          return true
        }
        if (user.loading) {
          return false
        }
        return user.data?.me.roles.includes(element.role)
      })
      .map(
        (element): JSX.Element => {
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
                        color: '#94a3b8',
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
        }
      )
  }

  const signOut = (): void => {
    clearAuth()
    router.reload()
  }

  return (
    <AdminRoot sidebarOpen={sidebarOpen}>
      <MobileBackdrop visible={sidebarOpen} onClick={closeSidebar} />
      <AdminHeader>
        <HeaderLeft>
          <SidebarToggle
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Alternar menu"
          >
            {size.width < 700 ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </SidebarToggle>
          <Brand>
            <Logo width={30} height={30} brandText />
          </Brand>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'profile'} onClick={() => router.push('/admin/profile')}>
                  Perfil
                </Menu.Item>
                <Menu.Divider key={'d1'} />
                <Menu.Item key={'logout'} onClick={signOut}>
                  Sair
                </Menu.Item>
              </Menu>
            }
            onVisibleChange={setUserMenu}
            visible={userMenu}
          >
            <Space style={{ alignItems: 'center', gap: 8, color: '#fff' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                Olá{' '}
                {user.data && user.data.me.username ? user.data.me.username : 'usuário'}
              </div>
              <UserOutlined style={{ fontSize: 22 }} />
              <CaretDownOutlined style={{ color: '#fff', opacity: 0.9 }} />
            </Space>
          </Dropdown>
        </HeaderRight>
      </AdminHeader>

      <AdminSider
        collapsed={false}
        trigger={null}
        collapsedWidth={0}
        breakpoint={'xs'}
        width={240}
        className={'sidemenu'}
      >
        <Menu
          mode="inline"
          style={{ flex: 1 }}
          defaultSelectedKeys={['1']}
          selectedKeys={selected}
          onSelect={(s): void => setSelected(s.keyPath)}
          openKeys={open}
          onOpenChange={(open): void => setOpen(open)}
        >
          {buildMenu(sideMenu)}
        </Menu>
        <Menu mode="inline" selectable={false}>
          <Menu.Item className={'language-selector'} key={'language-selector'}>
            <Select
              bordered={false}
              value={i18n.language.replace(/-.*/, '')}
              onChange={(next) => i18n.changeLanguage(next)}
              style={{ width: '100%' }}
            >
              {languages.map((language) => (
                <Select.Option value={language} key={language}>
                  {t(`language:${language}`)}
                </Select.Option>
              ))}
            </Select>
          </Menu.Item>
          <Menu.Item style={{ display: 'flex', alignItems: 'center', gap: 10 }} key={'github'}>
            <GitHubButton type="stargazers" namespace="ohmyform" repo="ohmyform" />
          </Menu.Item>
          <Menu.Item key={'version'}>
            Versão: <Tag color="purple">{process.env.version}</Tag>
          </Menu.Item>
        </Menu>
        <SiderSpacer />
      </AdminSider>

      <AdminContent padded={props.padded !== false}>
        {props.title && (
          <PageHeader
            title={props.title}
            subTitle={props.subTitle}
            extra={props.extra}
            breadcrumb={{
              routes: [
                ...(props.breadcrumbs || []).map((b) => ({
                  breadcrumbName: b.name,
                  path: '',
                })),
                { breadcrumbName: props.title, path: '' },
              ],
              params: props.breadcrumbs,
              itemRender(route, params: BreadcrumbEntry[], routes) {
                if (routes.indexOf(route) === routes.length - 1) {
                  return <span>{route.breadcrumbName}</span>
                }
                const entry = params[routes.indexOf(route)]
                return (
                  <a href={entry.href}>
                    {entry.name}
                  </a>
                )
              },
            }}
          />
        )}
        {props.error && (
          <Alert message={props.error} type={'error'} style={{ marginBottom: 24 }} />
        )}
        <Spin spinning={!!props.loading}>
          <Content
            style={{
              background: props.padded ? '#fff' : null,
              padding: props.padded ? 24 : 0,
              borderRadius: props.padded ? 16 : 0,
              ...props.style,
            }}
          >
            {props.children}
          </Content>
        </Spin>
      </AdminContent>
    </AdminRoot>
  )
}

Structure.defaultProps = {
  padded: true,
  style: {},
}

export default Structure
