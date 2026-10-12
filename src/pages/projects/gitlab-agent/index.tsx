import { BrainIcon, ChartBarIcon, ChatCircleDotsIcon, ClockIcon, GearIcon, GitMergeIcon, GitlabLogoIcon, QueueIcon, ShieldCheckIcon } from '@phosphor-icons/react'
import { AppProjectShowcase, type AppProjectContent } from '../../../components/AppProjectShowcase'
import { heroBackground, screenshots, thumbnails } from './assets'
import { organization } from './data'
import { Workflows } from './Workflows'

const project: AppProjectContent = {
  title: 'GitLab Agent',
  subtitle: 'Code review. Team insight.',
  summary: 'GitLab-connected agents for contextual merge request reviews, engineering activity reports, and scheduled email delivery.',
  year: 2025,
  role: 'AI workflows & full-stack engineering',
  organization,
  heroBackground,
  technologies: ['PHP / Laravel', 'Laravel AI / OpenRouter', 'MongoDB', 'Redis / Horizon', 'Blade / Alpine.js / Tailwind', 'GitLab REST / GraphQL'],
  screens: [
    { id: 'reviews', label: 'Bots', src: screenshots.reviews, thumbnail: thumbnails.reviews, width: 1600, height: 1000, caption: 'Project review bots · Synthetic demo data', alt: 'GitLab Agent dashboard listing four fictional projects, their review bots, access levels, active states, and settings.' },
    { id: 'conversation', label: 'Discussion', src: screenshots.conversation, thumbnail: thumbnails.conversation, width: 1600, height: 1000, caption: 'Review conversation · Synthetic demo data', alt: 'A sample merge request conversation showing a developer question and contextual agent feedback.' },
    { id: 'report', label: 'Reports', src: screenshots.report, thumbnail: thumbnails.report, width: 1600, height: 1000, caption: 'Saved AI report · Synthetic demo data', alt: 'A saved engineering activity analysis with sample achievements, work categories, and supporting evidence.' },
    { id: 'schedules', label: 'Schedules', src: screenshots.schedules, thumbnail: thumbnails.schedules, width: 1600, height: 1000, caption: 'Email schedules · Synthetic demo data', alt: 'Recurring report schedules with fictional recipients, reporting periods, and delivery history.' },
  ],
  status: {
    title: 'Proprietary · Developed in 2025',
    description: 'Built as part of my job. Source code is private; these screenshots show the running application with fictional demonstration data.',
  },
  challenge: <>
    <p>I developed GitLab Agent in 2025 while working at <a href={organization.url} target="_blank" rel="noreferrer">{organization.name}</a>.</p>
    <p>Code review needs context beyond a diff. Engineering reports need to connect commits, merge requests, issues, and tracked time. I built a platform that brings this evidence into two configurable AI workflows.</p>
    <p>Project bots review changes where developers already discuss them. A reporting dashboard turns GitLab activity into saved analyses and recurring email reports.</p>
  </>,
  features: [
    { icon: GitMergeIcon, title: 'Contextual code review', description: 'Diffs, linked issues & repository reference files' },
    { icon: ChatCircleDotsIcon, title: 'Follow-up discussions', description: 'Conversation history & commit-aware reviews' },
    { icon: ChartBarIcon, title: 'Engineering reports', description: 'Activity, tracked time & structured AI analysis' },
    { icon: ClockIcon, title: 'Recurring delivery', description: 'Configurable reporting periods & email schedules' },
  ],
  architecture: {
    nodes: [{ icon: GitlabLogoIcon, label: 'GitLab' }, { icon: QueueIcon, label: 'Jobs' }, { icon: BrainIcon, label: 'Agents' }],
    storage: 'MongoDB · Reviews, settings & reports',
    jobs: 'Redis / Horizon · Background work',
    note: 'Webhooks trigger reviews; REST and GraphQL supply reporting evidence.',
  },
  delivery: [
    { icon: GearIcon, title: 'Configurable project bots', description: 'Prompts, models, context files & lifecycle controls' },
    { icon: ChartBarIcon, title: 'Operational visibility', description: 'Review history, duration, tokens & estimated cost' },
    { icon: ShieldCheckIcon, title: 'Controlled access', description: 'Admin tools & OAuth access to personal activity' },
  ],
}

export default function GitlabAgent() {
  return <AppProjectShowcase project={project}><Workflows /></AppProjectShowcase>
}
