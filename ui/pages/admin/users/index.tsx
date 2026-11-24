import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd'
import { PaginationProps } from 'antd/es/pagination'
import { ColumnsType } from 'antd/lib/table/interface'
import { withAuth } from 'components/with.auth'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DateTime } from '../../../components/date.time'
import { useWindowSize } from '../../../components/use.window.size'
import { UserRole } from '../../../components/user/role'
import { UserPagerFragment } from '../../../graphql/fragment/user.pager.fragment'
import { useUserDeleteMutation } from '../../../graphql/mutation/user.delete.mutation'
import { useUserPagerQuery } from '../../../graphql/query/user.pager.query'
import styled from 'styled-components'

const UserContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  position: relative;
`

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const HeaderTitleText = styled.h2`
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
  margin: 0;
`

const HeaderDesc = styled.span`
  font-size: 13px;
  color: #64748b;
  margin-left: 4px;
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
  margin: 0;
`

const Index: NextPage = () => {
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 10,
  })
  const [entries, setEntries] = useState<UserPagerFragment[]>()
  const { loading, refetch } = useUserPagerQuery({
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
  const [executeDelete] = useUserDeleteMutation()

  const deleteUser = async (id: string) => {
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
      await message.success(t('user:deleted'))
    } catch (e) {
      await message.error(t('user:deleteError'))
    }
  }

  const columns: ColumnsType<UserPagerFragment> = [
    {
      title: t('user:row.roles'),
      dataIndex: 'roles',
      render(roles: string[]) {
        return <UserRole roles={roles} />
      },
      responsive: ['md'],
    },
    {
      title: t('user:row.email'),
      render(_, row) {
        return (
          <Tag color={row.verifiedEmail ? 'green' : 'default'} style={{ fontWeight: 700 }}>
            {row.email}
          </Tag>
        )
      },
    },
    {
      title: t('user:row.created'),
      dataIndex: 'created',
      render(date: string) {
        return <DateTime date={date} />
      },
      responsive: ['lg'],
    },
    {
      title: t('user:row.menu'),
      align: 'right',
      render(_, row) {
        return (
          <Space direction={width < 600 ? 'vertical' : 'horizontal'} style={{ gap: 8 }}>
            <a href={`/admin/users/${row.id}`} style={{ textDecoration: 'none' }}>
              <Button type='primary' icon={<EditOutlined />} />
            </a>

            <Popconfirm
              title={t('user:confirmDelete')}
              onConfirm={() => deleteUser(row.id)}
              okText={t('user:deleteNow')}
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  if (!entries || entries.length === 0) {
    return (
      <UserContainer>
        <HeaderBar>
          <HeaderTitle>
            <EmptyIcon>👥</EmptyIcon>
            <div>
              <HeaderTitleText>{t('admin:users')}</HeaderTitleText>
              <HeaderDesc>Gerencie os usuários da sua plataforma.</HeaderDesc>
            </div>
          </HeaderTitle>
        </HeaderBar>
        <EmptyState>
          <EmptyIcon>📭</EmptyIcon>
          <EmptyTitle>Nenhum usuário encontrado</EmptyTitle>
          <EmptyDesc>Não há usuários cadastrados na plataforma.</EmptyDesc>
        </EmptyState>
      </UserContainer>
    )
  }

  return (
    <UserContainer>
      <HeaderBar>
        <HeaderTitle>
          <EmptyIcon>👥</EmptyIcon>
          <div>
            <HeaderTitleText>{t('admin:users')}</HeaderTitleText>
            <HeaderDesc>Gerencie os usuários da sua plataforma.</HeaderDesc>
          </div>
        </HeaderTitle>
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
        />
      </TableWrapper>
    </UserContainer>
  )
}

export default withAuth(Index, ['admin'])
