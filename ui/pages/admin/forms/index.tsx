import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  InboxOutlined,
  GlobalOutlined,
  UnorderedListOutlined,
  WarningOutlined,
  CopyOutlined,
  EyeOutlined,
  EllipsisOutlined,
  PlusOutlined,
  UpOutlined,
  DownOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { AdminStructure } from 'components/admin/structure';
import {
  Avatar,
  IconWrapper,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  AdminCard,
  AdminScrollArea,
} from 'components/admin/ui';
import { useWindowSize } from '../../../components/use.window.size';
import { FormPagerFragment } from '../../../graphql/fragment/form.pager.fragment';
import { useFormDeleteMutation } from '../../../graphql/mutation/form.delete.mutation';
import { useFormPagerQuery } from '../../../graphql/query/form.pager.query';
import { NextPage } from 'next';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Button,
  Input,
  Select,
  Badge,
  Table,
  Dropdown,
  ToastProvider,
  useToast,
} from 'src/components/primitives';

const FormContainer = styled.div`
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

const HeaderIconWrapper = styled(IconWrapper)`
  background: linear-gradient(135deg, var(--omf-color-primary-600) 0%, var(--omf-color-primary-700) 100%);
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

const TableWrapper = styled(AdminCard)`
  padding: 0;
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

const EmptyIconWrapper = styled(EmptyIcon)`
  background: var(--omf-color-primary-50);
  color: var(--omf-color-primary-600);
`;

const EmptyTitleText = styled(EmptyTitle)``;

const EmptyDescText = styled(EmptyDescription)``;

const FormTitleCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FormAvatar = styled(Avatar)`
  background: var(--omf-color-primary-100);
  color: var(--omf-color-primary-700);
  font-weight: 900;
`;

const FormTitleText = styled.span`
  font-weight: 700;
  color: var(--omf-color-text-primary);
  font-size: 14px;
`;

const AdminNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AdminAvatar = styled(Avatar)`
  background: var(--omf-color-slate-100);
  color: var(--omf-color-slate-700);
`;

const AdminNameLink = styled.a`
  color: var(--omf-color-primary-600);
  font-weight: 600;
  text-decoration: none;
  font-size: 13px;
  transition: var(--omf-transition-fast);

  &:hover {
    color: var(--omf-color-primary-700);
    text-decoration: underline;
  }
`;

const LanguageTag = styled(Badge)`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--omf-radius-md);
  background: ${({ $primary }) => ($primary ? 'var(--omf-color-primary-600)' : 'var(--omf-color-surface-secondary)')};
  color: ${({ $primary }) => ($primary ? 'white' : 'var(--omf-color-text-secondary)')};
  cursor: pointer;
  transition: var(--omf-transition);

  &:hover {
    background: ${({ $primary }) => ($primary ? 'var(--omf-color-primary-700)' : 'var(--omf-color-border-muted)')};
    color: ${({ $primary }) => ($primary ? 'white' : 'var(--omf-color-text-primary)')};
  }
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

const WarningButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--omf-radius-md);
  background: #fffbeb;
  color: #f59e0b;
  text-decoration: none;
  transition: var(--omf-transition);

  &:hover {
    background: #fef3c7;
    color: #d97706;
  }
`;

const TableContainer = styled(AdminScrollArea)`
  max-height: 70vh;
`;

const FormsPage: NextPage = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const [pagination, setPagination] = useState<{
    pageSize: number;
    current: number;
    total: number;
  }>({
    pageSize: 25,
    current: 1,
    total: 0,
  });
  const [entries, setEntries] = useState<FormPagerFragment[]>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'draft'>('all');
  const { loading /*, refetch */ } = useFormPagerQuery({
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
  const [executeDelete] = useFormDeleteMutation();
  const { addToast } = useToast();

  const filteredEntries = useMemo(() => {
    if (!entries) return [];
    return entries.filter((entry) => {
      const matchesSearch = !searchQuery ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.admin?.username?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'live' && entry.isLive) ||
        (statusFilter === 'draft' && !entry.isLive);
      return matchesSearch && matchesStatus;
    });
  }, [
    entries, searchQuery, statusFilter,
  ]);

  const deleteForm = async (id: string) => {
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
      addToast({ type: 'success', title: t('form:deleted') });
    } catch (e) {
      addToast({ type: 'error', title: t('form:deleteError') });
    }
  };

  const duplicateForm = (id: string) => {
    try {
      // TODO: implement duplicate mutation
      addToast({ type: 'success', title: t('form:duplicated') });
    } catch (e) {
      addToast({ type: 'error', title: t('form:duplicateError') });
    }
  };

  const columns = useMemo(() => [
    {
      key: 'isLive',
      header: t('form:row.isLive'),
      width: '100px',
      accessor: (row: FormPagerFragment) => (
        <Badge variant={row.isLive ? 'success' : 'draft'} size="sm">
          {row.isLive ? t('form:live') : t('form:draft')}
        </Badge>
      ),
    },
    {
      key: 'title',
      header: t('form:row.title'),
      accessor: (row: FormPagerFragment) => (
        <FormTitleCell>
          <FormAvatar $name={row.title} $size="md" />
          <FormTitleText>{row.title}</FormTitleText>
        </FormTitleCell>
      ),
    },
    {
      key: 'admin',
      header: t('form:row.admin'),
      width: '200px',
      accessor: (row: FormPagerFragment) => {
        if (!row.admin) {
          return (
            <Badge variant="default" size="sm">
              {t('form:row.adminMissing')}
            </Badge>
          );
        }
        return (
          <AdminNameCell>
            <AdminAvatar $name={row.admin.username} $size="sm" />
            <AdminNameLink href={`/admin/users/${row.admin.id}`} target="_blank" rel="noopener">
              {row.admin.username}
            </AdminNameLink>
          </AdminNameCell>
        );
      },
    },
    {
      key: 'language',
      header: t('form:row.language'),
      width: '120px',
      accessor: (row: FormPagerFragment) => (
        <LanguageTag variant="default" size="sm">
          {t(`language:${row.language}`)}
        </LanguageTag>
      ),
    },
    {
      key: 'created',
      header: t('form:row.created'),
      width: '160px',
      accessor: (row: FormPagerFragment) => new Date(row.created).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      key: 'lastModified',
      header: t('form:row.lastModified'),
      width: '160px',
      accessor: (row: FormPagerFragment) => {
        const diff = Date.now() - new Date(row.lastModified).getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return `${seconds}s`;
      },
    },
    {
      key: 'actions',
      header: t('form:row.actions'),
      width: '200px',
      align: 'center' as const,
      accessor: (row: FormPagerFragment) => {
        const menuItems = [
          { label: t('form:edit'), value: 'edit', icon: <EditOutlined /> },
          { label: t('form:submissions'), value: 'submissions', icon: <UnorderedListOutlined /> },
          { divider: true },
          { label: t('form:duplicate'), value: 'duplicate', icon: <CopyOutlined /> },
          ...(row.isLive ? [{ label: t('form:viewPublic'), value: 'view', icon: <EyeOutlined /> }] : []),
          { divider: true },
          { label: t('form:delete'), value: 'delete', icon: <DeleteOutlined />, danger: true },
        ];

        return (
          <div style={{ display: 'flex', gap: '8px', flexDirection: width < 600 ? 'column' : 'row' }}>
            {row.isLive && (
              <ViewButton
                href={`/form/${row.id}`}
                target="_blank"
                rel="noopener noreferrer"
                data-tooltip={t('form:viewPublic')}
              >
                <GlobalOutlined />
              </ViewButton>
            )}
            {!row.isLive && (
              <WarningButton
                href={`/form/${row.id}`}
                target="_blank"
                rel="noopener noreferrer"
                data-tooltip={t('form:notAccessible')}
              >
                <WarningOutlined />
              </WarningButton>
            )}
            <Dropdown
              trigger={
                <ActionButton>
                  <EllipsisOutlined />
                </ActionButton>
              }
              items={menuItems}
              onSelect={(value) => {
                switch (value) {
                  case 'edit':
                    window.location.href = `/admin/forms/${row.id}`;
                    break;
                  case 'submissions':
                    window.location.href = `/admin/forms/${row.id}/submissions`;
                    break;
                  case 'duplicate':
                    void duplicateForm(row.id);
                    break;
                  case 'view':
                    window.open(`/form/${row.id}`, '_blank');
                    break;
                  case 'delete':
                    void deleteForm(row.id);
                    break;
                }
              }}
            />
          </div>
        );
      },
    },
  ], [
    t, width, entries, pagination.current, deleteForm, duplicateForm, addToast,
  ]);

  return (
    <ToastProvider>
      <AdminStructure
        title={t('admin:forms')}
        subTitle={t('admin:formsSubtitle')}
        selected="forms"
        breadcrumbs={[{ name: t('admin:home'), href: '/admin' }, { name: t('admin:forms') }]}
      >
        <FormContainer>
          <HeaderBar>
            <HeaderTitle>
              <HeaderIconWrapper $size="lg">
                <FileTextOutlined />
              </HeaderIconWrapper>
              <HeaderTitleText>
                <h2>{t('admin:forms')}</h2>
                <span>{t('admin:formsSubtitle')}</span>
              </HeaderTitleText>
            </HeaderTitle>
            <ActionsGroup>
              <Button as="a" href="/admin/forms/create" variant="primary" leftIcon={<PlusOutlined />}>
                {t('form:new')}
              </Button>
            </ActionsGroup>
          </HeaderBar>

          <TableWrapper>
            <TableToolbar>
              <ToolbarLeft>
                <SearchWrapper>
                  <SearchIcon><SearchOutlined /></SearchIcon>
                  <Input
                    placeholder={t('admin:searchForms')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<SearchOutlined />}
                    fullWidth={false}
                    style={{ width: 280 }}
                  />
                </SearchWrapper>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'live' | 'draft')}
                  fullWidth={false}
                  style={{ width: 180, minWidth: 160 }}
                  placeholder={t('admin:allStatus')}
                  options={[
                    { value: 'all', label: t('admin:allStatus') },
                    { value: 'live', label: t('form:live') },
                    { value: 'draft', label: t('form:draft') },
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
                <EmptyIconWrapper><InboxOutlined /></EmptyIconWrapper>
                <EmptyTitleText>{searchQuery ? t('admin:noResults') : t('admin:noForms')}</EmptyTitleText>
                <EmptyDescText>
                  {searchQuery
                    ? t('admin:noResultsDesc')
                    : t('admin:noFormsDesc')}
                </EmptyDescText>
                {!searchQuery && (
                  <Button variant="primary" leftIcon={<PlusOutlined />} onClick={() => window.location.href = '/admin/forms/create'}>
                    {t('form:createNow')}
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
                        leftIcon={<UpOutlined />}
                        onClick={() => {
                          setPagination({
                            ...pagination,
                            current: pagination.current - 1,
                          });
                        }}
                        disabled={pagination.current <= 1}
                      />
                      <span style={{ fontWeight: 600, color: 'var(--omf-color-text-primary)' }}>
                        {t('admin:page', {
                          current: pagination.current,
                          total: Math.ceil((pagination.total || 0) / pagination.pageSize),
                        })}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        rightIcon={<DownOutlined />}
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
        </FormContainer>
      </AdminStructure>
    </ToastProvider>
  );
};

export default FormsPage;
