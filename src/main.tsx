import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { MotionConfig } from 'motion/react'
import '@fontsource-variable/outfit'
import '@fontsource-variable/dm-sans'
import './styles/global.css'
import App from './App'
import { ThemeProvider } from './theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
