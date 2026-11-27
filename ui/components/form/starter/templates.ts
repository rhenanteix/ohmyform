import { FormFieldFragment } from '../../../graphql/fragment/form.fragment'

export const formTemplates = [
  { id: 'blank', icon: '✎', name: 'Começar do zero', description: 'Uma página em branco para a sua ideia.', title: '', color: '#edf3e9' },
  { id: 'feedback', icon: '☆', name: 'Ouvir meus clientes', description: 'Entenda o que funciona e o que pode melhorar.', title: 'Como foi sua experiência?', color: '#f4edfc' },
  { id: 'contact', icon: '↗', name: 'Receber contatos', description: 'Conecte pessoas interessadas ao seu negócio.', title: 'Vamos conversar?', color: '#eaf2fc' },
  { id: 'event', icon: '☷', name: 'Organizar inscrições', description: 'Uma forma simples de receber participantes.', title: 'Inscreva-se no nosso evento', color: '#fcf2e4' },
]

export function templateFields(template: string): FormFieldFragment[] {
  const questions = template === 'feedback'
    ? [['rating', 'Como você avalia sua experiência?'], ['textarea', 'O que podemos melhorar?'], ['email', 'Quer receber um retorno? Deixe seu e-mail.']]
    : template === 'contact'
      ? [['textfield', 'Como você se chama?'], ['email', 'Qual é o seu e-mail?'], ['textarea', 'Como podemos ajudar?']]
      : template === 'event'
        ? [['textfield', 'Qual é o seu nome?'], ['email', 'Em qual e-mail podemos enviar os detalhes?'], ['textarea', 'Tem alguma observação para a organização?']]
        : []
  return questions.map(([type, title], idx) => ({
    id: `NEW-${Date.now()}-${idx}`, idx, type, title, description: '', required: idx < 2,
    options: [], logic: [], defaultValue: null,
  }))
}
