import { Alert } from 'antd'
import { AuthFooter } from 'components/auth/footer'
import { AuthLayout } from 'components/auth/layout'
import { NextPage } from 'next'
import React from 'react'
import { Omf } from '../../components/omf'

const Recover: NextPage = () => {
  return (
    <AuthLayout>
      <Omf />
      <Alert
        style={{
          margin: 'auto',
          maxWidth: '90%',
          width: 500,
          textAlign: 'center',
        }}
        type={'warning'}
        message={'Recuperação de acesso'}
        description={
          'A recuperação automática de senha ainda não está disponível. Entre em contato com o administrador da plataforma para recuperar seu acesso.'
        }
      />

      <AuthFooter />
    </AuthLayout>
  )
}

export default Recover
