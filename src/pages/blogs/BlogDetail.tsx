import { Link, useParams } from 'react-router'
import { ArrowLeftIcon, NotebookIcon } from '@phosphor-icons/react'
import { posts } from './data'
import styles from '../../components/Content.module.css'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = posts.find(item => item.slug === slug)
  if (!post) return <div className="empty-state"><h1>This story is still a seed.</h1><Link to="/blogs" className="text-link">Visit the journal</Link></div>
  return <article className={`${styles.detail} ${styles.article}`}>
    <Link className="text-link" to="/blogs"><ArrowLeftIcon size={16} />Back to the journal</Link>
    <header className={styles.heading}><p className={styles.meta}><NotebookIcon size={17} />{post.category} / Sample article</p><h1>{post.title}</h1><p>{post.description}</p></header>
    <div className={styles.prose}>{post.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
    <Link className="button button-secondary" to="/blogs">More from the journal</Link>
  </article>
}
