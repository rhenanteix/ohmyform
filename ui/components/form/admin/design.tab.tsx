import { Form } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { InputColor } from '../../input/color'
import { Select } from 'src/components/primitives'

const presets = [
  { name: 'Natural', background: '#fcfbf7', question: '#233c35', answer: '#245d4c', button: '#245d4c', buttonActive: '#183f34', buttonText: '#ffffff' },
  { name: 'Lavanda', background: '#f7f4fc', question: '#35264f', answer: '#68479c', button: '#68479c', buttonActive: '#4d3278', buttonText: '#ffffff' },
  { name: 'Oceano', background: '#f0f7fc', question: '#16324f', answer: '#245c89', button: '#245c89', buttonActive: '#163d60', buttonText: '#ffffff' },
]

export const DesignTab: React.FC<TabPaneProps & { onDesignChange?: () => void }> = ({ onDesignChange }) => {
  const { t } = useTranslation()
  return (
    <>
      <Form.Item noStyle shouldUpdate>
        {(form) => {
          const design = form.getFieldValue(['form', 'design']) || {}
          const colors = { ...presets[0], ...design.colors }
          return (
            <section style={{ marginBottom: 32 }} aria-label="Estilos do formulário">
              <h3>Um estilo para cada conversa</h3>
              <p>Escolha uma paleta e personalize os detalhes. Salve para aplicar ao formulário.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '20px 0' }}>
                {presets.map(({ name, ...palette }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => { form.setFieldsValue({ form: { design: { colors: palette, font: 'Inter, sans-serif' } } }); onDesignChange?.() }}
                    style={{ padding: '16px 24px', borderRadius: 12, border: `1px solid ${palette.answer}`, background: palette.background, color: palette.question, cursor: 'pointer', fontWeight: 600 }}
                  >{name} <span aria-hidden="true" style={{ color: palette.button }}>●</span></button>
                ))}
              </div>
              <div style={{ background: colors.background, border: `1px solid ${colors.answer}`, borderRadius: 16, padding: 'clamp(20px, 4vw, 40px)', fontFamily: design.font || 'Inter, sans-serif' }}>
                <span style={{ color: colors.answer, fontSize: 12 }}>PRÉVIA DO ESTILO</span>
                <h2 style={{ color: colors.question, fontFamily: 'inherit', margin: '16px 0', fontSize: 28 }}>Como podemos ajudar você?</h2>
                <div style={{ color: colors.answer, borderBottom: `1px solid ${colors.answer}`, padding: '12px 0', marginBottom: 24 }}>Sua resposta aqui…</div>
                <span style={{ display: 'inline-block', background: colors.button, color: colors.buttonText, borderRadius: 8, padding: '12px 24px' }}>Continuar →</span>
              </div>
            </section>
          )
        }}
      </Form.Item>
      <Form.Item label={t('form:design.font')} name={['form', 'design', 'font']}>
        <Select options={[
          { value: 'Inter, sans-serif', label: 'Inter — moderna' },
          { value: 'Georgia, serif', label: 'Georgia — editorial' },
          { value: 'Arial, sans-serif', label: 'Arial — clássica' },
        ]} />
      </Form.Item>
      <Form.Item label={t('form:design.layouts')} name={['form', 'design', 'layout']}>
        <Select options={[
          { value: 'slider', label: t('form:design.layout.slider') },
          { value: 'card', label: t('form:design.layout.card') },
        ]} />
      </Form.Item>
      {['background', 'question', 'answer', 'button', 'buttonActive', 'buttonText'].map((name) => (
        <Form.Item key={name} label={t(`form:design.color.${name}`)} name={['form', 'design', 'colors', name]}>
          <InputColor />
        </Form.Item>
      ))}
    </>
  )
}
