import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FormFragment } from '../../../graphql/fragment/form.fragment'
import { Field } from '../layouts/card/field'

const Frame = styled.aside<{ $mobile: boolean }>`
  position: sticky; top: 96px; align-self: start; min-width: 0;
  background: var(--omf-color-surface-tertiary); border: 1px solid var(--omf-color-border); border-radius: 16px; padding: 16px;
  .preview-toolbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; padding: 0 2px 16px; font-size: 12px; color: var(--omf-color-text-secondary); }
  .preview-toolbar button { border: 0; background: transparent; color: inherit; cursor: pointer; padding: 6px; border-radius: 6px; }
  .preview-toolbar button[aria-pressed='true'] { background: var(--omf-color-surface); color: var(--omf-color-text-primary); }
  .preview-screen { width: 100%; max-width: ${p => p.$mobile ? '320px' : '100%'}; margin: auto; min-height: 460px; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; justify-content: center; transition: max-width 200ms; }
  .preview-screen h1 { font-size: 25px; }
  .preview-screen input, .preview-screen textarea, .preview-screen button { font-family: inherit; }
  .preview-screen .ant-form-item { margin-bottom: 10px; }
  .preview-action { border: 0; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; margin: 0 24px 24px; }
  .preview-note { text-align: center; font-size: 11px; color: var(--omf-color-text-muted); padding-top: 14px; }
  @media(max-width: 1100px) { position: static; }
`
export const LivePreview: React.FC<{ form: FormFragment }> = ({ form }) => {
  const [mobile, setMobile] = useState(false)
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [previewForm] = Form.useForm()
  const fields = (form?.fields || []).filter(field => field.type !== 'hidden')
  const field = fields[Math.min(index, Math.max(fields.length - 1, 0))]
  const colors = { background: '#fcfbf7', question: '#233c35', answer: '#245d4c', button: '#245d4c', buttonActive: '#183f34', buttonText: '#ffffff', ...form?.design?.colors }
  const design = { ...form?.design, colors }
  useEffect(() => { previewForm.resetFields() }, [field?.id, previewForm])
  const restart = () => { setIndex(0); setDone(false); previewForm.resetFields() }
  return (
    <Frame $mobile={mobile} aria-label="Prévia interativa do formulário">
      <div className="preview-toolbar">
        <strong>◉ Prévia ao vivo</strong>
        <div><button type="button" aria-pressed={!mobile} onClick={() => setMobile(false)}>Desktop</button><button type="button" aria-pressed={mobile} onClick={() => setMobile(true)}>Celular</button><button type="button" onClick={restart} aria-label="Reiniciar prévia">↻</button></div>
      </div>
      <div className="preview-screen" style={{ background: colors.background, color: colors.question, fontFamily: design.font || 'Inter, sans-serif' }}>
        {field && !done ? (
          <Form form={previewForm} onFinish={() => index < fields.length - 1 ? setIndex(index + 1) : setDone(true)}>
            <div style={{ padding: '24px 24px 0', color: colors.answer, fontSize: 12 }}>{Math.min(index + 1, fields.length)} de {fields.length}</div>
            <Field key={field.id} field={{ ...field, title: field.title || 'Sua pergunta aparece aqui', defaultValue: field.defaultValue == null ? null : JSON.stringify(field.defaultValue) }} design={design} />
            <button className="preview-action" type="submit" style={{ background: colors.button, color: colors.buttonText }}>{index < fields.length - 1 ? 'Continuar →' : 'Concluir ✓'}</button>
          </Form>
        ) : (
          <div style={{ padding: 40, textAlign: 'center' }}><span style={{ fontSize: 36 }}>✦</span><h3 style={{ color: colors.question, marginTop: 20 }}>{done ? 'Tudo certo! Assim termina a sua conversa.' : 'Sua ideia, ganhando forma.'}</h3><p>{done ? 'Esta foi uma simulação. Nenhuma resposta foi enviada.' : 'Adicione uma pergunta para experimentar o formulário.'}</p></div>
        )}
      </div>
      <div className="preview-note">Teste as perguntas aqui. A prévia não envia respostas.</div>
    </Frame>
  )
}
