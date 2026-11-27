import { AdminStructure as Structure } from 'components/admin/structure'
import { withAuth } from 'components/with.auth'
import debug from 'debug'
import { useFormUpdateMutation } from 'graphql/mutation/form.update.mutation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { HooksTab } from '../../../../components/form/admin/hooks.tab'
import {
  FormFieldFragment,
  FormFieldOptionKeysFragment,
} from '../../../../graphql/fragment/form.fragment'
import { Data, useFormQuery } from '../../../../graphql/query/form.query'
import { BaseDataTab } from 'components/form/admin/base.data.tab'
import { DesignTab } from 'components/form/admin/design.tab'
import { EndPageTab } from 'components/form/admin/end.page.tab'
import { FieldsTab } from 'components/form/admin/fields.tab'
import { NotificationsTab } from 'components/form/admin/notifications.tab'
import { StartPageTab } from 'components/form/admin/start.page.tab'
import { Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { cleanInput } from 'components/clean.input'
import {
  Button,
  Tabs,
  ToastProvider,
  useToast,
} from 'src/components/primitives'

const logger = debug('page/admin/form/[id]')

const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)
  const [fields, setFields] = useState<FormFieldFragment[]>([])
  const [activeTab, setActiveTab] = useState('fields')
  const [update] = useFormUpdateMutation()
  const { addToast } = useToast()

  const processNext = (next: Data) => {
    return {
      form: {
        ...next.form,
        fields: next.form.fields
          .map((field) => {
            const keys: FormFieldOptionKeysFragment = {}

            field.options.forEach((option) => {
              if (option.key) {
                try {
                  keys[option.key] = JSON.parse(option.value)
                } catch (e) {
                  logger('invalid option value %O', e)
                }
              }
            })

            return {
              ...field,
              defaultValue: field.defaultValue ? JSON.parse(field.defaultValue) : null,
              options: field.options.filter((option) => !option.key),
              optionKeys: keys,
            }
          })
          .sort((a, b) => a.idx - b.idx),
      },
    }
  }

  const { data, loading, error } = useFormQuery({
    variables: {
      id: router.query.id as string,
    },
    onCompleted: (next) => {
      const processed = processNext(next)
      form.setFieldsValue(processed)
      setFields(processed.form.fields)
    },
  })

  const save = async (formData: Data) => {
    setSaving(true)

    formData.form.fields = formData.form.fields
      .filter((e) => e && e.type)
      .map(({ optionKeys, ...field }, index) => {
        const options = field.options

        if (optionKeys) {
          Object.keys(optionKeys).forEach((key) => {
            if (optionKeys[key] === undefined) {
              return
            }

            options.push({
              id: null,
              value: JSON.stringify(optionKeys[key]),
              key,
            })
          })
        }

        return {
          ...field,
          defaultValue: field.defaultValue !== null ? JSON.stringify(field.defaultValue) : null,
          options,
          idx: index,
        }
      })

    try {
      const next = processNext(
        (
          await update({
            variables: cleanInput(formData),
          })
        ).data
      )

      form.setFieldsValue(next)
      setFields(next.form.fields)

      addToast({ type: 'success', title: t('form:updated') })
    } catch (e) {
      console.error('failed to save', e)
      addToast({ type: 'error', title: t('form:updateError') })
    }

    setSaving(false)
  }

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
  }, [])

  const tabs = [
    {
      id: 'fields',
      label: t('form:fieldsTab'),
      children: (
        <FieldsTab
          form={form}
          fields={fields}
          onChangeFields={setFields}
        />
      ),
    },
    {
      id: 'base_data',
      label: t('form:baseDataTab'),
      children: <BaseDataTab />,
    },
    {
      id: 'design',
      label: t('form:designTab'),
      children: <DesignTab />,
    },
    {
      id: 'notifications',
      label: t('form:notificationsTab'),
      children: (
        <NotificationsTab
          fields={fields}
          form={form}
        />
      ),
    },
    {
      id: 'start_page',
      label: t('form:startPageTab'),
      children: <StartPageTab />,
    },
    {
      id: 'end_page',
      label: t('form:endPageTab'),
      children: <EndPageTab />,
    },
    {
      id: 'hooks',
      label: t('form:hooksTab'),
      children: <HooksTab />,
    },
  ]

  if (error) {
    return (
      <Structure
        title={t('form:notFound')}
        selected={'forms'}
        breadcrumbs={[
          { href: '/admin', name: t('admin:home') },
          { href: '/admin/forms', name: t('admin:forms') },
        ]}
      >
        Not Found
      </Structure>
    )
  }

  return (
    <ToastProvider>
      <Structure
        loading={loading || saving}
        title={loading ? t('form:loading') : t('form:mange', { title: data.form.title })}
        selected={'forms'}
        breadcrumbs={[
          { href: '/admin', name: t('admin:home') },
          { href: '/admin/forms', name: t('admin:forms') },
        ]}
        extra={[
          <a
            key={'submissions'}
            href={`/admin/forms/${router.query.id as string}/submissions`}
          >
            <Button variant="secondary">{t('admin:submissions')}</Button>
          </a>,
          <Button key={'save'} variant="primary" type="submit" form="form-builder">
            {t('form:updateNow')}
          </Button>,
        ]}
        style={{ paddingTop: 0 }}
      >
        <Form
          form={form}
          onFinish={save}
          id="form-builder"
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
