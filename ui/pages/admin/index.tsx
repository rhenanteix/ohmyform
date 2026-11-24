import { useQuery } from '@apollo/client'
import { FiArrowRight } from 'react-icons/fi'
import styled from 'styled-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Container, Grid, PageSubtitle, PageTitle } from '../../components/ui'
import { withAuth } from '../../components/with.auth'
import {
  ADMIN_STATISTIC_QUERY,
  AdminStatisticQueryData,
  AdminStatisticQueryVariables,
} from '../../graphql/query/admin.statistic.query'

const stats = [
  { label: 'admin:totalForms', key: 'forms.total', color: '#8B5CF6' },
  { label: 'admin:totalUsers', key: 'users.total', color: '#EC4899' },
  { label: 'admin:totalSubmissions', key: 'submissions.total', color: '#F59E0B' },
]

const StatCard = styled(Card)<{ color: string }>`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: var(--omf-shadow-sm);
  .stat-value {
    font-size: 30px;
    font-weight: 900;
    color: #0f172a;
  }
  .stat-label {
    font-size: 13px;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .stat-color-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ color }) => color};
    box-shadow: 0 0 12px ${({ color }) => color}80;
  }
`

const Index = () => {
  const { t } = useTranslation()
  const { data } = useQuery<AdminStatisticQueryData, AdminStatisticQueryVariables>(
    ADMIN_STATISTIC_QUERY
  )

  return (
    <Container maxWidth="1200px" paddingY="32px">
      <PageTitle>{t('admin:home')}</PageTitle>
      <PageSubtitle>
        Seu painel de controle. Veja em um glance quantos formulários, usuários e respostas
        você tem na plataforma.
      </PageSubtitle>
      <Grid cols="1fr" gap="20px">
        {stats.map((s) => {
          const value = data
            ? (s.key.split('.').reduce((o: any, k: string): any => (o ? o[k] : undefined), data) as number)
            : 0
          return (
            <StatCard key={s.label} color={s.color} hover padding="20px 24px">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="stat-color-dot" />
                <span className="stat-label">{t(s.label)}</span>
              </div>
              <div className="stat-value">{value}</div>
            </StatCard>
          )
        })}
      </Grid>
      <a href="/admin/forms" style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, textDecoration: 'none' }}>
        Ver todos os formulários <FiArrowRight size={14} />
      </a>
    </Container>
  )
}

export default withAuth(Index, ['admin'])
