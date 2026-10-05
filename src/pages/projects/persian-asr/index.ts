import type { ShowcaseProject } from '../types'

export const persianAsr: ShowcaseProject = {
  slug: 'persian-asr', title: 'Persian ASR',
  description: 'Automatic speech recognition for Persian language.',
  category: 'Research', motif: 'leaf', tags: ['AI', 'Research', 'NLP'],
  filters: ['AI', 'Research'], image: 'audio', imagePosition: '50% 52%',
  introduction: 'Persian ASR explores speech recognition for Persian. This is an outline for the full case study, with room for the actual datasets, model choices, and evaluation results.',
  details: [
    { title: 'The problem', text: 'Speech recognition should work across speaking styles, accents, and real recording conditions.' },
    { title: 'The direction', text: 'Study audio processing, model adaptation, and evaluation methods for Persian speech.' },
    { title: 'Case study to come', text: 'Document the training setup, datasets, measured results, and implementation when available.' },
  ],
}
