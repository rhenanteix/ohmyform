import { FormFragment } from '../../../graphql/fragment/form.fragment'
import { cleanInput } from '../../clean.input'

const parse = (value: string) => {
  if (!value) return null
  try { return JSON.parse(value) } catch { return value }
}
export const editorData = (form: FormFragment): FormFragment => ({
  ...form,
  fields: (form.fields || []).map(field => ({
    ...field,
    defaultValue: parse(field.defaultValue),
    options: (field.options || []).filter(option => !option.key),
    optionKeys: Object.fromEntries((field.options || []).filter(option => option.key).map(option => [option.key, parse(option.value)])),
  })).sort((a, b) => a.idx - b.idx),
})

export const updateInput = (form: FormFragment) => cleanInput({
  id: form.id, title: form.title, language: form.language,
  isLive: form.isLive, anonymousSubmission: form.anonymousSubmission, showFooter: form.showFooter,
  design: form.design, startPage: form.startPage, endPage: form.endPage,
  hooks: form.hooks || [], notifications: form.notifications || [],
  fields: (form.fields || []).filter(field => field?.type).map(({ optionKeys, ...field }, idx) => ({
    ...field, idx,
    defaultValue: field.defaultValue == null ? null : JSON.stringify(field.defaultValue),
    options: [
      ...(field.options || []),
      ...Object.entries(optionKeys || {}).filter(([, value]) => value !== undefined).map(([key, value]) => ({ id: null, key, value: JSON.stringify(value) })),
    ],
  })),
})
