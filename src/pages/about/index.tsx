import { useState } from 'react'
import type { Icon } from '@phosphor-icons/react'
import { ArrowRightIcon, BicycleIcon, BookOpenIcon, BrainIcon, CameraIcon, CodeIcon, DesktopIcon, GraduationCapIcon, HeartIcon, LeafIcon, MapTrifoldIcon, MountainsIcon, NotebookIcon, PlantIcon, RocketLaunchIcon, HardDrivesIcon, ToolboxIcon, UsersThreeIcon, GearIcon } from '@phosphor-icons/react'
import { Reveal } from '../../components/Reveal'
import { useTheme } from '../../theme/theme'
import { biography, education, interests, journey, philosophy, techStack } from './data'
import { aboutImages, gardenImages } from './sceneAssets'
import styles from './About.module.css'

const icons = { code: CodeIcon, brain: BrainIcon, research: NotebookIcon, rocket: RocketLaunchIcon, server: HardDrivesIcon, desktop: DesktopIcon, tools: ToolboxIcon, leaf: LeafIcon, people: UsersThreeIcon, plant: PlantIcon, heart: HeartIcon, book: BookOpenIcon, camera: CameraIcon, bicycle: BicycleIcon }

function SectionHeading({ icon: HeadingIcon, title, description, id }: { icon: Icon; title: string; description: string; id: string }) {
  return <div className={styles.sectionHeading}>
    <span className={styles.iconBadge}><HeadingIcon size={27} aria-hidden="true" /></span>
    <div><h2 id={id}>{title}</h2><p>{description}</p></div>
  </div>
}

export default function About() {
  const { theme } = useTheme()
  const [showAllTools, setShowAllTools] = useState(false)

  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="about-title">
      <img className={styles.heroImage} src={gardenImages[theme]} srcSet={`${aboutImages.garden[theme]} 830w, ${gardenImages[theme]} 1660w`} sizes="100vw" width={1660} height={948} alt="A green solarpunk garden city with a glass botanical dome, planted terraces, mountains, and a peaceful river." fetchPriority="high" />
      <div className={styles.heroWash} />
      <div className={styles.heroInner}>
        <Reveal className={styles.heroCopy}>
          <p className={styles.eyebrow}>{biography.eyebrow}</p>
          <h1 id="about-title">About</h1>
          <p className={styles.subtitle}>{biography.subtitle}</p>
          <p className={styles.introduction}>{biography.introduction}</p>
        </Reveal>
        <Reveal className={styles.quote} delay={0.15}>
          <PlantIcon size={32} weight="duotone" aria-hidden="true" />
          <blockquote><p>“{biography.quote}”</p><cite>Pouya Fallah</cite></blockquote>
        </Reveal>
      </div>
    </section>

    <div className={styles.contentGrid}>
      <Reveal className={styles.panel}>
        <section aria-labelledby="journey-title">
          <SectionHeading icon={MapTrifoldIcon} title="My Journey" description="A path shaped by curiosity, real-world problems, and a desire to make a positive impact." id="journey-title" />
          <ol className={styles.timeline}>
            {journey.map(item => {
              const ItemIcon = icons[item.icon]
              return <li key={item.title}>
                <span className={styles.iconBadge}><ItemIcon size={27} aria-hidden="true" /></span>
                <div className={styles.journeyCopy}><p className={styles.period}>{item.period}</p><h3>{item.title}</h3><p>{item.description}</p></div>
                <div className={styles.journeyImage}><img src={aboutImages[item.image][theme]} alt="" width={836} height={477} loading="lazy" style={{ objectPosition: item.position }} /></div>
              </li>
            })}
          </ol>
        </section>
      </Reveal>

      <div className={styles.middleColumn}>
        <Reveal className={styles.panel} delay={0.08}>
          <section aria-labelledby="education-title">
            <SectionHeading icon={GraduationCapIcon} title="Education" description="A foundation in engineering, with a focus on AI and real-world impact." id="education-title" />
            <div className={styles.educationGrid}>{education.map(item => <article key={item.degree}>
              <div className={styles.educationImage}><img src={aboutImages[item.image][theme]} width={836} height={477} alt="" loading="lazy" style={{ objectPosition: item.position }} /></div>
              <h3>{item.degree}</h3><p>{item.institution}</p><p className={styles.educationPeriod}>{item.period}</p>
              <ul className={styles.tags} aria-label="Areas of study">{item.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
            </article>)}</div>
          </section>
        </Reveal>
        <Reveal className={styles.panel} delay={0.14}>
          <section aria-labelledby="tech-title">
            <div className={styles.techHeading}>
              <SectionHeading icon={GearIcon} title="Tech Stack" description="Tools and technologies I use to build, research, and ship." id="tech-title" />
              <button className={styles.viewAll} aria-expanded={showAllTools} aria-controls="about-tech-stack" onClick={() => setShowAllTools(!showAllTools)}>{showAllTools ? 'Show less' : 'View all'}<ArrowRightIcon size={14} aria-hidden="true" /></button>
            </div>
            <dl id="about-tech-stack" className={styles.techStack}>{techStack.map(item => {
              const ItemIcon = icons[item.icon]
              return <div key={item.category}><dt><ItemIcon size={16} aria-hidden="true" /><span>{item.category}</span></dt><dd><ul className={styles.tags}>{[...item.tools, ...(showAllTools ? item.additional : [])].map(tool => <li key={tool}>{tool}</li>)}</ul></dd></div>
            })}</dl>
          </section>
        </Reveal>
      </div>

      <div className={styles.sideColumn}>
        <Reveal className={`${styles.panel} ${styles.philosophy}`} delay={0.12}>
          <section aria-labelledby="philosophy-title">
            <SectionHeading icon={PlantIcon} title="My Philosophy" description="Technology is most meaningful when it makes life better for people and the planet." id="philosophy-title" />
            <ul className={styles.values}>{philosophy.map(item => {
              const ItemIcon = icons[item.icon]
              return <li key={item.title}><ItemIcon size={29} weight="duotone" aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></li>
            })}</ul>
          </section>
        </Reveal>
        <Reveal className={`${styles.panel} ${styles.beyond}`} delay={0.18}>
          <section aria-labelledby="beyond-title">
            <SectionHeading icon={MountainsIcon} title="Beyond Work" description="Ideas grow everywhere." id="beyond-title" />
            <ul className={styles.interests}>{interests.map(item => {
              const ItemIcon = icons[item.icon]
              return <li key={item.label}><ItemIcon size={25} aria-hidden="true" /><span>{item.label}</span></li>
            })}</ul>
            <p className={styles.closingQuote}>“Clearer minds. Brighter ideas. A kinder tomorrow.”</p>
          </section>
        </Reveal>
      </div>
    </div>
  </div>
}
