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
import { Omf } from '../../components/omf'
import { useSettingsQuery } from '../../graphql/query/settings.query'
import styled from 'styled-components'
import { Logo } from '../../components/ui'

const AuthContainer = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 2;
`

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  padding: 40px 32px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--omf-gradient);
  }
`

const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`

const WelcomeTitle = styled.h2`
  font-size: 26px;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 8px;
  text-align: center;
`

const WelcomeSub = styled.p`
  font-size: 15px;
  color: #64748b;
  margin: 0 0 32px;
  text-align: center;
  line-height: 1.5;
`

const FormFooter = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 12px;
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
      <Omf />
      <AuthContainer>
        <LoginCard>
          <BrandWrapper>
            <Logo width={36} height={36} brandText={false} />
            <WelcomeTitle>Bem-vindo de volta</WelcomeTitle>
          </BrandWrapper>
          <WelcomeSub>
            Faça login para acessar seus formulários e respostas.
          </WelcomeSub>
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
              rules={[{ required: true, message: t('validation:usernameRequired') }]}
            >
              <Input size="large" placeholder={t('login:usernamePlaceholder')} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: t('validation:passwordRequired') }]}
            >
              <Input.Password size="large" placeholder={t('login:passwordPlaceholder')} />
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block>
                {t('login:loginNow')}
              </Button>
            </Form.Item>
          </Form>

          <FormFooter>
            <FooterLinks>
              {(!data || !data.disabledSignUp.value) && (
                <a href={'/register'}>
                  <Button type={'link'} ghost>
                    {t('register')}
                  </Button>
                </a>
              )}
              <a href={'/login/recover'}>
                <Button type={'link'} ghost>
                  {t('recover')}
                </Button>
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
