import { Form, Tabs } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../../../i18n'
import { Input, Select, Switch } from 'src/components/primitives'

export const BaseDataTab: React.FC<TabPaneProps> = (props) => {
  const { t } = useTranslation()

  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label={t('form:baseData.isLive')}
        name={['form', 'isLive']}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label={t('form:baseData.title')}
        name={['form', 'title']}
        rules={[
          {
            required: true,
            message: t('validation:titleRequired'),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('form:baseData.language')}
        name={['form', 'language']}
        rules={[
          {
            required: true,
            message: t('validation:languageRequired'),
          },
        ]}
      >
        <Select
          options={languages.map((language) => ({
            value: language,
            label: t(`language:${language}`),
          }))}
        />
      </Form.Item>

      <Form.Item
        label={t('form:baseData.showFooter')}
        name={['form', 'showFooter']}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label={t('form:baseData.anonymousSubmission')}
        name={['form', 'anonymousSubmission']}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>
    </Tabs.TabPane>
  )
}
