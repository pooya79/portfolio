import type { ShowcaseProject } from '../types'

export const repository = 'https://github.com/pooya79/TorobRent'

export const torobrent: ShowcaseProject = {
  slug: 'torobrent',
  title: 'TorobRent',
  presentation: 'app',
  description: 'Rental discovery for Tehran, with source-specific offers and reviewable, AI-assisted extraction.',
  category: 'Product',
  motif: 'leaf',
  introduction: 'A search-and-comparison product built for Torob’s AI Product Engineer job challenge.',
  details: [
    { title: 'The challenge', text: 'Apply Torob’s comparison model to a new market and build a usable product with AI-assisted workflows.' },
    { title: 'The product', text: 'Bring rental listings into one catalog while keeping each source’s terms and contact route distinct.' },
  ],
  tags: ['Django', 'React', 'AI-assisted extraction'],
  filters: ['AI', 'Backend', 'Products'],
  image: 'torobrent',
  imagePosition: 'center 42%',
}

export const productViews = [
  {
    id: 'search',
    label: 'Discover',
    alt: 'TorobRent’s Persian rental search with property cards, rental filters, and a rendered OpenStreetMap of Tehran.',
  },
  {
    id: 'home',
    label: 'Home',
    alt: 'TorobRent’s Persian home page with rental search and complete city discovery cards for Tehran and future markets.',
  },
  {
    id: 'property',
    label: 'Compare',
    alt: 'A TorobRent property detail page with a real application photo gallery and a source-specific deposit and monthly rent panel.',
  },
  {
    id: 'submission',
    label: 'Submit',
    alt: 'The final review step of TorobRent’s Persian listing submission workflow, showing saved demo property details before submission.',
  },
  {
    id: 'sources',
    label: 'Operate',
    alt: 'TorobRent’s dark-theme operator source review workspace with fictional source cases, assignments, and review actions.',
  },
] as const
