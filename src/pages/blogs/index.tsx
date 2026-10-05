import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRightIcon, LeafIcon, CursorClickIcon } from '@phosphor-icons/react'
import { PageHeading } from '../../components/PageHeading'
import { Reveal } from '../../components/Reveal'
import { posts } from './data'
import styles from '../../components/Content.module.css'

export default function Blogs() {
  const [filter, setFilter] = useState('All')
  const filtered = posts.filter(post => filter === 'All' || post.category === filter)
  return <>
    <PageHeading title="Thoughts worth growing." description="A journal for ideas about the web, interaction, and a greener future. Sample articles for now." />
    <div className={styles.filters} role="group" aria-label="Filter articles">{['All', 'Solarpunk', 'Interaction'].map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
    <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p>
    <div className={styles.blogList}>{filtered.map((post, index) => <Reveal key={post.slug} delay={index * .06}>
      <Link className={styles.blogRow} to={`/blogs/${post.slug}`}><span className={styles.blogIcon}>{post.category === 'Solarpunk' ? <LeafIcon size={32} weight="duotone" /> : <CursorClickIcon size={32} weight="duotone" />}</span><div><span className={styles.meta}>{post.category} / Sample article</span><h2>{post.title}</h2><p>{post.description}</p></div><ArrowUpRightIcon size={24} /></Link>
    </Reveal>)}</div>
  </>
}
