import type { ShowcaseProject } from '../types'

export const organization = { name: 'Jooyeshgar', url: 'https://jooyeshgar.net' }

export const gitlabAgent: ShowcaseProject = {
  slug: 'gitlab-agent',
  title: 'GitLab Agent',
  presentation: 'app',
  description: 'A proprietary engineering platform for AI merge request reviews, evidence-based activity reports, and scheduled delivery.',
  category: 'Product',
  motif: 'leaf',
  introduction: 'Connect GitLab code review and engineering reports through configurable AI agents and background workflows.',
  details: [
    { title: 'The challenge', text: 'Bring repository context into code review and turn scattered development activity into useful reports.' },
    { title: 'The work', text: 'Developed in 2025 as proprietary software for my employer.' },
  ],
  tags: ['Laravel / PHP', 'GitLab automation', 'Proprietary · 2025'],
  filters: ['AI', 'Backend', 'Products'],
  image: 'gitlabAgent',
  imagePosition: 'center',
}
