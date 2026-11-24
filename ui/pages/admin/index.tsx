import { useQuery } from '@apollo/client'
import { FiArrowRight, FiUsers, FiActivity, FiFileText } from 'react-icons/fi'
import styled from 'styled-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Grid } from '../../components/ui'
import { withAuth } from '../../components/with.auth'
import {
  ADMIN_STATISTIC_QUERY,
  AdminStatisticQueryData,
  AdminStatisticQueryVariables,
} from '../../graphql/query/admin.statistic.query'

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  position: relative;
`

const HeaderSection = styled.div`
  margin-bottom: 32px;
`

const WelcomeText = styled.h1`
  font-size: 32px;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
`

const SubtitleText = styled.p`
  font-size: 16px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
`

const StatsGrid = styled(Grid)`
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StatCard = styled(Card)<{ color: string; iconColor: string }>`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--omf-shadow-sm);
  background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
  border: 1px solid var(--omf-border);
  transition: var(--omf-transition);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--omf-shadow);
    border-color: transparent;
  }

  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: ${({ iconColor }) => iconColor + '1a'};
    color: ${({ iconColor }) => iconColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .stat-label {
    font-size: 12px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-top: 4px;
  }

  .stat-value {
    font-size: 34px;
    font-weight: 900;
    color: #0f172a;
    line-height: 1;
  }
`

const ActionsSection = styled.div`
  margin-top: 40px;
`

const ActionsTitle = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 16px;
`

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`

const ActionCard = styled(Card)<{ as?: string; href?: string }>`
  border: none;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  box-shadow: var(--omf-shadow-sm);
  background: #fff;
  border: 1px solid var(--omf-border);
  transition: var(--omf-transition);
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--omf-shadow);
    border-color: #8B5CF6;
  }

  .action-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #f0f9ff;
    color: #8B5CF6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .action-title {
    font-size: 15px;
    font-weight: 800;
    color: #0f172a;
  }

  .action-desc {
    font-size: 13px;
    color: #64748b;
    margin-top: 2px;
  }
`

const stats = [
  {
    label: 'admin:totalForms',
    key: 'forms.total',
    color: '#8B5CF6',
    iconColor: '#8B5CF6',
    icon: <FiFileText size={18} />,
  },
  {
    label: 'admin:totalUsers',
    key: 'users.total',
    color: '#EC4899',
    iconColor: '#EC4899',
    icon: <FiUsers size={18} />,
  },
  {
    label: 'admin:totalSubmissions',
    key: 'submissions.total',
    color: '#F59E0B',
    iconColor: '#F59E0B',
    icon: <FiActivity size={18} />,
  },
]

const Index = () => {
  const { t } = useTranslation()
  const { data } = useQuery<AdminStatisticQueryData, AdminStatisticQueryVariables>(
    ADMIN_STATISTIC_QUERY
  )

  return (
    <DashboardContainer>
      <HeaderSection>
        <WelcomeText>{t('admin:welcome')}</WelcomeText>
        <SubtitleText>
          Acompanhe o que está acontecendo na sua plataforma em tempo real.
        </SubtitleText>
      </HeaderSection>

      <StatsGrid>
        {stats.map((s) => {
          const value = data
            ? (s.key.split('.').reduce((o: any, k: string): any => (o ? o[k] : undefined), data) as number)
            : 0
          return (
            <StatCard
              key={s.label}
              color={s.color}
              iconColor={s.color}
              hover
              padding="20px 24px"
            >
              <div className="stat-header">
                <div>
                  <span className="stat-label">{t(s.label)}</span>
                  <div className="stat-value">{value}</div>
                </div>
                <div className="stat-icon">{s.icon}</div>
              </div>
            </StatCard>
          )
        })}
      </StatsGrid>

      <ActionsSection>
        <ActionsTitle>Ações rápidas</ActionsTitle>
        <ActionsGrid>
          <ActionCard as="a" href="/admin/forms/create">
            <div className="action-icon">+</div>
            <div>
              <div className="action-title">Criar formulário</div>
              <div className="action-desc">Comece um novo formulário em poucos cliques</div>
            </div>
          </ActionCard>
          <ActionCard as="a" href="/admin/forms">
            <div className="action-icon">📋</div>
            <div>
              <div className="action-title">Meus formulários</div>
              <div className="action-desc">Gerencie todos os seus formulários</div>
            </div>
          </ActionCard>
          <ActionCard as="a" href="/admin/users">
            <div className="action-icon">👥</div>
            <div>
              <div className="action-title">Usuários</div>
              <div className="action-desc">Gerencie os usuários da plataforma</div>
            </div>
          </ActionCard>
        </ActionsGrid>

        <div style={{ marginTop: 24 }}>
          <a
            href="/admin/forms"
            style={{
              color: '#8B5CF6',
              fontWeight: 700,
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
            }}
          >
            Ver todos os formulários <FiArrowRight size={14} />
          </a>
        </div>
      </ActionsSection>
    </DashboardContainer>
  )
}

export default withAuth(Index, ['admin'])
