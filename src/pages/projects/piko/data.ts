import type { ShowcaseProject } from '../types'

export const repository = 'https://github.com/pooya79/Piko'

export const piko: ShowcaseProject = {
  slug: 'piko',
  title: 'Piko',
  presentation: 'app',
  description: 'An incomplete conversational Telegram bot studio, started for Quera’s seven-day Buildx challenge.',
  category: 'Product',
  motif: 'leaf',
  introduction: 'Turn a business request into a validated bot draft, inspect its flow, and test the conversation before publishing.',
  details: [
    { title: 'The challenge', text: 'Build an agent that creates and maintains a business bot from natural-language requests.' },
    { title: 'Current scope', text: 'Telegram inquiries, registration applications, and booking requests using approved building blocks.' },
  ],
  tags: ['Go / templ', 'AI bot builder', 'Incomplete'],
  filters: ['AI', 'Backend', 'Products'],
  image: 'piko',
  imagePosition: 'center',
}

export const productViews = [
  { id: 'flow', label: 'Flow', height: 1050, alt: 'Piko’s saved draft flow with inquiry, registration, and booking request paths, plus a selected question inspector.' },
  { id: 'dashboard', label: 'Workspace', height: 1521, alt: 'Piko’s Persian dashboard with three unconnected Telegram bots and clearly marked unavailable analytics.' },
  { id: 'preview', label: 'Preview', height: 1088, alt: 'Piko’s isolated bot preview at the inquiry review step, with synthetic answers and controls to edit or submit them.' },
  { id: 'connection', label: 'Telegram', height: 1050, alt: 'Piko’s Telegram connection screen with BotFather instructions and an empty token field.' },
] as const
