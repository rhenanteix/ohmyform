import { Button, Form, Input, message, Alert } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AuthFooter } from 'components/auth/footer'
import { AuthLayout } from 'components/auth/layout'
import { setAuth } from 'components/with.auth'
import { RegisterUserData, useRegisterMutation } from 'graphql/mutation/register.mutation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorPage } from '../components/error.page'
import { Omf } from '../components/omf'
import { useSettingsQuery } from '../graphql/query/settings.query'
import styled from 'styled-components'
import { Logo } from '../components/ui'

const AuthContainer = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 2;
`

const RegisterCard = styled.div`
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
  const { data } = useSettingsQuery()

  const [register] = useRegisterMutation()

  const finish = async (data: RegisterUserData) => {
    setLoading(true)

    try {
      const result = await register({
        variables: {
          user: data,
        },
      })

      setAuth(result.data.tokens.access, result.data.tokens.refresh)

      await message.success(t('register:welcome'))

      await router.push('/')
    } catch (e) {
      await message.error(t('register:credentialsAlreadyInUse'))
      setLoading(false)
    }
  }

  const failed = async () => {
    await message.error(t('validation:mandatoryFieldsMissing'))
  }

  if (data && data.disabledSignUp.value) {
    return <ErrorPage />
  }

  return (
    <AuthLayout loading={loading}>
      <Omf />
      <AuthContainer>
        <RegisterCard>
          <BrandWrapper>
            <Logo width={36} height={36} brandText={false} />
            <WelcomeTitle>Criar conta</WelcomeTitle>
          </BrandWrapper>
          <WelcomeSub>
            Comece gratuitamente e crie seus primeiros formulários em minutos.
          </WelcomeSub>
          <Form
            form={form}
            name="register"
            onFinish={finish}
            onFinishFailed={failed}
            layout="vertical"
          >
            {data && data.loginNote.value && (
              <Form.Item>
                <Alert type="warning" showIcon message={t('login:note')} description={<span>{data.loginNote.value}</span>} />
              </Form.Item>
            )}

            <Form.Item
              name="username"
              rules={[{ required: true, message: t('validation:usernameRequired') }]}
            >
              <Input size="large" placeholder={t('login:usernamePlaceholder')} />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: t('validation:emailRequired') },
                { type: 'email', message: t('validation:invalidEmail') },
              ]}
            >
              <Input size="large" placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: t('validation:passwordRequired') },
                { min: 5, message: t('validation:passwordMinLength') },
              ]}
            >
              <Input.Password size="large" placeholder={t('login:passwordPlaceholder')} />
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block>
                {t('register:registerNow')}
              </Button>
            </Form.Item>
          </Form>

          <FormFooter>
            <FooterLinks>
              <a href={'/login'}>
                <Button type={'link'} ghost>
                  {t('register:gotoLogin')}
                </Button>
              </a>
            </FooterLinks>
          </FormFooter>
        </RegisterCard>
      </AuthContainer>
      <AuthFooter />
    </AuthLayout>
  )
}

export default Index
