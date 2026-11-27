import { PlusOutlined } from '@ant-design/icons/lib'
import { Form, Space } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormFieldFragment, FormFieldLogicFragment } from '../../../graphql/fragment/form.fragment'
import { fieldTypes } from '../types'
import { LogicBlock } from './logic.block'
import { Button, Card as PrimitiveCard, Checkbox, Input } from 'src/components/primitives'
import { Input as AntdInput } from 'antd'

interface Props {
  form: FormInstance
  fields: FormFieldFragment[]
  onChangeFields: (fields: FormFieldFragment[]) => void
  field: FieldData
  remove: (index: number) => void
  move: (from: number, to: number) => void
  index: number
}

export const FieldCard: React.FC<Props> = ({
  form,
  field,
  fields,
  onChangeFields,
  remove,
  move,
  index,
}) => {
  const { t } = useTranslation()

  const type = form.getFieldValue([
    'form', 'fields', field.name as string, 'type',
  ]) as string
  const TypeComponent = useMemo(() => (fieldTypes[type] || fieldTypes.textfield).adminFormField(), [type])

  const addLogic = useCallback((add: (defaults: unknown) => void, _index: number) => {
    return (
      <Form.Item wrapperCol={{ span: 24 }}>
        <Space
          style={{
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="dashed"
            onClick={() => {
              const defaults: FormFieldLogicFragment = {
                id: `NEW-${Date.now()}`,
                formula: null,
                action: null,
                jumpTo: null,
                visible: null,
                disable: null,
                require: null,
                enabled: false,
              }

              add(defaults)
            }}
          >
            <PlusOutlined /> {t('form:logic.add')}
          </Button>
        </Space>
      </Form.Item>
    )
  }, [])

  return (
    <PrimitiveCard
      className="editor-field-card"
      variant="outlined"
      padding="md"
    >
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <strong>{index + 1}. {t(`type:${type}.name`)}</strong>
        <Space wrap>
          <Button variant="secondary" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label="Mover pergunta para cima">↑</Button>
          <Button variant="secondary" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)} aria-label="Mover pergunta para baixo">↓</Button>
          <Button variant="secondary" onClick={() => remove(index)}>Remover pergunta</Button>
        </Space>
      </Space>
      <Form.Item name={[field.name as string, 'type']} noStyle>
        <Input type={'hidden'} />
      </Form.Item>
      <Form.Item
        label={t('type:title')}
        name={[field.name as string, 'title']}
        rules={[{ required: true, message: 'Title is required' }]}
        labelCol={{ span: 6 }}
      >
        <Input
          onChange={(e) => {
            onChangeFields(fields.map((item, i) => i === index ? { ...item, title: e.target.value } : item))
          }}
        />
      </Form.Item>
      <Form.Item
        label={t('type:description')}
        name={[field.name as string, 'description']}
        labelCol={{ span: 6 }}
        extra={t('type:descriptionInfo')}
      >
        <AntdInput.TextArea autoSize />
      </Form.Item>
      <Form.Item
        label={t('type:required')}
        name={[field.name as string, 'required']}
        labelCol={{ span: 6 }}
        valuePropName={'checked'}
        extra={type === 'hidden' && t('type:requiredInfo')}
      >
        <Checkbox />
      </Form.Item>

      <TypeComponent field={field} form={form} />

      <details><summary>Lógica condicional · avançado</summary>
      <Form.List name={[field.name as string, 'logic']}>
        {(logic, { add, remove: removeLogic, move }) => {
          const addAndMove = (index: number) => (defaults) => {
            add(defaults)
            move(logic.length, index)
          }

          return (
            <div>
              {addLogic(addAndMove(0), 0)}
              {logic.map((field, idx) => (
                <div key={field.key}>
                  <Form.Item wrapperCol={{ span: 24 }} noStyle>
                    <LogicBlock
                      field={field}
                      form={form}
                      fields={fields}
                      index={idx}
                      remove={removeLogic}
                    />
                  </Form.Item>
                  {addLogic(addAndMove(idx + 1), idx + 1)}
                </div>
              ))}
            </div>
          )
        }}
      </Form.List>
      </details>
    </PrimitiveCard>
  )
}

