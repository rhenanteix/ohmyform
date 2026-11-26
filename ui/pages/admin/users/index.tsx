import { DeleteOutlined, EditOutlined, UserOutlined, MailOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { AdminStructure } from 'components/admin/structure';
import { withAuth } from 'components/with.auth';
import { NextPage } from 'next';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from '../../../components/use.window.size';
import { UserPagerFragment } from '../../../graphql/fragment/user.pager.fragment';
import { useUserDeleteMutation } from '../../../graphql/mutation/user.delete.mutation';
import { useUserPagerQuery } from '../../../graphql/query/user.pager.query';
import styled from 'styled-components';
import {
  Button,
  Input,
  Select,
  Badge,
  Table,
  ToastProvider,
  useToast,
} from 'src/components/primitives';

const UserContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const HeaderIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--omf-radius-lg);
  background: linear-gradient(135deg, var(--omf-color-primary-600) 0%, var(--omf-color-primary-700) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
`;

const HeaderTitleText = styled.div`
  h2 {
    margin: 0 0 4px;
    font-size: 24px;
    font-weight: 800;
    color: var(--omf-color-text-primary);
    letter-spacing: -0.02em;
  }
  span {
    font-size: 14px;
    color: var(--omf-color-text-muted);
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const TableWrapper = styled.div`
  border-radius: var(--omf-radius-xl);
  border: 1px solid var(--omf-color-border);
  background: var(--omf-color-surface);
  overflow: hidden;
`;

const TableToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--omf-color-border-muted);
  flex-wrap: wrap;

  @media (max-width: 639px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--omf-color-text-muted);
  font-size: 16px;
  pointer-events: none;
  z-index: 1;
`;

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
  color: var(--omf-color-text-secondary);
`;

const EmailCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmailIcon = styled(MailOutlined)`
  color: var(--omf-color-text-muted);
  font-size: 14px;
`;

const EmailText = styled.span`
  font-weight: 500;
  color: var(--omf-color-text-primary);
  font-size: 14px;
`;

const UserAvatarCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: var(--omf-color-text-primary);
  font-size: 14px;
`;

const UserId = styled.span`
  font-size: 11px;
  color: var(--omf-color-text-muted);
  font-family: var(--omf-font-mono);
`;

const ViewButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--omf-radius-md);
  background: var(--omf-color-surface-secondary);
  color: var(--omf-color-text-secondary);
  text-decoration: none;
  transition: var(--omf-transition);

  &:hover {
    background: var(--omf-color-primary-50);
    color: var(--omf-color-primary-700);
  }
`;

const TableContainer = styled.div`
  max-height: 70vh;
  overflow: auto;
`;

const UsersPage: NextPage = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<{
    pageSize: number;
    current: number;
    total: number;
  }>({
    pageSize: 25,
    current: 1,
    total: 0,
  });
  const [entries, setEntries] = useState<UserPagerFragment[]>();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'superuser'>('all');
  const { loading /*, refetch, error */ } = useUserPagerQuery({
    variables: {
      limit: pagination.pageSize,
      start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0,
    },
    onCompleted: ({ pager }) => {
      setPagination({
        ...pagination,
        total: pager.total,
      });
      setEntries(pager.entries);
    },
  });
  const [executeDelete] = useUserDeleteMutation();
  const { addToast } = useToast();

  const filteredEntries = useMemo(() => {
    if (!entries) return [];
    return entries.filter((entry) => {
      const matchesSearch = !searchQuery ||
        entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || entry.roles.includes(roleFilter);
      return matchesSearch && matchesRole;
    });
  }, [
    entries, searchQuery, roleFilter,
  ]);

  const deleteUser = async (id: string) => {
    try {
      await executeDelete({
        variables: { id },
      });
      const next = entries?.filter((entry) => entry.id !== id) || [];
      if (next.length === 0 && pagination.current > 1) {
        setPagination({ ...pagination, current: pagination.current - 1 });
      } else {
        setEntries(next);
      }
      addToast({ type: 'success', title: t('user:deleted') });
    } catch (e) {
      addToast({ type: 'error', title: t('user:deleteError') });
    }
  };

  const columns = useMemo(() => [
    {
      key: 'username',
      header: t('user:row.user'),
      accessor: (row: UserPagerFragment) => (
        <UserAvatarCell>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--omf-color-slate-100)',
              color: 'var(--omf-color-slate-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {row.username.trim().charAt(0).toUpperCase()}
          </div>
          <div>
            <UserName>{row.username}</UserName>
            <UserId>#{row.id.slice(0, 8)}</UserId>
          </div>
        </UserAvatarCell>
      ),
    },
    {
      key: 'roles',
      header: t('user:row.roles'),
      width: '160px',
      accessor: (row: UserPagerFragment) => (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {row.roles.map((role) => (
            <Badge
              key={role}
              variant="primary"
              size="sm"
            >
              {t(`admin:role.${role.toLowerCase()}`)}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'email',
      header: t('user:row.email'),
      width: '280px',
      accessor: (row: UserPagerFragment) => (
        <EmailCell>
          <EmailIcon />
          <EmailText>{row.email}</EmailText>
          {row.verifiedEmail && (
            <Badge variant="success" size="sm">
              {t('user:verified')}
            </Badge>
          )}
        </EmailCell>
      ),
    },
    {
      key: 'created',
      header: t('user:row.created'),
      width: '180px',
      accessor: (row: UserPagerFragment) =>
        new Date(row.created).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      key: 'actions',
      header: t('user:row.actions'),
      width: '140px',
      align: 'center' as const,
      accessor: (row: UserPagerFragment) => (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexDirection: width < 600 ? 'column' : 'row',
            justifyContent: 'center',
          }}
        >
          <ViewButton
            href={`/admin/users/${row.id}`}
            data-tooltip={t('user:view')}
          >
            <UserOutlined />
          </ViewButton>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<EditOutlined />}
            onClick={() => window.location.href = `/admin/users/${row.id}`}
            data-tooltip={t('user:edit')}
          />
          <Button
            variant="danger"
            size="sm"
            leftIcon={<DeleteOutlined />}
            onClick={() => {
              if (window.confirm(t('user:confirmDelete'))) {
                void deleteUser(row.id);
              }
            }}
            data-tooltip={t('user:delete')}
          />
        </div>
      ),
    },
  ], [
    t, width, entries, pagination.current, deleteUser,
  ]);

  return (
    <ToastProvider>
      <AdminStructure
        title={t('admin:users')}
        subTitle={t('admin:usersSubtitle')}
        selected="users"
        breadcrumbs={[
          { name: t('admin:home'), href: '/admin' },
          { name: t('admin:users') },
        ]}
      >
        <UserContainer>
          <HeaderBar>
            <HeaderTitle>
              <HeaderIconWrapper>
                <UserAddOutlined />
              </HeaderIconWrapper>
              <HeaderTitleText>
                <h2>{t('admin:users')}</h2>
                <span>{t('admin:usersSubtitle')}</span>
              </HeaderTitleText>
            </HeaderTitle>
            <ActionsGroup>
              <Button variant="primary" leftIcon={<UserAddOutlined />} onClick={() => window.location.href = '/admin/users/create'}>
                {t('user:new')}
              </Button>
            </ActionsGroup>
          </HeaderBar>

          <TableWrapper>
            <TableToolbar>
              <ToolbarLeft>
                <SearchWrapper>
                  <SearchIcon><SearchOutlined /></SearchIcon>
                  <Input
                    placeholder={t('admin:searchUsers')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<SearchOutlined />}
                    fullWidth={false}
                    style={{ width: 280 }}
                  />
                </SearchWrapper>
                <Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'superuser')}
                  fullWidth={false}
                  style={{ width: 160, minWidth: 140 }}
                  placeholder={t('admin:allRoles')}
                  options={[
                    { value: 'all', label: t('admin:allRoles') },
                    { value: 'admin', label: t('admin:role.admin') },
                    { value: 'superuser', label: t('admin:role.superuser') },
                  ]}
                />
              </ToolbarLeft>
              <ToolbarRight>
                <span style={{ fontSize: 13, color: 'var(--omf-color-text-muted)' }}>
                  {t('admin:showing', { count: filteredEntries.length, total: pagination.total || 0 })}
                </span>
              </ToolbarRight>
            </TableToolbar>

            {loading ? (
              <TableContainer>
                <Table
                  columns={columns}
                  data={Array(5).fill(null).map((_, i) => ({ id: `skeleton-${i}` }))}
                  keyAccessor="id"
                  loading={true}
                  compact
                />
              </TableContainer>
            ) : filteredEntries.length === 0 ? (
              <EmptyStateWrapper>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'var(--omf-color-primary-50)',
                    color: 'var(--omf-color-primary-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    marginBottom: 16,
                  }}
                >
                  <UserOutlined />
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: 'var(--omf-color-text-primary)' }}>
                  {searchQuery ? t('admin:noResults') : t('admin:noUsers')}
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--omf-color-text-muted)', maxWidth: 320 }}>
                  {searchQuery ? t('admin:noResultsDesc') : t('admin:noUsersDesc')}
                </p>
                {!searchQuery && (
                  <Button variant="primary" leftIcon={<UserAddOutlined />} onClick={() => window.location.href = '/admin/users/create'}>
                    {t('user:createFirst')}
                  </Button>
                )}
              </EmptyStateWrapper>
            ) : (
              <>
                <TableContainer>
                  <Table
                    columns={columns}
                    data={filteredEntries}
                    keyAccessor="id"
                    compact
                  />
                </TableContainer>
                {pagination.total && pagination.total > pagination.pageSize && (
                  <div style={{ padding: '16px 24px', borderTop: '1px solid var(--omf-color-border-muted)', background: 'var(--omf-color-surface-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<DeleteOutlined />}
                        onClick={() => {
                          setPagination({
                            ...pagination,
                            current: pagination.current - 1,
                          });
                        }}
                        disabled={pagination.current <= 1}
                      />
                      <span style={{ fontWeight: 600, color: 'var(--omf-color-text-primary)' }}>
                        {t('admin:page', { current: pagination.current, total: Math.ceil((pagination.total || 0) / pagination.pageSize) })}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        rightIcon={<EditOutlined />}
                        onClick={() => {
                          setPagination({
                            ...pagination,
                            current: pagination.current + 1,
                          });
                        }}
                        disabled={
                          pagination.current >=
                          Math.ceil((pagination.total || 0) / pagination.pageSize)
                        }
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </TableWrapper>
        </UserContainer>
      </AdminStructure>
    </ToastProvider>
  );
};

export default withAuth(UsersPage, ['admin']);
