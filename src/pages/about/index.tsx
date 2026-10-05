import { Link } from 'react-router'
import { LeafIcon, SparkleIcon, HandHeartIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { PageHeading } from '../../components/PageHeading'
import { BotanicalArt } from '../../components/BotanicalArt'
import { Reveal } from '../../components/Reveal'
import styles from '../../components/Content.module.css'

export default function About() {
  return <>
    <PageHeading title="Hi, I’m Pouya." description="Welcome to my corner of the web. A growing collection of things I make, learn, and care about." />
    <Reveal><div className={styles.aboutGrid}><div className={styles.aboutCopy}><h2>A digital garden,<br />with room for possibility.</h2><p>This portfolio brings together projects, writing, and experiments under a solarpunk theme: an optimistic future where technology and the natural world grow together.</p><p>I want this space to feel alive. Thoughtful motion, little interactions, and a day-to-night atmosphere are part of that experience.</p><p className={styles.note}>This introduction is a starting point. A personal bio, background, and experience will grow here next.</p><Link className="button" to="/contact">Start a conversation <ArrowUpRightIcon size={17} /></Link></div><div className={styles.aboutArt}><BotanicalArt /></div></div></Reveal>
    <section className={styles.principles} aria-label="Portfolio principles">{[
      { icon: LeafIcon, title: 'Inspired by nature', text: 'Organic forms, greenery, and a gentler relationship with technology.' },
      { icon: SparkleIcon, title: 'Led by curiosity', text: 'A place to explore ideas and share what comes from trying.' },
      { icon: HandHeartIcon, title: 'Built with care', text: 'Readable content, accessible interactions, and room for reduced motion.' },
    ].map(({ icon: Icon, title, text }) => <div key={title}><Icon size={26} weight="duotone" /><h3>{title}</h3><p>{text}</p></div>)}</section>
  </>
}
