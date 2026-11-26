import { AdminStructure as Structure } from 'components/admin/structure'
import { withAuth } from 'components/with.auth'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExportSubmissionAction } from '../../../../components/form/admin/export.submission.action'
import { SubmissionValues } from '../../../../components/form/admin/submission.values'
import { FormPagerFragment } from '../../../../graphql/fragment/form.pager.fragment'
import { SubmissionFragment } from '../../../../graphql/fragment/submission.fragment'
import {
  useSubmissionDeleteMutation,
} from '../../../../graphql/mutation/submission.delete.mutation'
import { useSubmissionPagerQuery } from '../../../../graphql/query/submission.pager.query'
import {
  Button,
  Table,
  ToastProvider,
  useToast,
} from 'src/components/primitives'

const Submissions: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [pagination, setPagination] = useState<{
    pageSize: number;
    current: number;
    total: number;
  }>({
    pageSize: 25,
    current: 1,
    total: 0,
  });
  const [form, setForm] = useState<FormPagerFragment>();
  const [entries, setEntries] = useState<SubmissionFragment[]>();
  const { loading, refetch } = useSubmissionPagerQuery({
    variables: {
      form: router.query.id as string,
      limit: pagination.pageSize,
      start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0,
      filter: {
        excludeEmpty: true,
      },
    },
    onCompleted: ({ pager, form }) => {
      setPagination({
        ...pagination,
        total: pager.total,
      });
      setForm(form);
      setEntries(pager.entries);
    },
  });
  const [deleteMutation] = useSubmissionDeleteMutation();
  const { addToast } = useToast();

  const doDelete = useCallback(async (id: string) => {
    try {
      await deleteMutation({
        variables: {
          id,
        },
      });
      addToast({ type: 'success', title: t('submission:deleted') });
    } catch (e) {
      addToast({ type: 'error', title: t('submission:deleteError') });
    }
  }, [deleteMutation, t]);

  const columns = [
    {
      key: 'progress',
      header: t('submission:progress'),
      width: '120px',
      accessor: (row: SubmissionFragment) => {
        const percent = Math.round(row.percentageComplete * 100);
        let status: 'active' | 'success' | 'exception' = 'active';

        if (row.percentageComplete >= 1) {
          status = 'success';
        } else if (dayjs().diff(dayjs(row.lastModified), 'hour') > 4) {
          status = 'exception';
        }

        const colors = {
          active: 'var(--omf-color-primary-600)',
          success: 'var(--omf-color-status-success)',
          exception: 'var(--omf-color-status-warning)',
        };

        return (
          <div
            style={{
              width: '100px',
              height: '8px',
              borderRadius: '4px',
              background: 'var(--omf-color-border-muted)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${percent}%`,
                height: '100%',
                borderRadius: '4px',
                background: colors[status],
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        );
      },
    },
    {
      key: 'created',
      header: t('submission:created'),
      width: '160px',
      accessor: (row: SubmissionFragment) =>
        new Date(row.created).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      key: 'lastModified',
      header: t('submission:lastModified'),
      width: '160px',
      accessor: (row: SubmissionFragment) => {
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
      header: '',
      width: '100px',
      align: 'center' as const,
      accessor: (row: SubmissionFragment) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            if (window.confirm(t('submission:confirmDelete'))) {
              void doDelete(row.id);
            }
          }}
        >
          {t('submission:deleteNow')}
        </Button>
      ),
    },
  ];

  return (
    <ToastProvider>
      <Structure
        title={t('admin:submissions')}
        selected={'forms'}
        loading={loading}
        breadcrumbs={[
          { href: '/admin', name: t('admin:home') },
          { href: '/admin/forms', name: t('admin:forms') },
          {
            href: '/admin/forms/[id]',
            name: loading || !form ? t('form:loading') : t('form:mange', { title: form.title }),
            as: `/admin/forms/${router.query.id as string}`,
          },
        ]}
        padded={false}
        extra={[
          <ExportSubmissionAction
            key={'export'}
            form={router.query.id as string}
            trigger={(onClick, loading) => (
              <Button onClick={onClick} loading={loading}>
                {t('submission:export')}
              </Button>
            )}
          />,
          <a
            key={'edit'}
            href={`/admin/forms/${router.query.id as string}`}
          >
            <Button variant="secondary">{t('submission:edit')}</Button>
          </a>,
          <Button
            key={'web'}
            as="a"
            href={`/form/${router.query.id as string}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            {t('submission:add')}
          </Button>,
        ]}
      >
        <Table
          columns={columns}
          data={entries}
          keyAccessor="id"
          pagination={{
            pageSize: pagination.pageSize,
            current: pagination.current,
            total: pagination.total,
            onChange: async (page: number, pageSize: number) => {
              setPagination({ ...pagination, pageSize, current: page });
              await refetch();
            },
            pageSizeOptions: [
              10,
              25,
              50,
              100,
            ],
          }}
          expandable={{
            expandedRowRender: (record) => <SubmissionValues form={form} submission={record} />,
            rowExpandable: (record) => record.percentageComplete > 0,
          }}
          loading={loading}
        />
      </Structure>
    </ToastProvider>
  );
};

export default withAuth(Submissions, ['admin']);
