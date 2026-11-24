import { Button, Divider, Form, Input, message, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Structure from '../../components/structure'
import { withAuth } from '../../components/with.auth'
import { useProfileUpdateMutation } from '../../graphql/mutation/profile.update.mutation'
import { useProfileQuery } from '../../graphql/query/admin.profile.query'
import { languages } from '../../i18n'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  max-width: 800px;
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

const FormCard = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--omf-border);
  box-shadow: var(--omf-shadow-sm);
  padding: 32px;
`

interface FormData {
  user: {
    id: string
    username: string
    email: string
    language: string
    firstName: string
    lastName: string
  }
  password: string
  confirm: string
}

const Profile: NextPage = () => {
  const { t } = useTranslation()
  const [form] = useForm<FormData>()
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const { loading } = useProfileQuery({
    onCompleted: (next) => {
      form.setFieldsValue(next)
    },
    onError(e) {
      void router.push('/')
    },
  })

  const [update] = useProfileUpdateMutation()

  const save = async (data: FormData) => {
    setSaving(true)

    try {
      const next = (
        await update({
          variables: {
            user: {
              ...data.user,
              password: data.password && data.password === data.confirm ? data.password : undefined,
            },
          },
        })
      ).data

      form.setFieldsValue(next)

      await message.success(t('profile:updated'))
    } catch (e) {
      console.error('failed to save', e)
      await message.error(t('profile:updateError'))
    }

    setSaving(false)
  }

  return (
    <ProfileContainer>
      <HeaderBar>
        <HeaderTitle>
          <HeaderTitleText>{t('admin:profile')}</HeaderTitleText>
          <HeaderDesc>Gerencie suas informações pessoais e preferências.</HeaderDesc>
        </HeaderTitle>
        <Button key={'save'} onClick={form.submit} type={'primary'}>
          {t('profile:updateNow')}
        </Button>
      </HeaderBar>
      <FormCard>
        <Structure
          loading={loading || saving}
          title={t('admin:profile')}
          selected={'profile'}
          breadcrumbs={[{ href: '/admin', name: t('admin:home') }]}
          extra={[]}
        >
          <Form
            form={form}
            onFinish={save}
            onFinishFailed={async () => {
              await message.error(t('validation:mandatoryFieldsMissing'))
            }}
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
              <Input type={'hidden'} />
            </Form.Item>

            <Form.Item
              label={t('profile:username')}
              name={['user', 'username']}
              rules={[
                {
                  required: true,
                  message: t('validation:usernameRequired'),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('profile:email')}
              name={['user', 'email']}
              rules={[
                {
                  required: true,
                  message: t('validation:emailRequired'),
                },
                {
                  type: 'email',
                  message: t('validation:invalidEmail'),
                },
              ]}
            >
              <Input type={'email'} />
            </Form.Item>

            <Form.Item
              label={t('profile:language')}
              name={['user', 'language']}
              rules={[
                {
                  required: true,
                  message: t('validation:languageRequired'),
                },
              ]}
            >
              <Select>
                {languages.map((language) => (
                  <Select.Option value={language} key={language}>
                    {t(`language:${language}`)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label={t('profile:firstName')} name={['user', 'firstName']}>
              <Input />
            </Form.Item>

            <Form.Item label={t('profile:lastName')} name={['user', 'lastName']}>
              <Input />
            </Form.Item>

            <Divider style={{ margin: '24px 0' }} />

            <Form.Item
              name="password"
              label={t('profile:password')}
              rules={[
                {
                  min: 5,
                  message: t('validation:passwordMinLength'),
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item noStyle shouldUpdate>
              {() => (
                <Form.Item
                  name="confirm"
                  label={t('profile:confirmPassword')}
                  rules={[
                    {
                      required: Boolean(form.getFieldValue('password')),
                      message: t('validation:passwordConfirmRequired'),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error(t('validation:passwordConfirmMismatch')))
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              )}
            </Form.Item>
          </Form>
        </Structure>
      </FormCard>
    </ProfileContainer>
  )
}

export default withAuth(Profile)
