import React from 'react'
import { useQuery } from '@apollo/client'
import { Alert, Skeleton } from 'antd'
import {
  FiFileText,
  FiUsers,
  FiArrowRight,
  FiPlus,
  FiMessageSquare,
  FiArrowUpRight,
} from 'react-icons/fi'
import styled from 'styled-components'
import { AdminStructure } from '../../components/admin/structure'
import { withAuth } from '../../components/with.auth'
import {
  ADMIN_STATISTIC_QUERY,
  AdminStatisticQueryData,
} from '../../graphql/query/admin.statistic.query'
import { useFormPagerQuery } from '../../graphql/query/form.pager.query'

const DashboardView = styled.div`
  .welcome {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }
  .overline {
    color: var(--omf-color-text-muted);
    font-size: 11px;
    letter-spacing: 1.4px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  h1 {
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 600;
    letter-spacing: -1.2px;
    color: var(--omf-color-text-primary);
    margin: 0 0 8px;
  }
  p {
    color: var(--omf-color-text-secondary);
    font-size: 14px;
    margin: 0;
    line-height: 1.7;
  }
  .primary-action {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 18px;
    background: #245d4c;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-bottom: 30px;
  }
  .stat {
    border: 1px solid var(--omf-color-border);
    border-radius: 12px;
    background: var(--omf-color-surface);
    padding: 23px;
  }
  .stat-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: var(--omf-color-text-secondary);
    font-size: 12px;
  }
  .stat-label svg {
    width: 34px;
    height: 34px;
    padding: 8px;
    border-radius: 9px;
    background: var(--omf-color-primary-50);
    color: var(--omf-color-primary-700);
  }
  .stat strong {
    display: block;
    margin-top: 12px;
    font-size: 34px;
    letter-spacing: -1px;
    font-weight: 600;
    line-height: 1.2;
  }
  .workspace {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 24px;
    align-items: start;
  }
  .panel {
    border: 1px solid var(--omf-color-border);
    background: var(--omf-color-surface);
    border-radius: 12px;
    overflow: hidden;
  }
  .panel-heading {
    padding: 22px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid var(--omf-color-border);
  }
  h2 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: var(--omf-color-text-primary);
  }
  .panel-heading a {
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .form-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    border-bottom: 1px solid var(--omf-color-border-muted);
    color: var(--omf-color-text-primary);
    transition: background 0.2s;
  }
  .form-row:hover {
    background: var(--omf-color-surface-secondary);
  }
  .form-icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 44px;
    background: var(--omf-color-primary-50);
    border-radius: 8px;
    color: var(--omf-color-primary-700);
    flex-shrink: 0;
  }
  .form-info {
    flex: 1;
    min-width: 0;
  }
  .form-info strong {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
  }
  .form-info small {
    color: var(--omf-color-text-muted);
    font-size: 11px;
  }
  .status {
    font-size: 10px;
    color: var(--omf-color-text-secondary);
    background: var(--omf-color-surface-secondary);
    padding: 4px 8px;
    border-radius: 20px;
  }
  .status.live {
    color: var(--omf-color-primary-700);
    background: var(--omf-color-primary-50);
  }
  .empty {
    padding: 56px 24px;
    text-align: center;
  }
  .empty > svg {
    font-size: 32px;
    color: var(--omf-color-primary-600);
    margin-bottom: 18px;
  }
  .empty h2 {
    margin-bottom: 10px;
  }
  .empty p {
    max-width: 320px;
    margin: 0 auto 22px;
    font-size: 13px;
  }
  .guide {
    background: #eaf0e3;
    border: 1px solid #dce5d4;
    border-radius: 12px;
    padding: 28px;
    color: #233c35;
  }
  .guide h2 {
    font-size: 25px;
    letter-spacing: -0.8px;
    line-height: 1.25;
    color: #233c35;
    margin: 20px 0 12px;
  }
  .guide p {
    color: #657363;
    font-size: 12px;
  }
  .guide > span {
    font-size: 40px;
    color: #708e5e;
  }
  .guide ol {
    padding-left: 20px;
    margin: 22px 0;
    font-size: 12px;
    line-height: 2.8;
    color: #52664b;
  }
  .guide a {
    color: #245d4c;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    gap: 8px;
    align-items: center;
  }
  .tip {
    border-top: 1px solid #cdd9c5;
    padding-top: 20px;
    margin-top: 24px;
  }
  @media (max-width: 1100px) {
    .workspace {
      grid-template-columns: 1fr;
    }
    .guide {
      max-width: none;
    }
  }
  @media (max-width: 600px) {
    .stats {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .stat {
      padding: 18px;
    }
    .stat strong {
      font-size: 28px;
    }
    .panel-heading,
    .form-row {
      padding: 18px;
    }
    .status {
      display: none;
    }
  }
`
const Dashboard = () => {
  const { data, loading, error } = useQuery<AdminStatisticQueryData>(ADMIN_STATISTIC_QUERY)
  const forms = useFormPagerQuery({ variables: { start: 0, limit: 5 } })
  const stats = [
    { label: 'Formulários criados', value: data?.forms.total, icon: <FiFileText /> },
    { label: 'Respostas recebidas', value: data?.submissions.total, icon: <FiMessageSquare /> },
    { label: 'Usuários na plataforma', value: data?.users.total, icon: <FiUsers /> },
  ]
  return (
    <AdminStructure selected="home" padded={false}>
      <DashboardView>
        <div className="welcome">
          <div>
            <div className="overline">SEU ESPAÇO DE TRABALHO</div>
            <h1>Boas ideias começam aqui.</h1>
            <p>Crie, compartilhe e acompanhe suas próximas conversas.</p>
          </div>
          <a className="primary-action" href="/admin/forms/create">
            <FiPlus /> Criar formulário
          </a>
        </div>
        {error && (
          <Alert
            type="error"
            showIcon
            message="Não foi possível carregar os indicadores."
            style={{ marginBottom: 20 }}
          />
        )}
        <div className="stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat-label">
                {stat.label}
                {stat.icon}
              </div>
              {loading ? (
                <Skeleton.Input active size="small" style={{ marginTop: 12 }} />
              ) : (
                <strong>
                  {stat.value === undefined ? '—' : stat.value.toLocaleString('pt-BR')}
                </strong>
              )}
            </div>
          ))}
        </div>
        <div className="workspace">
          <section className="panel">
            <div className="panel-heading">
              <h2>Seus formulários</h2>
              <a href="/admin/forms">
                Ver todos <FiArrowRight />
              </a>
            </div>
            {forms.loading ? (
              <div style={{ padding: 24 }}>
                <Skeleton active />
              </div>
            ) : forms.error ? (
              <Alert type="error" message="Não foi possível carregar os formulários." />
            ) : forms.data?.pager.entries.length ? (
              forms.data.pager.entries.map((form) => (
                <a className="form-row" href={`/admin/forms/${form.id}`} key={form.id}>
                  <span className="form-icon">
                    <FiFileText />
                  </span>
                  <span className="form-info">
                    <strong>{form.title}</strong>
                    <small>
                      {form.language} · {new Date(form.created).toLocaleDateString('pt-BR')}
                    </small>
                  </span>
                  <span className={`status ${form.isLive ? 'live' : ''}`}>
                    {form.isLive ? 'Publicado' : 'Rascunho'}
                  </span>
                  <FiArrowUpRight />
                </a>
              ))
            ) : (
              <div className="empty">
                <FiFileText />
                <h2>Sua primeira ideia merece um formulário.</h2>
                <p>Comece com uma pergunta e descubra o que as pessoas têm para contar.</p>
                <a className="primary-action" href="/admin/forms/create">
                  <FiPlus /> Criar primeiro formulário
                </a>
              </div>
            )}
          </section>
          <aside className="guide">
            <span aria-hidden="true">✳</span>
            <h2>
              Pequenas perguntas.
              <br />
              Grandes descobertas.
            </h2>
            <p>Um bom formulário é uma conversa. Vamos começar?</p>
            <ol>
              <li>Escolha o que você quer descobrir</li>
              <li>Personalize as suas perguntas</li>
              <li>Publique e compartilhe o link</li>
            </ol>
            <a href="/admin/forms/create">
              Tirar uma ideia do papel <FiArrowRight />
            </a>
            <p className="tip">
              Dica: perguntas curtas e claras tornam a experiência mais leve para quem responde.
            </p>
          </aside>
        </div>
      </DashboardView>
    </AdminStructure>
  )
}
export default withAuth(Dashboard, ['admin'])
