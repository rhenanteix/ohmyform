// Run with: node tests/editor-regressions.cjs (from ui).
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true, target: ts.ScriptTarget.ES2019 },
      fileName: filename,
    })
    module._compile(result.outputText, filename)
  }
}
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const { Table } = require('../src/components/primitives/Table')
const { Switch } = require('../src/components/primitives/Switch')
const { Button } = require('../src/components/primitives/Button')
const { Tabs } = require('../src/components/primitives/Tabs')
const { editorData, updateInput } = require('../components/form/admin/form.data')
const { templateFields } = require('../components/form/starter/templates')
const { MUTATION } = require('../graphql/mutation/complete.onboarding.mutation')
const { buildSchema, validate } = require('graphql')

const table = renderToStaticMarkup(React.createElement(Table, {
  keyAccessor: 'id', data: [{ id: '1', title: 'Pesquisa', nested: { id: 'owner' } }],
  columns: [
    { key: 'title', header: 'Título', accessor: row => React.createElement('a', { href: '/edit/1' }, row.title) },
    { key: 'action', header: 'Ação', accessor: () => React.createElement('button', { type: 'button' }, 'Editar') },
    { key: 'nested', header: 'Objeto sem renderizador', accessor: 'nested' },
  ],
}))
assert(table.includes('href="/edit/1"'))
assert(table.includes('>Editar</button>'))
assert(!table.includes('[object Object]'))
assert.match(renderToStaticMarkup(React.createElement(Switch, { checked: true, onChange() {} })), /data-checked="true"/)
assert.match(renderToStaticMarkup(React.createElement(Switch, { checked: false, onChange() {} })), /data-checked="false"/)
assert.match(renderToStaticMarkup(React.createElement(Button, null, 'Adicionar')), /type="button"/)
assert.match(renderToStaticMarkup(React.createElement(Button, { type: 'submit' }, 'Salvar')), /type="submit"/)
const tabs = renderToStaticMarkup(React.createElement(Tabs, { activeTab: 'one', onChange() {}, tabs: [{ id: 'one', label: 'Perguntas', children: 'Conteúdo' }] }))
assert.match(tabs, /type="button"/)
assert(tabs.includes('Conteúdo'))

const source = {
  __typename: 'Form', id: '1', title: 'Pesquisa', created: '2026-11-27', admin: { id: 'u' }, isLive: false,
  design: { __typename: 'Design', layout: 'card', colors: { __typename: 'Colors', button: '#245d4c' } },
  fields: [{ __typename: 'Field', id: 'a', idx: 0, type: 'textfield', title: 'Nome', description: '', required: true, defaultValue: '"Visitante"', logic: [], options: [{ id: 'opt', key: 'limit', value: '10' }] }],
}
const editor = editorData(source)
assert.equal(editor.fields[0].defaultValue, 'Visitante')
assert.equal(editor.fields[0].optionKeys.limit, 10)
const first = updateInput(editor)
const second = updateInput(editor)
assert.deepEqual(first, second, 'Repeated saves must not mutate or duplicate options')
assert.equal(first.fields[0].defaultValue, '"Visitante"')
assert.equal(first.fields[0].options.length, 1)
assert(!('created' in first)); assert(!('admin' in first)); assert(!JSON.stringify(first).includes('__typename'))
assert.equal(editor.fields[0].options.length, 0, 'Editor state stays unchanged')
for (const id of ['contact', 'feedback', 'event']) {
  const fields = templateFields(id)
  assert.equal(fields.length, 3)
  assert.equal(new Set(fields.map(f => f.id)).size, fields.length)
  assert(fields.every(f => f.title && f.type && Array.isArray(f.options) && Array.isArray(f.logic)))
}
assert.equal(templateFields('blank').length, 0)
const schema = buildSchema('type Query { ok: Boolean } type Profile { id: ID! onboardingCompleted: Boolean! } type Mutation { completeOnboarding: Profile! }')
assert.deepEqual(validate(schema, MUTATION), [], 'Onboarding mutation must not contain unused fragments')
console.log('PASS: React table cells/actions, controlled switches, safe button/tab types, immutable form serialization, templates, onboarding GraphQL validation.')
