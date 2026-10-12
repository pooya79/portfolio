import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, useLocation, Link, Navigate } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { Shell } from './components/Shell'
import Projects from './pages/projects'
import Home from './pages/home'
import Contact from './pages/contact'
import Blogs from './pages/blogs'

const RobustPersianAsr = lazy(() => import('./pages/projects/robust-persian-asr'))
const TorobRent = lazy(() => import('./pages/projects/torobrent'))
const BlogDetail = lazy(() => import('./pages/blogs/BlogDetail'))
const About = lazy(() => import('./pages/about'))

export default function App() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const previousPath = useRef(pathname)
  useEffect(() => {
    const name = pathname === '/projects/torobrent' ? 'TorobRent' : pathname === '/projects/robust-persian-asr' ? 'Robust Persian ASR' : pathname === '/' ? 'AI Product Engineer' : pathname.split('/').filter(Boolean).map(part => part.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')).join(' | ')
    document.title = `Pouya Fallah | ${name}`
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return <Shell>
    <motion.div key={pathname} initial={reduced || pathname === '/' ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
      <Suspense fallback={(pathname === '/about' || pathname.startsWith('/projects/'))
        ? <div className="route-loading"><p role="status">Opening this corner of the garden…</p></div>
        : <p role="status">Opening this corner of the garden…</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/robust-persian-asr" element={<RobustPersianAsr />} />
          <Route path="/projects/torobrent" element={<TorobRent />} />
          <Route path="/projects/persian-asr" element={<Navigate to="/projects/robust-persian-asr" replace />} />
          <Route path="/projects/robust-speech-recognition" element={<Navigate to="/projects/robust-persian-asr" replace />} />
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
