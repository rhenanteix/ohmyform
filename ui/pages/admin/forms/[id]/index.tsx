import { Form } from 'antd'
import { AdminStructure } from 'components/admin/structure'
import { withAuth } from 'components/with.auth'
import { useFormUpdateMutation } from 'graphql/mutation/form.update.mutation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { FormFragment } from '../../../../graphql/fragment/form.fragment'
import { useFormQuery } from '../../../../graphql/query/form.query'
import { BaseDataTab } from 'components/form/admin/base.data.tab'
import { DesignTab } from 'components/form/admin/design.tab'
import { EndPageTab } from 'components/form/admin/end.page.tab'
import { FieldsTab } from 'components/form/admin/fields.tab'
import { NotificationsTab } from 'components/form/admin/notifications.tab'
import { StartPageTab } from 'components/form/admin/start.page.tab'
import { HooksTab } from 'components/form/admin/hooks.tab'
import { LivePreview } from 'components/form/admin/live.preview'
import { editorData, updateInput } from 'components/form/admin/form.data'
import { Button, Tabs, useToast } from 'src/components/primitives'

const Builder = styled.div`
  .builder-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding-bottom: 24px; border-bottom: 1px solid var(--omf-color-border); margin-bottom: 24px; }
  .builder-title { min-width: 0; flex: 1; }
  h1 { font-size: 23px; font-weight: 600; letter-spacing: -.6px; margin: 0 0 8px; overflow-wrap: anywhere; }
  .save-state { font-size: 12px; color: var(--omf-color-text-muted); }
  .builder-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
  .editor-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, .9fr); gap: 24px; align-items: start; }
  .editor-panel { min-width: 0; }
  .editor-field-card { background: var(--omf-color-surface); border-radius: 12px; padding: 24px; }
  .editor-field-card .ant-form-item-label { text-align: left; }
  .editor-field-card .ant-col-6, .editor-field-card .ant-col-18 { flex: 0 0 100%; max-width: 100%; }
  details { margin: 20px 0; padding: 16px; border: 1px solid var(--omf-color-border); border-radius: 10px; background: var(--omf-color-surface); }
  summary { cursor: pointer; font-size: 13px; font-weight: 600; color: var(--omf-color-text-secondary); }
  details[open] > summary { margin-bottom: 24px; }
  .share { margin: 0 0 24px; border-radius: 10px; padding: 16px; background: var(--omf-color-primary-50); font-size: 13px; overflow-wrap: anywhere; }
  @media(max-width: 1100px) { .editor-grid { grid-template-columns: 1fr; } }
  @media(max-width: 600px) { .editor-field-card { padding: 16px; } .builder-actions { width: 100%; } }
`
const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [preview, setPreview] = useState<FormFragment>()
  const [activeTab, setActiveTab] = useState('fields')
  const [update] = useFormUpdateMutation()
  const { addToast } = useToast()
  const sync = () => { setPreview({ ...form.getFieldsValue(true).form }); setDirty(true) }
  const { data, loading, error } = useFormQuery({
    variables: { id: router.query.id as string }, skip: !router.isReady,
    onCompleted: next => {
      const processed = editorData(next.form)
      form.setFieldsValue({ form: processed }); setPreview(processed); setDirty(false)
    },
  })
  useEffect(() => {
    if (!dirty) return
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [dirty])
  const invalid = () => {
    addToast({ type: 'error', title: 'Confira os campos obrigatórios antes de continuar.' })
  }
  const save = async (publish = false) => {
    if (saving) return
    try { await form.validateFields() } catch (error) {
      const section = error.errorFields?.[0]?.name[1]
      setActiveTab(section === 'fields' ? 'fields' : section === 'design' ? 'design' : 'settings')
      invalid(); return
    }
    setSaving(true)
    try {
      const input = updateInput(form.getFieldsValue(true).form)
      if (publish) {
        if (!input.fields.length) throw new Error('Adicione pelo menos uma pergunta antes de publicar.')
        input.isLive = true
      }
      const result = await update({ variables: { form: input } })
      if (!result.data?.form) throw new Error('Não foi possível salvar o formulário.')
      const processed = editorData(result.data.form)
      form.setFieldsValue({ form: processed }); setPreview(processed); setDirty(false)
      addToast({ type: 'success', title: publish ? 'Publicado! Seu formulário já pode receber respostas.' : 'Alterações salvas.' })
    } catch (error) {
      addToast({ type: 'error', title: 'Não foi possível salvar', description: error instanceof Error ? error.message : 'Tente novamente.' })
    } finally { setSaving(false) }
  }
  const tabs = [
    { id: 'fields', label: '1. Perguntas', children: <FieldsTab form={form} fields={preview?.fields || []} onChangeFields={sync} /> },
    { id: 'design', label: '2. Aparência', children: <DesignTab onDesignChange={sync} /> },
    { id: 'settings', label: '3. Configurações', children: <>
      <BaseDataTab />
      <details><summary>Boas-vindas e agradecimento</summary><StartPageTab /><EndPageTab /></details>
      <details><summary>Notificações por e-mail</summary><NotificationsTab fields={preview?.fields || []} form={form} /></details>
      <details><summary>Integrações e webhooks</summary><HooksTab /></details>
    </> },
  ]
  return (
    <AdminStructure loading={loading} selected="forms" padded={false} error={error ? 'Não foi possível carregar o formulário.' : undefined}
      breadcrumbs={[{ href: '/admin/forms', name: 'Meus formulários' }, { name: 'Editor' }]}>
      {!error && (
        <Builder>
          <div className="builder-toolbar">
            <div className="builder-title"><h1>{preview?.title || data?.form.title || 'Carregando formulário…'}</h1><span className="save-state">{data?.form.isLive ? '● Publicado' : '○ Rascunho'} · {saving ? 'Salvando…' : dirty ? 'Alterações não salvas' : 'Tudo salvo'}</span></div>
            <div className="builder-actions">
              <Button variant="ghost" onClick={() => router.push(`/admin/forms/${router.query.id}/submissions`)}>Respostas</Button>
              <Button variant="secondary" disabled={loading || saving} onClick={() => save()}>Salvar</Button>
              <Button loading={saving} disabled={loading} onClick={() => save(true)}>{data?.form.isLive ? 'Salvar e publicar' : 'Publicar formulário'} ↗</Button>
            </div>
          </div>
          {data?.form.isLive && <div className="share">Pronto para compartilhar. <a href={`/form/${data.form.id}`} target="_blank" rel="noreferrer">Abrir formulário publicado ↗</a></div>}
          <div className="editor-grid">
            <Form className="editor-panel" name="form-builder" id="form-builder" form={form} layout="vertical" onFinish={() => save()} onFinishFailed={invalid} onValuesChange={sync}>
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} fullWidth />
            </Form>
            <LivePreview form={preview} />
          </div>
        </Builder>
      )}
    </AdminStructure>
  )
}
export default withAuth(Index, ['admin'])
