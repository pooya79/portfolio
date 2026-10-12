import { BrainIcon, ChatCircleDotsIcon, CreditCardIcon, FlowArrowIcon, MonitorIcon, RobotIcon, TelegramLogoIcon, TestTubeIcon } from '@phosphor-icons/react'
import { AppProjectShowcase, type AppProjectContent } from '../../../components/AppProjectShowcase'
import { heroBackground, screenshots } from './assets'
import { productViews, repository } from './data'

const project: AppProjectContent = {
  title: 'Piko',
  subtitle: 'Business idea. Bot conversation.',
  summary: 'An incomplete Telegram bot studio: describe a business need, inspect the flow, and preview the conversation.',
  year: 2026,
  role: 'Product design & full-stack development',
  heroBackground,
  repository,
  technologies: ['Go / templ', 'SQLite / sqlc', 'Tailwind CSS / Alpine.js', 'Genkit / OpenRouter', 'Telegram Bot API', 'Cytoscape / Dagre'],
  screens: productViews.map(view => ({ ...view, src: screenshots[view.id], width: 1600, caption: `${view.label} · Actual app · Demo data` })),
  status: {
    title: 'Incomplete prototype',
    description: 'The core workflows are implemented and tested with simulated services. Live-model interpretation and controlled Telegram acceptance checks remain pending.',
  },
  challenge: <>
    <p>Started for the Buildx contest on Quera, a seven-day challenge with topics set by the organizers.</p>
    <p>I chose the Telegram or Bale bot builder and maintainer: an agent should clarify a business owner’s request, build a usable bot, test and publish it, then apply a descriptive change and test again.</p>
    <p>Piko’s current scope is Telegram, using approved blocks for inquiries, registration applications, and booking requests. Applications do not guarantee a place; booking requests do not confirm a reservation.</p>
  </>,
  features: [
    { icon: ChatCircleDotsIcon, title: 'Build and revise through chat', description: 'Validated drafts from approved blocks' },
    { icon: FlowArrowIcon, title: 'Inspect the saved flow', description: 'Draft / published views, zoom & inspector' },
    { icon: TestTubeIcon, title: 'Preview before publishing', description: 'Isolated tests using the bot’s flow engine' },
    { icon: TelegramLogoIcon, title: 'Connect, deploy & review', description: 'Explicit publication, pause & submissions' },
  ],
  architecture: {
    nodes: [{ icon: MonitorIcon, label: 'Go / templ' }, { icon: BrainIcon, label: 'Builder' }, { icon: RobotIcon, label: 'Bot engine' }],
    storage: 'SQLite · Chats, flows & submissions',
    jobs: 'OpenRouter builder · Telegram delivery',
    note: 'Approved blocks, no generated code execution',
  },
  deliveryTitle: 'Still to finish',
  delivery: [
    { icon: TestTubeIcon, title: 'Live acceptance checks', description: 'Real model interpretation & Telegram' },
    { icon: MonitorIcon, title: 'Operations & account tools', description: 'Analytics, monitoring & password recovery' },
    { icon: CreditCardIcon, title: 'Broader integrations', description: 'Bale, payments & spreadsheets unavailable' },
  ],
}

export default function Piko() {
  return <AppProjectShowcase project={project} />
}
