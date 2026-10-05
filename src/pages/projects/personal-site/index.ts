import type { ShowcaseProject } from '../types'

export const personalSite: ShowcaseProject = {
  slug: 'personal-site', title: 'Personal Site',
  description: 'This very website, built with a vision for a brighter tomorrow.',
  category: 'Product', motif: 'leaf', tags: ['Product', 'Design', 'Web'],
  filters: ['Products'], image: 'workshop', imagePosition: '50% 60%', imageScale: 1.65,
  introduction: 'A personal portfolio built as a static React website, with a solarpunk visual identity and an atmosphere that changes from day to night.',
  details: [
    { title: 'The idea', text: 'Bring projects, writing, and experiments together in a welcoming space inspired by nature and useful technology.' },
    { title: 'The implementation', text: 'React, TypeScript, and Vite provide the static frontend. CSS variables, paired day and night imagery, and a shared theme preference keep the experience consistent.' },
    { title: 'Motion with purpose', text: 'Page transitions, project filtering, and hover feedback help visitors navigate. The site respects reduced motion preferences.' },
  ],
}
