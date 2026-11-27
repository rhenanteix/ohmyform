import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib'
import { Form } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { InputColor } from '../../input/color'
import { Button, Input, Switch } from 'src/components/primitives'
import { Card, Input as AntdInput } from 'antd'

export const EndPageTab: React.FC<TabPaneProps> = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <Form.Item
        label={t('form:endPage.show')}
        name={[
          'form', 'endPage', 'show',
        ]}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>

      <Form.Item label={t('form:endPage.title')} name={[
        'form', 'endPage', 'title',
      ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label={t('form:endPage.paragraph')}
        name={[
          'form', 'endPage', 'paragraph',
        ]}
        extra={t('type:descriptionInfo')}
      >
        <AntdInput.TextArea autoSize />
      </Form.Item>

      <Form.Item
        label={t('form:endPage.continueButtonText')}
        name={[
          'form', 'endPage', 'buttonText',
        ]}
      >
        <Input />
      </Form.Item>

      <Form.List name={[
        'form', 'endPage', 'buttons',
      ]}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  wrapperCol={{
                    sm: { offset: index === 0 ? 0 : 6 },
                  }}
                  label={index === 0 ? t('form:endPage.buttons') : ''}
                  key={field.key}
                >
                  <Card actions={[<DeleteOutlined key={'delete'} onClick={() => remove(index)} />]}>
                    <Form.Item
                      label={t('form:endPage.url')}
                      name={[field.name, 'url']}
                      rules={[{ type: 'url', message: t('validation:invalidUrl') }]}
                      labelCol={{ span: 6 }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={t('form:endPage.action')}
                      name={[field.name, 'action']}
                      labelCol={{ span: 6 }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={t('form:endPage.text')}
                      name={[field.name, 'text']}
                      labelCol={{ span: 6 }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={t('form:endPage.bgColor')}
                      name={[field.name, 'bgColor']}
                      labelCol={{ span: 6 }}
                    >
                      <InputColor />
                    </Form.Item>
                    <Form.Item
                      label={t('form:endPage.activeColor')}
                      name={[field.name, 'activeColor']}
                      labelCol={{ span: 6 }}
                    >
                      <InputColor />
                    </Form.Item>
                    <Form.Item
                      label={t('form:endPage.color')}
                      name={[field.name, 'color']}
                      labelCol={{ span: 6 }}
                    >
                      <InputColor />
                    </Form.Item>
                  </Card>
                </Form.Item>
              ))}
              <Form.Item
                wrapperCol={{
                  sm: { offset: 6 },
                }}
              >
                <Button
                  variant="dashed"
                  onClick={() => {
                    add()
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> {t('form:endPage.addButton')}
                </Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>
    </>
  )
}
