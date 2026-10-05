import { NavLink, Link, useLocation } from 'react-router'
import { HouseIcon, SquaresFourIcon, NotebookIcon, UserCircleIcon, EnvelopeSimpleIcon, ArrowUpRightIcon, SunIcon, MoonStarsIcon, PlantIcon, LeafIcon } from '@phosphor-icons/react'
import { useTheme } from '../theme/theme'
import styles from './Shell.module.css'
import type { ReactNode } from 'react'

const navigation = [
  { path: '/', label: 'Home', icon: HouseIcon },
  { path: '/projects', label: 'Projects', icon: SquaresFourIcon },
  { path: '/blogs', label: 'Blogs', icon: NotebookIcon },
  { path: '/about', label: 'About', icon: UserCircleIcon },
  { path: '/contact', label: 'Contact', icon: EnvelopeSimpleIcon },
]

export function Shell({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()
  const current = navigation.find(({ path }) => path !== '/' && pathname.startsWith(path))?.label ?? 'Home'
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}><PlantIcon weight="duotone" size={30} /></span>
          <span>Pouya<span className={styles.brandSub}>a digital garden</span></span>
        </Link>
        <nav aria-label="Main navigation" className={styles.nav}>
          {navigation.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
              <Icon size={21} weight="duotone" /><span>{label}</span><ArrowUpRightIcon className={styles.navArrow} size={15} />
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.gardenNote}><LeafIcon weight="duotone" size={28} /><p>A work in progress.<br /><strong>Made to grow.</strong></p></div>
          <div className={styles.appearance} role="group" aria-label="Appearance">
            <button aria-pressed={theme === 'light'} onClick={() => setTheme('light')}><SunIcon size={17} />Day</button>
            <button aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}><MoonStarsIcon size={17} />Night</button>
          </div>
        </div>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}><span>Portfolio</span><span aria-hidden="true">/</span><strong>{current}</strong></div>
          <button className={styles.themeButton} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'After sunset, switch to dark mode' : 'Let the sun in, switch to light mode'}>
            {theme === 'light' ? <MoonStarsIcon size={19} /> : <SunIcon size={19} />}<span>{theme === 'light' ? 'After sunset' : 'Let the sun in'}</span>
          </button>
        </header>
        <main id="main-content" tabIndex={-1} className={styles.main}>{children}</main>
        <footer className={styles.footer}><span>Rooted in curiosity. Built with care.</span><span><LeafIcon size={14} /> A little greener, by design.</span></footer>
      </div>
    </div>
  )
}
