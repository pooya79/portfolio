import { Link, useParams } from 'react-router'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { useTheme } from '../../theme/theme'
import { posts, displayDate, readingTime } from './data'
import { blogImages } from './sceneAssets'
import styles from './Blogs.module.css'

export default function BlogDetail() {
  const { slug } = useParams()
  const { theme } = useTheme()
  const post = posts.find(item => item.slug === slug)
  if (!post) return <div className="empty-state"><h1>This story is still a seed.</h1><Link to="/blogs" className="text-link">Visit the journal</Link></div>
  const next = posts[(posts.indexOf(post) + 1) % posts.length]
  return <article className={styles.article}>
    <Link className={styles.textLink} to="/blogs"><ArrowLeftIcon size={16} />Back to the journal</Link>
    <header className={styles.articleHeader}><p className={styles.meta}>{post.category} / Sample article</p><h1>{post.title}</h1><p>{post.description}</p><p className={styles.meta}>{displayDate(post.date)} · {readingTime(post)} min read</p></header>
    <img className={styles.articleImage} src={blogImages[post.image][theme]} alt="A nature-filled solarpunk scene illustrating this sample story." width={830} height={474} />
    <div className={styles.articleBody}>{post.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<p className={styles.note}>This is a mock article, included to explore the journal’s design and reading experience.</p></div>
    <div className={styles.articleBottom}><Link className={styles.textLink} to="/blogs">All stories</Link><Link className={styles.textLink} to={`/blogs/${next.slug}`}>Next: {next.title}<ArrowRightIcon size={18} /></Link></div>
  </article>
}
