import { NavLink, Link, useLocation } from 'react-router'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import symbolsLight from '../assets/images/generated/navigation-symbols-light.webp'
import symbolsDark from '../assets/images/generated/navigation-symbols-dark.webp'
import { useTheme } from '../theme/theme'
import { EdgeFoliage } from './EdgeFoliage'
import styles from './Shell.module.css'
import type { CSSProperties, ReactNode } from 'react'

const navigation = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/blogs', label: 'Blogs' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export function Shell({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isProjects = pathname === '/projects'
  const isAbout = pathname === '/about'
  const isBlogs = pathname === '/blogs'
  const isContact = pathname === '/contact'
  return <div className={`${styles.shell} ${isHome ? styles.home : ''} ${isProjects ? styles.projects : ''} ${isAbout ? styles.about : ''} ${isContact ? styles.contact : ''} ${isBlogs ? styles.blogs : ''}`}>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a>
    <header className={styles.header} style={{ '--navigation-symbols': `url("${theme === 'light' ? symbolsLight : symbolsDark}")` } as CSSProperties}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true" />
        <span className={styles.wordmark}>Pouya Fallah<small>AI SYSTEMS ENGINEERING</small></span>
      </Link>
      <nav aria-label="Main navigation" className={styles.nav}>
        {navigation.map(({ path, label }) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>{label}</NavLink>)}
      </nav>
      <div className={styles.actions}>
        <p className={styles.tagline}>TECHNOLOGY × HUMANITY<br />A BRIGHTER TOMORROW</p>
        <button className={styles.themeButton} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Switch to night' : 'Switch to day'} title={theme === 'light' ? 'Switch to night' : 'Switch to day'}>
          <span key={theme} className={`${styles.themeSymbol} ${theme === 'light' ? styles.sun : styles.moon}`} aria-hidden="true" />
        </button>
        <Link to="/contact" className={styles.build}>Let’s build <ArrowUpRightIcon size={18} /></Link>
      </div>
    </header>
    {!isHome && <EdgeFoliage />}
    <main id="main-content" tabIndex={-1} className={styles.main}>{children}</main>
    {!isHome && <footer className={styles.footer}><span>Pouya Fallah</span><span>Technology and humanity. A brighter tomorrow.</span></footer>}
  </div>
}
