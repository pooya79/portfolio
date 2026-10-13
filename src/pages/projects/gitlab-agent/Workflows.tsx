import { useState } from 'react'
import { ArrowRightIcon, ChartBarIcon, GitMergeIcon } from '@phosphor-icons/react'
import { Reveal } from '../../../components/Reveal'
import styles from './Workflows.module.css'

const flows = {
  review: {
    label: 'Merge request review',
    steps: [
      { title: 'Receive a request', text: 'Assign a project bot as reviewer or mention it in a merge request discussion. The webhook validates the secret, project, and active bot.' },
      { title: 'Assemble the context', text: 'A queued job gathers the description, linked issues, line-numbered diffs, and configured reference files from the repository.' },
      { title: 'Review with an agent', text: 'The agent returns structured feedback and a change summary. Follow-up questions reuse the conversation; a tool can approve the merge request.' },
      { title: 'Reply inside GitLab', text: 'Post feedback in the discussion and update a dedicated AI section of the description. Save the review trace, duration, token use, and estimated cost.' },
    ],
    note: 'A previously reviewed commit uses a review-only path, preserving the existing description. Approval leaves the merge decision with the team.',
  },
  reporting: {
    label: 'Engineering reports',
    steps: [
      { title: 'Collect the work', text: 'Fetch activity, commits, merge requests, issues, and time logs through GitLab REST and GraphQL for a chosen person and date range.' },
      { title: 'Connect the evidence', text: 'Match additional commit email identities, deduplicate commits, exclude merge commits, and link changes and time logs to their merge requests or issues.' },
      { title: 'Build a structured analysis', text: 'Send the assembled work log to a configured model. Return achievements, work categories, complexity notes, and estimated effort with confidence.' },
      { title: 'Save and deliver', text: 'Keep the report with its input evidence and model settings. Queue recurring email reports using the selected cadence, recipients, and reporting period.' },
    ],
    note: 'Tracked time comes from GitLab logs. AI effort estimates and findings are judgments for human review; saved inputs make their reasoning inspectable.',
  },
}

export function Workflows() {
  const [active, setActive] = useState<keyof typeof flows>('review')
  const flow = flows[active]

  return <Reveal className={styles.section}>
    <h2>How it works</h2>
    <p className={styles.intro}>Two workflows connect repository evidence to an actionable result.</p>
    <div className={styles.switcher} role="group" aria-label="Choose a workflow">
      <button aria-pressed={active === 'review'} aria-controls="gitlab-workflow" onClick={() => setActive('review')}><GitMergeIcon size={18} />{flows.review.label}</button>
      <button aria-pressed={active === 'reporting'} aria-controls="gitlab-workflow" onClick={() => setActive('reporting')}><ChartBarIcon size={18} />{flows.reporting.label}</button>
    </div>
    <div id="gitlab-workflow" aria-live="polite" aria-atomic="true">
      <ol className={styles.steps} aria-label={flow.label}>
        {flow.steps.map((step, index) => <li key={step.title}>
          <div className={styles.stepHeading}><h3>{step.title}</h3>{index < flow.steps.length - 1 && <ArrowRightIcon size={20} aria-hidden="true" />}</div>
          <p>{step.text}</p>
        </li>)}
      </ol>
      <p className={styles.note}>{flow.note}</p>
    </div>
  </Reveal>
}
