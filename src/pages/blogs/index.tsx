import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRightIcon, PlantIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Reveal } from '../../components/Reveal'
import { useTheme } from '../../theme/theme'
import { posts, readingTime, displayDate } from './data'
import { blogImages } from './sceneAssets'
import styles from './Blogs.module.css'

const categories = ['All', ...new Set(posts.map(post => post.category))]

export default function Blogs() {
  const { theme } = useTheme()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const isBrowsing = filter === 'All' && !query.trim()
  const filtered = posts.filter(post => (filter === 'All' || post.category === filter) && `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(query.trim().toLowerCase()))

  return <div className={styles.page}>
    <div className={styles.journal}>
      <aside className={styles.index} aria-label="Journal introduction and topics">
        <div className={styles.indexIntro}><PlantIcon size={30} weight="duotone" aria-hidden="true" /><h1>Blogs</h1><p>A place for unfinished questions and ideas worth sharing.</p></div>
        <label className={styles.search}><MagnifyingGlassIcon size={18} aria-hidden="true" /><input type="search" aria-label="Search articles" placeholder="Find a story" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <div className={styles.topics} role="group" aria-label="Filter articles">{categories.map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}><span>{category === 'All' ? 'All writing' : category}</span><span className={styles.topicCount}>{category === 'All' ? posts.length : posts.filter(post => post.category === category).length}</span></button>)}</div>
        <p className={styles.indexNote}>A journal in the making.<br />These are sample stories, with room for the real ones.</p>
      </aside>

      <section className={styles.edition} aria-label="Journal stories">
        <div className={styles.editionHeading}><p>{isBrowsing ? 'Technology, with a human perspective.' : filter === 'All' ? 'Search results' : filter}</p><span role="status">{filtered.length} {filtered.length === 1 ? 'story' : 'stories'}</span></div>
        <div className={`${styles.editorialGrid} ${!isBrowsing ? styles.results : ''}`}>
          {filtered.map((post, index) => <Reveal key={post.slug} className={styles.storySlot} delay={index * .05}>
            <article className={styles.story}>
              <div className={styles.storyCopy}>
                <p className={styles.meta}>{post.category}<span>{readingTime(post)} min read</span></p>
                <h2><Link to={`/blogs/${post.slug}`}>{post.title}<ArrowUpRightIcon size={21} aria-hidden="true" /></Link></h2>
                <p className={styles.description}>{post.description}</p>
                <time dateTime={post.date}>{displayDate(post.date)}</time>
              </div>
              <Link to={`/blogs/${post.slug}`} className={styles.storyImage} tabIndex={-1} aria-hidden="true"><img src={blogImages[post.image][theme]} width={post.image === 'library' ? 1536 : 830} height={post.image === 'library' ? 1024 : 474} alt="" loading={index < 2 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} /></Link>
              {isBrowsing && index === 0 && <Link className={styles.readStory} to={`/blogs/${post.slug}`}>Step into the story <ArrowUpRightIcon size={18} aria-hidden="true" /></Link>}
            </article>
          </Reveal>)}
          {!filtered.length && <div className={styles.empty}><PlantIcon size={36} aria-hidden="true" /><h2>No stories on this path yet.</h2><p>Try another topic or a different search.</p><button className="button button-secondary" onClick={() => { setFilter('All'); setQuery('') }}>Show all stories</button></div>}
        </div>
      </section>
    </div>
  </div>
}
