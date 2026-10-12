import type { ShowcaseProject } from '../types'

export const repository = 'https://github.com/pooya79/torob-agent'

export const torobAgent: ShowcaseProject = {
  slug: 'torob-agent',
  title: 'Torob Agent',
  presentation: 'app',
  description: 'A catalog-grounded shopping agent. My second-place entry in the 2025 Torob Turbo competition on Quera, sponsored by Torob.',
  category: 'Backend',
  motif: 'leaf',
  introduction: 'Route a shopping question, retrieve catalog evidence, and return a product, seller, or useful answer.',
  details: [
    { title: 'The challenge', text: 'Answer shopping queries through an API using Torob’s product and seller data.' },
    { title: 'The result', text: 'Second place in the 2025 Torob Turbo competition.' },
  ],
  tags: ['Python / FastAPI', 'AI agent', '2nd place · 2025'],
  filters: ['AI', 'Backend'],
  image: 'torobAgent',
  imagePosition: 'center',
}
