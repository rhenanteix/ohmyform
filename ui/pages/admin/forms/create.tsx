import { Button, Form, Input, message, Tabs } from 'antd'
import { cleanInput } from 'components/clean.input'
import { BaseDataTab } from 'components/form/admin/base.data.tab'
import Structure from 'components/structure'
import { withAuth } from 'components/with.auth'
import { FormFragment } from 'graphql/fragment/form.fragment'
import { useFormCreateMutation } from 'graphql/mutation/form.create.mutation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const CreateContainer = styled.div`
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
  form: FormFragment
}

const Create: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = Form.useForm<FormData>()
  const [saving, setSaving] = useState(false)
  const [create] = useFormCreateMutation()

  const save = async (formData: FormData) => {
    setSaving(true)

    try {
      const next = (
        await create({
          variables: cleanInput(formData),
        })
      ).data

      await message.success(t('form:created'))

      await router.replace('/admin/forms/[id]', `/admin/forms/${next.form.id}`)
    } catch (e) {
      console.error('failed to save', e)
      await message.error(t('form:creationError'))
    }

    setSaving(false)
  }

  return (
    <CreateContainer>
      <HeaderBar>
        <HeaderTitle>
          <HeaderTitleText>{t('form:create')}</HeaderTitleText>
          <HeaderDesc>Crie um novo formulário em poucos cliques.</HeaderDesc>
        </HeaderTitle>
        <Button key={'create'} onClick={form.submit} type={'primary'}>
          {t('form:createNow')}
        </Button>
      </HeaderBar>
      <FormCard>
        <Structure
          loading={saving}
          title={t('form:create')}
          selected={'forms'}
          breadcrumbs={[
            { href: '/admin', name: t('admin:home') },
            { href: '/admin/forms', name: t('admin:forms') },
          ]}
          extra={[]}
          style={{ paddingTop: 0 }}
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
            <Form.Item noStyle name={['form', 'id']}>
              <Input type={'hidden'} />
            </Form.Item>

            <Form.Item
              noStyle
              name={[
                'form',
                'layout',
              ]}
              initialValue={'card'}
            >
              <Input type={'hidden'} />
            </Form.Item>

            <Form.Item
              noStyle
              name={[
                'form', 'endPage', 'show',
              ]}
              initialValue={true}
            >
              <Input type={'hidden'} />
            </Form.Item>

            <Form.Item
              noStyle
              name={[
                'form', 'endPage', 'title',
              ]}
              initialValue={t('form:submitted')}
            >
              <Input type={'hidden'} />
            </Form.Item>

            <Form.Item
              noStyle
              label={t('form:endPage.continueButtonText')}
              name={[
                'form', 'endPage', 'buttonText',
              ]}
              initialValue={t('form:restart')}
            >
              <Input type={'hidden'} />
            </Form.Item>

            <Tabs>
              <BaseDataTab key={'base_data'} tab={t('form:baseDataTab')} />
            </Tabs>
          </Form>
        </Structure>
      </FormCard>
    </CreateContainer>
  )
}

export default withAuth(Create, ['admin'])
