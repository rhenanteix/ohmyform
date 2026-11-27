import React, { useState } from 'react'
import { Alert, Popconfirm } from 'antd'
import styled from 'styled-components'
import { FiFileText, FiGrid, FiList, FiSearch, FiTrash2 } from 'react-icons/fi'
import { AdminStructure } from 'components/admin/structure'
import { withAuth } from 'components/with.auth'
import { Button, Input, Select, Badge, Table, useToast } from 'src/components/primitives'
import { useFormPagerQuery } from '../../../graphql/query/form.pager.query'
import { useFormDeleteMutation } from '../../../graphql/mutation/form.delete.mutation'
import { FormPagerFragment } from '../../../graphql/fragment/form.pager.fragment'

const Workspace = styled.div`
  .workspace-heading, .workspace-tools { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 28px; }
  h1 { font-size: 30px; font-weight: 600; letter-spacing: -1px; margin: 0 0 8px; }
  .subtitle { color: var(--omf-color-text-secondary); margin: 0; font-size: 14px; }
  .workspace-tools { margin-top: 36px; padding-bottom: 20px; border-bottom: 1px solid var(--omf-color-border); }
  .filters { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  .view-toggle { display: flex; border: 1px solid var(--omf-color-border); border-radius: 9px; padding: 3px; }
  .view-toggle button { padding: 7px 10px; border: 0; background: transparent; color: var(--omf-color-text-muted); cursor: pointer; border-radius: 6px; }
  .view-toggle button[aria-pressed='true'] { background: var(--omf-color-surface); color: var(--omf-color-text-primary); box-shadow: var(--omf-shadow-sm); }
  .empty { text-align: center; padding: 80px 20px; }
  .empty-icon { display: grid; place-items: center; margin: auto auto 24px; width: 78px; height: 78px; border-radius: 22px; background: #eaf0e3; color: #245d4c; transform: rotate(-6deg); font-size: 32px; }
  .empty h2 { font-size: 24px; margin-bottom: 12px; font-weight: 600; }
  .empty p { color: var(--omf-color-text-secondary); margin-bottom: 24px; }
  .form-link { display: flex; align-items: center; gap: 14px; color: var(--omf-color-text-primary); font-weight: 500; }
  .form-icon { display: grid; place-items: center; width: 38px; height: 42px; border-radius: 9px; background: var(--omf-color-primary-50); color: var(--omf-color-primary-600); flex-shrink: 0; }
  .row-actions { display: flex; align-items: center; gap: 16px; font-size: 12px; }
  .row-actions a { color: var(--omf-color-text-secondary); }
  .delete { display: grid; place-items: center; border: 0; background: transparent; color: var(--omf-color-text-muted); padding: 8px; cursor: pointer; }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
  .form-card { background: var(--omf-color-surface); border: 1px solid var(--omf-color-border); border-radius: 14px; overflow: hidden; }
  .card-art { min-height: 130px; display: grid; place-items: center; background: var(--omf-color-primary-50); color: var(--omf-color-primary-600); font-size: 40px; }
  .card-body { padding: 20px; }
  .card-body h2 { font-size: 16px; margin: 0 0 12px; overflow-wrap: anywhere; }
  .card-body .row-actions { margin-top: 20px; }
  .pagination { display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 24px; font-size: 13px; }
  @media(max-width: 600px) { .workspace-heading > a { width: 100%; } .filters { width: 100%; } .cards { grid-template-columns: 1fr; } }
`
const FormsPage = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [view, setView] = useState('list')
  const [deleting, setDeleting] = useState<string>()
  const { data, loading, error, refetch } = useFormPagerQuery({ variables: { start: (page - 1) * 25, limit: 25 } })
  const [remove] = useFormDeleteMutation()
  const { addToast } = useToast()
  const entries = (data?.pager.entries || []).filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && (status === 'all' || item.isLive === (status === 'live')))
  const filtered = !!search || status !== 'all'
  const deleteForm = async (id: string) => {
    setDeleting(id)
    try {
      await remove({ variables: { id } })
      if (data?.pager.entries.length === 1 && page > 1) setPage(page - 1)
      else await refetch()
      addToast({ type: 'success', title: 'Formulário excluído.' })
    } catch { addToast({ type: 'error', title: 'Não foi possível excluir. Tente novamente.' }) }
    finally { setDeleting(undefined) }
  }
  const actions = (item: FormPagerFragment) => (
    <div className="row-actions">
      <a href={`/admin/forms/${item.id}`}>Editar</a><a href={`/admin/forms/${item.id}/submissions`}>Respostas</a>
      <Popconfirm title="Excluir este formulário e suas respostas?" okText="Excluir" cancelText="Cancelar" okButtonProps={{ danger: true }} onConfirm={() => deleteForm(item.id)}>
        <button className="delete" type="button" disabled={deleting === item.id} aria-label={`Excluir ${item.title}`}><FiTrash2 /></button>
      </Popconfirm>
    </div>
  )
  return (
    <AdminStructure selected="forms" padded={false}>
      <Workspace>
        <div className="workspace-heading"><div><h1>Meus formulários</h1><p className="subtitle">Um espaço para suas ideias. E para as respostas que vêm depois.</p></div><Button as="a" href="/admin/forms/create">+ Criar formulário</Button></div>
        {error && <Alert type="error" message="Não foi possível carregar seus formulários." action={<Button variant="ghost" onClick={() => refetch()}>Tentar novamente</Button>} />}
        <div className="workspace-tools">
          <div className="filters"><Input aria-label="Buscar formulários nesta página" placeholder="Buscar nesta página…" leftIcon={<FiSearch />} value={search} onChange={e => setSearch(e.target.value)} fullWidth={false} />
            <Select aria-label="Filtrar por status" fullWidth={false} value={status} onChange={e => setStatus(e.target.value)} options={[{ value: 'all', label: 'Todos os status' }, { value: 'live', label: 'Publicados' }, { value: 'draft', label: 'Rascunhos' }]} /></div>
          <div className="view-toggle"><button aria-label="Ver em lista" aria-pressed={view === 'list'} onClick={() => setView('list')}><FiList /></button><button aria-label="Ver em cartões" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><FiGrid /></button></div>
        </div>
        {!loading && !error && !entries.length ? (
          <div className="empty"><div className="empty-icon"><FiFileText /></div><h2>{filtered ? 'Nenhum formulário por aqui.' : 'Sua primeira conversa está por vir.'}</h2><p>{filtered ? 'Experimente outro nome ou limpe os filtros.' : 'Comece com um modelo pronto ou dê vida a uma ideia do zero.'}</p>
            {filtered ? <Button variant="secondary" onClick={() => { setSearch(''); setStatus('all') }}>Limpar filtros</Button> : <Button as="a" href="/admin/forms/create">+ Criar meu primeiro formulário</Button>}
          </div>
        ) : view === 'grid' && !loading ? (
          <div className="cards">{entries.map(item => <article className="form-card" key={item.id}><a href={`/admin/forms/${item.id}`} className="card-art" aria-label={`Editar ${item.title}`}><FiFileText /></a><div className="card-body"><h2><a href={`/admin/forms/${item.id}`}>{item.title}</a></h2><Badge variant={item.isLive ? 'success' : 'draft'}>{item.isLive ? 'Publicado' : 'Rascunho'}</Badge>{actions(item)}</div></article>)}</div>
        ) : (
          <Table data={entries} keyAccessor="id" loading={loading} columns={[
            { key: 'title', header: 'Formulário', accessor: item => <a className="form-link" href={`/admin/forms/${item.id}`}><span className="form-icon"><FiFileText /></span>{item.title}</a> },
            { key: 'status', header: 'Status', accessor: item => <Badge variant={item.isLive ? 'success' : 'draft'}>{item.isLive ? 'Publicado' : 'Rascunho'}</Badge> },
            { key: 'date', header: 'Atualizado em', accessor: item => new Date(item.lastModified || item.created).toLocaleDateString('pt-BR') },
            { key: 'actions', header: 'Ações', accessor: actions },
          ]} />
        )}
        {(data?.pager.total || 0) > 25 && <div className="pagination"><Button variant="secondary" disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>← Anterior</Button><span>Página {page} de {Math.ceil(data.pager.total / 25)}</span><Button variant="secondary" disabled={page * 25 >= data.pager.total || loading} onClick={() => setPage(page + 1)}>Próxima →</Button></div>}
      </Workspace>
    </AdminStructure>
  )
}
export default withAuth(FormsPage, ['admin'])
