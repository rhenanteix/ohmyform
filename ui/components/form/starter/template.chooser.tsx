import React from 'react'
import styled from 'styled-components'
import { formTemplates } from './templates'

const Choices = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 28px 0;
  button {
    text-align: left; padding: 22px; border: 1px solid var(--omf-color-border);
    border-radius: 14px; background: var(--omf-color-surface); color: var(--omf-color-text-primary);
    cursor: pointer; transition: border-color 150ms, box-shadow 150ms;
  }
  button:hover, button[aria-pressed='true'] { border-color: var(--omf-color-primary-600); box-shadow: 0 0 0 1px var(--omf-color-primary-600); }
  button:focus-visible { outline: 3px solid var(--omf-color-primary-300); outline-offset: 3px; }
  .template-icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 11px; font-size: 25px; color: #344e41; margin-bottom: 18px; }
  strong { display: block; font-size: 15px; margin-bottom: 7px; }
  p { font-size: 13px; line-height: 1.6; color: var(--omf-color-text-secondary); margin: 0; }
  @media(max-width: 520px) { grid-template-columns: 1fr; button { padding: 18px; } .template-icon { float: left; margin: 0 14px 8px 0; } }
`
export const TemplateChooser: React.FC<{ value: string; onChange: (id: string) => void }> = ({ value, onChange }) => (
  <Choices role="group" aria-label="Escolha como começar">
    {formTemplates.map(template => (
      <button type="button" key={template.id} aria-pressed={value === template.id} onClick={() => onChange(template.id)}>
        <span className="template-icon" aria-hidden="true" style={{ background: template.color }}>{template.icon}</span>
        <strong>{template.name}</strong><p>{template.description}</p>
      </button>
    ))}
  </Choices>
)
