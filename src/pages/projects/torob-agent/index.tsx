import { BrainIcon, ChatCircleDotsIcon, DatabaseIcon, ImageIcon, MagnifyingGlassIcon, PackageIcon, ShieldCheckIcon, TestTubeIcon } from '@phosphor-icons/react'
import { AppProjectShowcase, type AppProjectContent } from '../../../components/AppProjectShowcase'
import { heroBackground, workflow } from './assets'
import { repository } from './data'

const project: AppProjectContent = {
  title: 'Torob Agent',
  subtitle: 'Shopping questions. Catalog answers.',
  summary: 'An AI agent that searches Torob’s catalog, asks clarifying questions, compares products, and finds matching sellers.',
  year: 2025,
  role: 'Agent architecture & backend engineering',
  heroBackground,
  repository,
  technologies: ['Python / FastAPI', 'PydanticAI / OpenAI', 'PostgreSQL / pgvector', 'SQLAlchemy / asyncpg', 'Alembic / Docker', 'Pytest / Logfire'],
  visualKind: 'diagram',
  screens: [{
    id: 'workflow', label: 'Workflow', src: workflow, width: 1536, height: 1024,
    caption: 'Agent workflow · Simplified architecture diagram',
    alt: 'Text queries pass through a router to the default or clarification agent. Images use a separate image agent. The agents retrieve Torob catalog data and return a text answer or product and seller identifiers.',
  }],
  status: {
    title: '2nd place · Torob Turbo 2025',
    description: 'I came in second place in the Torob Turbo competition on Quera, sponsored by Torob, with this code.',
  },
  challenge: <>
    <p>Developed in 2025 for Torob Turbo, a competition held on Quera and sponsored by Torob.</p>
    <p>The task was to build a shopping assistant around Torob’s product and seller dataset. A chat API had to answer product questions, find relevant items and offers, compare options, and handle image queries.</p>
    <p>Some requests identify a product directly. Others need follow-up questions about preferences, budget, or the seller. I built separate agent paths for these cases, with retrieval tools connecting the answers to catalog records.</p>
  </>,
  features: [
    { icon: MagnifyingGlassIcon, title: 'Catalog retrieval', description: 'Full-text, fuzzy & vector search strategies' },
    { icon: ChatCircleDotsIcon, title: 'Clarification across turns', description: 'Remember preferences and narrow offers' },
    { icon: BrainIcon, title: 'Product & seller reasoning', description: 'Specifications, comparisons & shop statistics' },
    { icon: ImageIcon, title: 'Search from an image', description: 'Image embeddings & visual reasoning' },
  ],
  architecture: {
    nodes: [{ icon: ShieldCheckIcon, label: 'FastAPI' }, { icon: BrainIcon, label: 'Agents' }, { icon: DatabaseIcon, label: 'Retrieval' }],
    storage: 'PostgreSQL · Products, offers & shops',
    jobs: 'pgvector · Text & image similarity',
    note: 'Typed responses: text, product keys or seller keys',
  },
  delivery: [
    { icon: ShieldCheckIcon, title: 'Authenticated API', description: 'HTTP Basic auth & validated contracts' },
    { icon: PackageIcon, title: 'Reproducible stack', description: 'Docker Compose, migrations & data import' },
    { icon: TestTubeIcon, title: 'Evaluation tooling', description: 'Scenario tests, router checks & telemetry' },
  ],
}

export default function TorobAgent() {
  return <AppProjectShowcase project={project} />
}
