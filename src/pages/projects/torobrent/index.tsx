import { BuildingsIcon, ChatCircleDotsIcon, CodeIcon, FunnelIcon, GlobeIcon, MapPinIcon, MonitorIcon, RobotIcon, ShieldCheckIcon, StackIcon } from '@phosphor-icons/react'
import { AppProjectShowcase, type AppProjectContent } from '../../../components/AppProjectShowcase'
import { heroBackground, screenshots } from './assets'
import { productViews, repository } from './data'

const project: AppProjectContent = {
  title: 'TorobRent',
  subtitle: 'Find a place. Compare every offer.',
  summary: 'A Persian rental search app with map-based discovery and source-specific offers, all in one catalog.',
  year: 2026,
  role: 'Product design & full-stack development',
  heroBackground,
  repository,
  technologies: ['Python', 'Django / DRF', 'React / TypeScript', 'PostgreSQL', 'Redis / Celery', 'Docker / Nginx', 'OpenLayers', 'LangChain'],
  screens: productViews.map(view => ({ id: view.id, label: view.label, src: screenshots[view.id], alt: view.alt, width: 1600, height: view.id === 'home' ? 1120 : 900, caption: `${view.label} · Actual app · Demo data` })),
  challenge: <>
    <p>Built for an AI Product Engineer job challenge at <a href="https://torob.com" target="_blank" rel="noreferrer">Torob</a>: take its search-and-comparison model into a new market and build a usable product with AI-assisted development.</p>
    <p>My take: rentals in Tehran, keeping each source’s deposit, rent, and contact route together.</p>
  </>,
  features: [
    { icon: MapPinIcon, title: 'Map-based search', description: 'Filters, locations & favorites' },
    { icon: BuildingsIcon, title: 'Compare rental offers', description: 'One property, distinct sources' },
    { icon: RobotIcon, title: 'AI-assisted extraction', description: 'Profile repair, operator-approved' },
    { icon: ChatCircleDotsIcon, title: 'Submit & connect', description: 'Listing workflows & messages' },
  ],
  architecture: {
    nodes: [{ icon: GlobeIcon, label: 'Sources' }, { icon: StackIcon, label: 'Django API' }, { icon: MonitorIcon, label: 'React SSR' }],
    storage: 'PostgreSQL',
    jobs: 'Redis + Celery workers',
    note: 'Modular monolith · One Nginx gateway',
  },
  delivery: [
    { icon: FunnelIcon, title: 'Renter experience', description: 'Persian, RTL & responsive' },
    { icon: ShieldCheckIcon, title: 'Operator tools', description: 'Sources, review & publication' },
    { icon: CodeIcon, title: 'Checks across the stack', description: 'pytest · Vitest · Playwright' },
  ],
}

export default function TorobRent() {
  return <AppProjectShowcase project={project} />
}
