import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Button, message, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import { PaginationProps } from 'antd/es/pagination'
import { ColumnsType } from 'antd/lib/table/interface'
import { DateTime } from 'components/date.time'
import { TimeAgo } from 'components/time.ago'
import { withAuth } from 'components/with.auth'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from '../../../components/use.window.size'
import { FormPagerFragment } from '../../../graphql/fragment/form.pager.fragment'
import { useFormDeleteMutation } from '../../../graphql/mutation/form.delete.mutation'
import { useFormPagerQuery } from '../../../graphql/query/form.pager.query'
import styled from 'styled-components'

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  position: relative;
`

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const HeaderIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);
`

const HeaderTitleText = styled.div`
  h2 {
    font-size: 22px;
    font-weight: 900;
    color: #0f172a;
    margin: 0 0 4px;
  }
  span {
    font-size: 13px;
    color: #64748b;
  }
`

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TableWrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--omf-border);
  box-shadow: var(--omf-shadow-sm);
  overflow: hidden;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
  color: #64748b;
`

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #8B5CF6;
  margin-bottom: 16px;
`

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
`

const EmptyDesc = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 24px;
`

const Index: NextPage = () => {
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 25,
  })
  const [entries, setEntries] = useState<FormPagerFragment[]>()
  const { loading, refetch, error } = useFormPagerQuery({
    variables: {
      limit: pagination.pageSize,
      start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0,
    },
    onCompleted: ({ pager }) => {
      setPagination({
        ...pagination,
        total: pager.total,
      })
      setEntries(pager.entries)
    },
  })
  const [executeDelete] = useFormDeleteMutation()

  const deleteForm = async (id: string) => {
    try {
      await executeDelete({
        variables: {
          id,
        },
      })
      const next = entries.filter((entry) => entry.id !== id)
      if (next.length === 0) {
        setPagination({ ...pagination, current: 1 })
      } else {
        setEntries(next)
      }

      await message.success(t('form:deleted'))
    } catch (e) {
      await message.error(t('form:deleteError'))
    }
  }

  const columns: ColumnsType<FormPagerFragment> = [
    {
      title: t('form:row.isLive'),
      dataIndex: 'isLive',
      render(live: boolean) {
        return (
          <Tag color={live ? 'green' : 'default'} style={{ fontWeight: 700 }}>
            {live ? t('form:row.isLive') : 'Rascunho'}
          </Tag>
        )
      },
      responsive: ['md'],
    },
    {
      title: t('form:row.title'),
      dataIndex: 'title',
      render(text: string, record: FormPagerFragment) {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontWeight: 900 }}>
              {text.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{text}</span>
          </div>
        )
      },
    },
    {
      title: t('form:row.admin'),
      dataIndex: 'admin',
      render(_, { admin: user }) {
        if (!user) {
          return <Tag color={'default'} title={t('form:row.adminMissing')}>{t('form:row.adminMissing')}</Tag>
        }

        return (
          <Tooltip title={user.email}>
            <a href={`/admin/users/${user.id}`} style={{ textDecoration: 'none', color: '#8B5CF6', fontWeight: 700 }}>
              {user.username}
            </a>
          </Tooltip>
        )
      },
      responsive: ['lg'],
    },
    {
      title: t('form:row.language'),
      dataIndex: 'language',
      render(lang: string) {
        return (
          <Tag color='default' style={{ fontSize: 12 }}>
            {t(`language:${lang}`)}
          </Tag>
        )
      },
      responsive: ['lg'],
    },
    {
      title: t('form:row.created'),
      dataIndex: 'created',
      render(date: string) {
        return <DateTime date={date} />
      },
      responsive: ['lg'],
    },
    {
      title: t('form:row.lastModified'),
      dataIndex: 'lastModified',
      render(date: string) {
        return <TimeAgo date={date} />
      },
      responsive: ['md'],
    },
    {
      title: t('form:row.menu'),
      align: 'right',
      render(_, row) {
        return (
          <Space direction={width < 600 ? 'vertical' : 'horizontal'} style={{ gap: 8 }}>
            <a href={`/admin/forms/${row.id}/submissions`} style={{ textDecoration: 'none' }}>
              <Button ghost icon={<UnorderedListOutlined />} />
            </a>

            <a href={`/admin/forms/${row.id}`} style={{ textDecoration: 'none' }}>
              <Button type='primary' icon={<EditOutlined />} />
            </a>

            <Popconfirm
              title={t('form:confirmDelete')}
              onConfirm={() => deleteForm(row.id)}
              okText={t('form:deleteNow')}
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>

            {row.isLive && (
              <a href={`/form/${row.id}`} target={'_blank'} rel={'noreferrer'} style={{ textDecoration: 'none' }}>
                <Button ghost icon={<GlobalOutlined />} />
              </a>
            )}

            {!row.isLive && (
              <Tooltip title={'Não acessível publicamente!'} placement={'left'}>
                <a href={`/form/${row.id}`} target={'_blank'} rel={'noreferrer'} style={{ textDecoration: 'none' }}>
                  <Button ghost icon={<WarningOutlined />} />
                </a>
              </Tooltip>
            )}

          </Space>
        )
      },
    },
  ]

  if (!entries || entries.length === 0) {
    return (
      <FormContainer>
        <HeaderBar>
          <HeaderTitle>
            <HeaderIcon>📝</HeaderIcon>
            <HeaderTitleText>
              <h2>{t('admin:forms')}</h2>
              <span>Gerencie todos os seus formulários em um só lugar.</span>
            </HeaderTitleText>
          </HeaderTitle>
          <ActionsGroup>
            <a href={'/admin/forms/create'}>
              <Button type={'primary'}>{t('form:new')}</Button>
            </a>
          </ActionsGroup>
        </HeaderBar>
        <EmptyState>
          <EmptyIcon>📭</EmptyIcon>
          <EmptyTitle>Nenhum formulário ainda</EmptyTitle>
          <EmptyDesc>Comece criando seu primeiro formulário. É rápido e fácil.</EmptyDesc>
          <a href={'/admin/forms/create'}>
            <Button type={'primary'}>{t('form:createNow')}</Button>
          </a>
        </EmptyState>
      </FormContainer>
    )
  }

  return (
    <FormContainer>
      <HeaderBar>
        <HeaderTitle>
          <HeaderIcon>📝</HeaderIcon>
          <HeaderTitleText>
            <h2>{t('admin:forms')}</h2>
            <span>Gerencie todos os seus formulários em um só lugar.</span>
          </HeaderTitleText>
        </HeaderTitle>
        <ActionsGroup>
          <a href={'/admin/forms/create'}>
            <Button type={'primary'}>{t('form:new')}</Button>
          </a>
        </ActionsGroup>
      </HeaderBar>
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={entries}
          rowKey={'id'}
          pagination={pagination}
          onChange={async (next) => {
            setPagination(next)
            await refetch()
          }}
          size={'middle'}
          rowClassName={() => 'ant-table-row'}
          locale={{ emptyText: '' }}
        />
      </TableWrapper>
    </FormContainer>
  )
}

export default withAuth(Index, ['admin'])
