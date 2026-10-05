import { NavLink, Link, useLocation } from 'react-router'
import { ArrowRightIcon, SunIcon, MoonStarsIcon, LeafIcon } from '@phosphor-icons/react'
import { useTheme } from '../theme/theme'
import styles from './Shell.module.css'
import type { ReactNode } from 'react'

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
  return <div className={`${styles.shell} ${isHome ? styles.home : ''}`}>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a>
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <LeafIcon className={styles.brandMark} weight="duotone" />
        <span>Pouya Fallah<small>AI SYSTEMS ENGINEERING</small></span>
      </Link>
      <nav aria-label="Main navigation" className={styles.nav}>
        {navigation.map(({ path, label }) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>{label}</NavLink>)}
      </nav>
      <div className={styles.actions}>
        <p className={styles.tagline}>TECHNOLOGY × HUMANITY<br />A BRIGHTER TOMORROW</p>
        <button className={styles.themeButton} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Switch to night' : 'Switch to day'} title={theme === 'light' ? 'Switch to night' : 'Switch to day'}>
          {theme === 'light' ? <MoonStarsIcon size={21} /> : <SunIcon size={21} />}
        </button>
        <Link to="/contact" className={styles.build}>Let’s Build <ArrowRightIcon size={23} /></Link>
      </div>
    </header>
    <main id="main-content" tabIndex={-1} className={styles.main}>{children}</main>
    {!isHome && <footer className={styles.footer}><span>Pouya Fallah</span><span>Technology and humanity. A brighter tomorrow.</span></footer>}
  </div>
}
