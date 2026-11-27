import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Logo } from '../ui/logo'
import { Button, useToast } from '../../src/components/primitives'
import { useMeQuery } from '../../graphql/query/me.query'
import { useCompleteOnboardingMutation } from '../../graphql/mutation/complete.onboarding.mutation'
import { TemplateChooser } from '../form/starter/template.chooser'

const Welcome = styled.main`
  min-height: 100vh; background: var(--omf-color-surface); padding: 32px clamp(20px, 5vw, 72px);
  header { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
  header > span { color: var(--omf-color-text-muted); font-size: 12px; }
  section { max-width: 640px; margin: clamp(40px, 8vh, 90px) auto; }
  .eyebrow { color: var(--omf-color-primary-600); letter-spacing: 1.8px; font-size: 11px; font-weight: 600; }
  h1 { font-size: clamp(30px, 4vw, 42px); line-height: 1.2; font-weight: 600; letter-spacing: -1.5px; margin: 16px 0; }
  .intro { color: var(--omf-color-text-secondary); font-size: 15px; line-height: 1.8; }
  .actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 24px; }
  .footnote { margin-top: 24px; font-size: 12px; color: var(--omf-color-text-muted); }
`
const Onboarding: React.FC = () => {
  const router = useRouter()
  const { data, refetch } = useMeQuery()
  const [template, setTemplate] = useState('feedback')
  const [saving, setSaving] = useState(false)
  const [complete] = useCompleteOnboardingMutation()
  const { addToast } = useToast()
  const finish = async (destination: string) => {
    if (saving) return
    setSaving(true)
    try {
      await complete()
      await refetch()
      await router.replace(destination)
    } catch (error) {
      addToast({ type: 'error', title: 'Não foi possível continuar', description: error instanceof Error ? error.message : 'Tente novamente.' })
    } finally { setSaving(false) }
  }
  return (
    <Welcome>
      <header><Logo /><span>Seu primeiro formulário começa aqui</span></header>
      <section>
        <span className="eyebrow">BEM-VINDO AO SEU ESPAÇO</span>
        <h1>Olá, {data?.me.username || 'que bom ter você aqui'}.<br />O que vamos criar?</h1>
        <p className="intro">Escolha o que você precisa. Preparamos as primeiras perguntas e você deixa tudo com a sua cara.</p>
        <TemplateChooser value={template} onChange={setTemplate} />
        <div className="actions">
          <Button loading={saving} onClick={() => finish(`/admin/forms/create?template=${template}`)}>Vamos começar →</Button>
          <Button variant="ghost" disabled={saving} onClick={() => finish('/admin')}>Explorar primeiro</Button>
        </div>
        <p className="footnote">Sem configurações complicadas. Você pode mudar tudo depois.</p>
      </section>
    </Welcome>
  )
}
export default Onboarding
