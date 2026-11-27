import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FaSlack, FaGoogle, FaGithub } from 'react-icons/fa'
import { SiZapier } from 'react-icons/si'

const Wrap = styled.section`padding:80px 24px;`
const Title = styled.h2`font-size:clamp(28px,4vw,44px);font-weight:800;text-align:center;margin-bottom:40px;`
const Grid = styled.div`max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;`
const Card = styled.div`padding:20px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;display:flex;gap:12px;align-items:center;`

export const Integrations = () => {
  const { t } = useTranslation('landing')
  const items = [
    { icon: <FaSlack size={24} />, key: 'slack' },
    { icon: <FaGoogle size={24} />, key: 'google' },
    { icon: <FaGithub size={24} />, key: 'github' },
    { icon: <SiZapier size={24} />, key: 'zapier' },
  ]
  return (
    <Wrap>
      <Title>{t('integrations.title')}</Title>
      <Grid>
        {items.map((it) => (
          <Card key={it.key}>
            {it.icon}
            <div>
              <strong>{t(`integrations.${it.key}.name`)}</strong>
              <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>{t(`integrations.${it.key}.desc`)}</p>
            </div>
          </Card>
        ))}
      </Grid>
    </Wrap>
  )
}
export default Integrations
