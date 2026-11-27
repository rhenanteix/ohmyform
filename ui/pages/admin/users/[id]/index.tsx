import { AdminStructure as Structure } from 'components/admin/structure'
import { withAuth } from 'components/with.auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseDataTab } from '../../../../components/user/admin/base.data.tab'
import { useUserUpdateMutation } from '../../../../graphql/mutation/user.update.mutation'
import {
  ADMIN_USER_QUERY,
  AdminUserQueryData,
  AdminUserQueryVariables,
} from '../../../../graphql/query/admin.user.query'
import {
  Button,
  Tabs,
  ToastProvider,
  useToast,
} from 'src/components/primitives'
import { Form, Input as AntdInput } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { cleanInput } from '../../../../components/clean.input'
import { useQuery } from '@apollo/client'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('base_data')
  const [update] = useUserUpdateMutation()
  const { addToast } = useToast()

  const { data, loading } = useQuery<AdminUserQueryData, AdminUserQueryVariables>(
    ADMIN_USER_QUERY,
    {
      variables: {
        id: router.query.id as string,
      },
      onCompleted: (next) => {
        form.setFieldsValue(next)
      },
    }
  )

  const save = async (formData: AdminUserQueryData) => {
    setSaving(true)
    try {
      const next = (
        await update({
          variables: cleanInput(formData),
        })
      ).data

      form.setFieldsValue(next)

      addToast({ type: 'success', title: t('user:updated') })
    } catch (e) {
      console.error('failed to save', e)
      addToast({ type: 'error', title: t('user:updateError') })
    }

    setSaving(false)
  }

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
  }, [])

  const tabs = [
    {
      id: 'base_data',
      label: t('user:baseData'),
      children: <BaseDataTab />,
    },
  ]

  return (
    <ToastProvider>
      <Structure
        loading={loading || saving}
        title={loading ? t('user:loading') : t('user:mange', { email: data?.user?.email || '' })}
        selected={'users'}
        breadcrumbs={[
          { href: '/admin', name: t('admin:home') },
          { href: '/admin/users', name: t('admin:users') },
        ]}
        extra={[
          <Button key={'save'} variant="primary" type="submit" form="user-form">
            {t('user:updateNow')}
          </Button>,
        ]}
        style={{ paddingTop: 0 }}
      >
        <Form
          form={form}
          onFinish={save}
          id="user-form"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 6 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 18 },
          }}
        >
          <Form.Item noStyle name={['user', 'id']}>
            <AntdInput type={'hidden'} />
          </Form.Item>

          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </Form>
      </Structure>
    </ToastProvider>
  )
}

export default withAuth(Index, ['admin'])
