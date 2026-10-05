import type { ShowcaseProject } from '../types'

export const fin: ShowcaseProject = {
  slug: 'fin', title: 'Fin',
  description: 'Personal finance assistant for a more intentional life.',
  category: 'Product', motif: 'leaf', tags: ['Product', 'AI', 'FinTech'],
  filters: ['Products', 'AI'], image: 'workshop', imagePosition: '90% 75%', imageScale: 1.65,
  introduction: 'Fin is a concept for a personal finance assistant. This outline describes the idea from the portfolio reference and leaves space for the actual product story.',
  details: [
    { title: 'The idea', text: 'Help people understand everyday finances through clear, approachable tools.' },
    { title: 'The direction', text: 'Explore useful summaries and ways to make financial information easier to understand.' },
    { title: 'Case study to come', text: 'Add the interface, data handling approach, product decisions, and demo when available.' },
  ],
}
