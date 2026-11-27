import { Form, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FormFieldFragment } from '../../../graphql/fragment/form.fragment'
import { fieldTypes } from '../types'
import { FieldCard } from './field.card'
import { Button, Input } from 'src/components/primitives'

const Picker = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 20px;
  button { border: 1px solid var(--omf-color-border); border-radius: 10px; padding: 16px; background: var(--omf-color-surface); color: var(--omf-color-text-primary); text-align: left; cursor: pointer; }
  button:hover { background: var(--omf-color-primary-50); border-color: var(--omf-color-primary-400); }
  span { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; background: var(--omf-color-surface-secondary); margin-right: 10px; font-weight: 600; }
  @media(max-width: 480px) { grid-template-columns: 1fr; }
`
const icons = { textfield: 'Aa', textarea: '¶', email: '@', number: '#', radio: '◉', checkbox: '☑', dropdown: '⌄', rating: '☆', date: '▦', yes_no: '✓', link: '↗', slider: '↔', location: '⌖', hidden: '…' }
export const FieldsTab: React.FC<{ form: FormInstance; fields: FormFieldFragment[]; onChangeFields: (fields: FormFieldFragment[]) => void }> = (props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const sync = () => props.onChangeFields(props.form.getFieldValue(['form', 'fields']) || [])
  return (
    <Form.List name={['form', 'fields']}>
      {(fields, { add, remove, move }) => (
        <>
          {!fields.length && (
            <div style={{ padding: '40px 24px', textAlign: 'center', border: '1px dashed var(--omf-color-border-strong)', borderRadius: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 36, color: 'var(--omf-color-primary-600)' }} aria-hidden="true">✎</span>
              <h3 style={{ margin: '16px 0 8px' }}>Tudo começa com uma pergunta.</h3>
              <p style={{ color: 'var(--omf-color-text-secondary)' }}>Adicione o que você quer saber. A prévia aparece ao lado.</p>
            </div>
          )}
          {fields.map((field, index) => (
            <div key={field.key} style={{ marginBottom: 20 }}>
              <FieldCard form={props.form} field={field} index={index} fields={props.fields} onChangeFields={props.onChangeFields}
                remove={i => { remove(i); sync() }} move={(from, to) => { move(from, to); sync() }} />
            </div>
          ))}
          <Button variant="outline" fullWidth onClick={() => { setSearch(''); setOpen(true) }}>+ Adicionar pergunta</Button>
          <Modal title="O que você quer perguntar?" visible={open} onCancel={() => setOpen(false)} footer={null} width={620} destroyOnClose>
            <Input label="Buscar tipo de pergunta" placeholder="Texto, e-mail, avaliação…" value={search} onChange={e => setSearch(e.target.value)} />
            <Picker>
              {Object.keys(fieldTypes).filter(type => t(`type:${type}.name`).toLowerCase().includes(search.toLowerCase())).map(type => (
                <button key={type} type="button" onClick={() => {
                  add({ id: `NEW-${Date.now()}`, type, title: '', description: '', required: false, options: [], logic: [] })
                  sync(); setOpen(false)
                }}><span aria-hidden="true">{icons[type]}</span>{t(`type:${type}.name`)}</button>
              ))}
            </Picker>
          </Modal>
        </>
      )}
    </Form.List>
  )
}
