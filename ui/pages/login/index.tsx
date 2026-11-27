import { useMutation } from '@apollo/client'
import { Alert, Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AuthFooter } from 'components/auth/footer'
import { AuthLayout } from 'components/auth/layout'
import { setAuth } from 'components/with.auth'
import {
  LOGIN_MUTATION,
  LoginMutationData,
  LoginMutationVariables,
} from 'graphql/mutation/login.mutation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { useSettingsQuery } from '../../graphql/query/settings.query'
import styled from 'styled-components'
import { Logo } from '../../components/ui'

const AuthContainer = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 2;
`

const LoginCard = styled.div`
  padding: 12px 8px;
  width: 100%;
  position: relative;
`

const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

const WelcomeTitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -1px;
  color: #233c35;
  margin: 0 0 8px;
  text-align: left;
`

const WelcomeSub = styled.p`
  font-size: 15px;
  color: #64748b;
  margin: 0 0 32px;
  text-align: left;
  line-height: 1.5;
`

const FormFooter = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  text-align: left;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 16px;
`

const Index: NextPage = () => {
  const { t } = useTranslation()
  const [form] = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [login] = useMutation<LoginMutationData, LoginMutationVariables>(LOGIN_MUTATION)
  const { data } = useSettingsQuery()

  const finish = async (data: LoginMutationVariables) => {
    setLoading(true)
    try {
      const result = await login({
        variables: data,
      })

      setAuth(result.data.tokens.access, result.data.tokens.refresh)

      await message.success(t('login:welcomeBack'))

      await router.push('/admin')
    } catch (e) {
      await message.error(t('login:invalidLoginCredentials'))
    }

    setLoading(false)
  }

  const failed = async () => {
    await message.error(t('validation:mandatoryFieldsMissing'))
  }

  return (
    <AuthLayout loading={loading}>
      <AuthContainer>
        <LoginCard>
          <BrandWrapper><Logo /></BrandWrapper>
          <WelcomeTitle>Bom ter você de volta.</WelcomeTitle>
          <WelcomeSub>Faça login para acessar seus formulários e respostas.</WelcomeSub>
          <Form
            form={form}
            name="login"
            onFinish={finish}
            onFinishFailed={failed}
            layout="vertical"
          >
            {data && data.loginNote.value && (
              <Alert
                type="warning"
                showIcon
                message={t('login:note')}
                description={<ReactMarkdown>{data.loginNote.value}</ReactMarkdown>}
                style={{
                  marginBottom: 24,
                }}
              />
            )}

            <Form.Item
              name="username"
              label={t('login:usernamePlaceholder')}
              rules={[{ required: true, message: t('validation:usernameRequired') }]}
            >
              <Input
                size="large"
                autoComplete="username"
                placeholder={t('login:usernamePlaceholder')}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('login:passwordPlaceholder')}
              rules={[{ required: true, message: t('validation:passwordRequired') }]}
            >
              <Input.Password
                autoComplete="current-password"
                size="large"
                placeholder={t('login:passwordPlaceholder')}
              />
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block loading={loading}>
                {t('login:loginNow')}
              </Button>
            </Form.Item>
          </Form>

          <FormFooter>
            <FooterLinks>
              {(!data || !data.disabledSignUp.value) && (
                <a href={'/register'}>
                  <Button type={'link'}>{t('register')}</Button>
                </a>
              )}
              <a href={'/login/recover'}>
                <Button type={'link'}>{t('recover')}</Button>
              </a>
            </FooterLinks>
          </FormFooter>
        </LoginCard>
      </AuthContainer>
      <AuthFooter />
    </AuthLayout>
  )
}

export default Index
