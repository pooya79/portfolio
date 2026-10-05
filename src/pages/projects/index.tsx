import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { PageHeading } from '../../components/PageHeading'
import { Reveal } from '../../components/Reveal'
import { BotanicalArt } from '../../components/BotanicalArt'
import { projects } from './data'
import styles from '../../components/Content.module.css'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const filtered = projects.filter(project => (filter === 'All' || project.category === filter) && `${project.title} ${project.description}`.toLowerCase().includes(search.toLowerCase()))
  return <>
    <PageHeading title="Things taking shape." description="A space for projects and experiments. These sample entries show how your future work will live here." />
    <div className={styles.toolbar}>
      <div className={styles.filters} role="group" aria-label="Filter projects">{['All', 'Interface', 'Experiment'].map(category => <button key={category} aria-pressed={category === filter} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <label className={styles.search}><MagnifyingGlassIcon size={18} /><span className={styles.srOnly}>Search projects</span><input type="search" placeholder="Find a project…" value={search} onChange={event => setSearch(event.target.value)} /></label>
    </div>
    <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
    <div className={styles.projectGrid}>{filtered.map((project, index) => <Reveal key={project.slug} delay={index * 0.06}>
      <Link to={`/projects/${project.slug}`} className={styles.projectCard}><BotanicalArt motif={project.motif} /><div className={styles.cardCopy}><span className={styles.meta}>{project.category} / Sample project</span><h2>{project.title}<ArrowUpRightIcon size={23} /></h2><p>{project.description}</p></div></Link>
    </Reveal>)}</div>
    {filtered.length === 0 && <div className={styles.empty}><h2>No projects on this path.</h2><p>Try another search or browse the full collection.</p><button className="button button-secondary" onClick={() => { setFilter('All'); setSearch('') }}>Show all projects</button></div>}
  </>
}
