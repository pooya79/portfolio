import type { ShowcaseProject } from '../types'

export const gitlabBot: ShowcaseProject = {
  slug: 'gitlab-bot', title: 'GitLab Bot',
  description: 'AI-powered assistant for development workflows.',
  category: 'Backend', motif: 'leaf', tags: ['AI', 'Backend', 'Developer Tools'],
  filters: ['AI', 'Backend'], image: 'workshop', imagePosition: '60% 50%', imageScale: 1.9,
  introduction: 'GitLab Bot is a project concept for assisting development workflows. This outline will grow into a case study of the actual integration and its behavior.',
  details: [
    { title: 'The idea', text: 'Make routine development tasks easier to manage with an assistant close to the tools developers use.' },
    { title: 'The direction', text: 'Explore practical automation with clear permissions and useful feedback.' },
    { title: 'Case study to come', text: 'Add the supported workflows, architecture, implementation, and repository when available.' },
  ],
}
