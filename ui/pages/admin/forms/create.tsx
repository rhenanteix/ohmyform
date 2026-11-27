import { Form } from 'antd'
import { AdminStructure } from 'components/admin/structure'
import { withAuth } from 'components/with.auth'
import { useFormCreateMutation } from 'graphql/mutation/form.create.mutation'
import { useFormUpdateMutation } from 'graphql/mutation/form.update.mutation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Button, Input, useToast } from 'src/components/primitives'
import { languages } from '../../../i18n'
import { TemplateChooser } from '../../../components/form/starter/template.chooser'
import { formTemplates, templateFields } from '../../../components/form/starter/templates'

const CreateCanvas = styled.div`
  max-width: 720px; margin: 16px auto 48px;
  .eyebrow { font-size: 11px; letter-spacing: 1.6px; color: var(--omf-color-primary-600); font-weight: 600; }
  h1 { font-size: clamp(28px, 4vw, 38px); letter-spacing: -1.3px; line-height: 1.2; font-weight: 600; margin: 14px 0; }
  .intro { color: var(--omf-color-text-secondary); font-size: 15px; line-height: 1.7; }
  .creation-form { padding: 28px; background: var(--omf-color-surface); border: 1px solid var(--omf-color-border); border-radius: 14px; }
  .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
  .note { font-size: 12px; color: var(--omf-color-text-muted); margin-top: 20px; }
`
const Create: NextPage = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  const [template, setTemplate] = useState('blank')
  const createdId = useRef<string>()
  const [create] = useFormCreateMutation()
  const [update] = useFormUpdateMutation()
  const { addToast } = useToast()
  const locale = i18n.language.replace('-', '_')
  const language = languages.includes(locale) ? locale : locale.startsWith('pt') ? 'pt_BR' : 'en'
  const choose = (id: string) => {
    setTemplate(id)
    form.setFieldsValue({ title: formTemplates.find(item => item.id === id)?.title || '' })
  }
  useEffect(() => {
    if (router.isReady && formTemplates.some(item => item.id === router.query.template)) choose(router.query.template as string)
  }, [router.isReady, router.query.template])

  const save = async ({ title }: { title: string }) => {
    if (saving) return
    setSaving(true)
    try {
      if (!createdId.current) {
        const result = await create({ variables: { form: {
          title: title.trim(), language, layout: 'card', isLive: false, showFooter: true, anonymousSubmission: true,
          endPage: { show: true, title: t('form:submitted'), buttonText: t('form:restart') },
        } } })
        if (!result.data?.form?.id) throw new Error('Não foi possível criar o formulário.')
        createdId.current = result.data.form.id
      }
      const fields = templateFields(template)
      if (fields.length) await update({ variables: { form: { id: createdId.current, title: title.trim(), fields } } })
      addToast({ type: 'success', title: 'Seu rascunho está pronto. Vamos às perguntas!' })
      await router.replace(`/admin/forms/${createdId.current}`)
    } catch (error) {
      addToast({ type: 'error', title: createdId.current ? 'O rascunho foi criado, mas o modelo não foi aplicado. Tente novamente.' : t('form:creationError'), description: error instanceof Error ? error.message : 'Tente novamente.' })
    } finally { setSaving(false) }
  }
  return (
    <AdminStructure selected="forms" padded={false} breadcrumbs={[{ href: '/admin/forms', name: 'Meus formulários' }, { name: 'Novo formulário' }]}>
      <CreateCanvas>
        <span className="eyebrow">DA IDEIA À PRIMEIRA RESPOSTA</span>
        <h1>Comece uma nova conversa.</h1>
        <p className="intro">Escolha um ponto de partida. Nós cuidamos do básico para você focar nas perguntas.</p>
        <fieldset disabled={saving || !!createdId.current} style={{ border: 0, padding: 0, minWidth: 0 }}>
          <TemplateChooser value={template} onChange={choose} />
        </fieldset>
        <Form name="create-form" id="create-form" form={form} layout="vertical" onFinish={save} className="creation-form">
          <Form.Item label="Como vamos chamar seu formulário?" name="title" rules={[{ required: true, whitespace: true, message: 'Dê um nome para o seu formulário.' }]}>
            <Input placeholder="Ex.: Feedback dos nossos clientes" maxLength={200} autoComplete="off" disabled={saving} />
          </Form.Item>
          <div className="actions">
            <Button type="submit" loading={saving}>Criar e editar perguntas →</Button>
            <Button variant="ghost" disabled={saving} onClick={() => router.push('/admin/forms')}>Voltar</Button>
          </div>
          <p className="note">Seu formulário começa como rascunho. Só será publicado quando você decidir.</p>
        </Form>
      </CreateCanvas>
    </AdminStructure>
  )
}
export default withAuth(Create, ['admin'])
