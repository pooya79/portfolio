import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { Shell } from './components/Shell'
import Home from './pages/home'

const Projects = lazy(() => import('./pages/projects'))
const ProjectDetail = lazy(() => import('./pages/projects/ProjectDetail'))
const Blogs = lazy(() => import('./pages/blogs'))
const BlogDetail = lazy(() => import('./pages/blogs/BlogDetail'))
const About = lazy(() => import('./pages/about'))
const Contact = lazy(() => import('./pages/contact'))

export default function App() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const previousPath = useRef(pathname)
  useEffect(() => {
    const name = pathname === '/' ? 'Home' : pathname.split('/').filter(Boolean).map(part => part.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')).join(' | ')
    document.title = `Pouya Fallah | ${name}`
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return <Shell>
    <motion.div key={pathname} initial={reduced || pathname === '/' ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
      <Suspense fallback={<p role="status">Opening this corner of the garden…</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div className="empty-state"><h1>This path is still unplanted.</h1><p>The page you’re looking for isn’t here.</p><Link className="button" to="/">Back to home</Link></div>} />
        </Routes>
      </Suspense>
    </motion.div>
  </Shell>
}
