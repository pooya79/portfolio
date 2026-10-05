import { Link } from 'react-router'
import { ArrowRightIcon, ArrowUpRightIcon, LeafIcon, NotebookIcon, SquaresFourIcon } from '@phosphor-icons/react'
import { Reveal } from '../../components/Reveal'
import { Garden } from '../../components/Garden'
import { BotanicalArt } from '../../components/BotanicalArt'
import { projects } from '../projects/data'
import { posts } from '../blogs/data'
import styles from './Home.module.css'

export default function Home() {
  return <>
    <Reveal>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.welcome}><LeafIcon size={16} weight="duotone" /> Welcome to my digital garden</span>
          <h1>Ideas take root.<br /><span>Good things grow.</span></h1>
          <p>I’m Pouya. This is my space for projects, thoughts, and a more thoughtful, nature-inspired web.</p>
          <div className={styles.heroActions}><Link className="button" to="/projects">Explore projects <ArrowUpRightIcon size={17} /></Link><Link className="text-link" to="/about">A little about me <ArrowRightIcon size={16} /></Link></div>
        </div>
        <div className={styles.heroArt}><BotanicalArt /><span className={styles.artCaption}>Nature and technology, growing together.</span></div>
      </section>
    </Reveal>

    <Reveal delay={0.08}>
      <section className={styles.overview} aria-label="Portfolio overview">
        <Link to="/projects" className={styles.overviewLink}><span className={styles.overviewIcon}><SquaresFourIcon size={24} weight="duotone" /></span><span><strong>Projects</strong><small>{projects.length} starter explorations</small></span><ArrowUpRightIcon size={20} /></Link>
        <Link to="/blogs" className={styles.overviewLink}><span className={styles.overviewIcon}><NotebookIcon size={24} weight="duotone" /></span><span><strong>The journal</strong><small>{posts.length} sample stories to begin with</small></span><ArrowUpRightIcon size={20} /></Link>
      </section>
    </Reveal>

    <div className={styles.featureGrid}>
      <Reveal delay={0.12}>
        <section className={styles.feature} aria-labelledby="featured-heading">
          <div className={styles.sectionHeader}><h2 id="featured-heading">Taking shape</h2><Link to="/projects" className="text-link">All projects <ArrowUpRightIcon size={15} /></Link></div>
          <Link to="/projects/living-web" className={styles.project}>
            <BotanicalArt compact />
            <div className={styles.projectCopy}><div className={styles.projectMeta}><span>Interface exploration</span><span>Sample project</span></div><h3>The living web <ArrowUpRightIcon size={24} /></h3><p>{projects[0].description}</p></div>
          </Link>
        </section>
      </Reveal>
      <Reveal delay={0.18}><Garden /></Reveal>
    </div>

    <Reveal delay={0.2}>
      <section className={styles.writing} aria-labelledby="writing-heading">
        <div className={styles.sectionHeader}><h2 id="writing-heading">A few growing thoughts</h2><Link to="/blogs" className="text-link">Visit the journal <ArrowUpRightIcon size={15} /></Link></div>
        <div className={styles.writingList}>{posts.map(post => <Link to={`/blogs/${post.slug}`} key={post.slug} className={styles.post}><span className={styles.postIcon}><NotebookIcon size={21} weight="duotone" /></span><span><small>{post.category} / Sample article</small><h3>{post.title}</h3></span><ArrowUpRightIcon size={20} /></Link>)}</div>
      </section>
    </Reveal>
  </>
}
