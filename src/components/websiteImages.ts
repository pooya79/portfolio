import type { Theme } from '../theme/theme'
import type { ImageSource } from './imagePreloading'
import { foregroundAssets, heroLandscapeAssets } from '../pages/home/sceneAssets'
import { aboutImages, gardenImages, universityImages } from '../pages/about/sceneAssets'
import { terraceImages } from '../pages/contact/sceneAssets'
import { blogImages } from '../pages/blogs/sceneAssets'
import symbolsLight from '../assets/images/generated/navigation-symbols-light.webp'
import symbolsDark from '../assets/images/generated/navigation-symbols-dark.webp'
import foliageLight from '../assets/images/generated/edge-foliage-light.webp'
import foliageDark from '../assets/images/generated/edge-foliage-dark.webp'
import workshopLight from '../assets/images/generated/projects-workshop-light.webp'
import workshopDark from '../assets/images/generated/projects-workshop-dark.webp'
import workshopSmallLight from '../assets/images/generated/projects-workshop-small-light.webp'
import workshopSmallDark from '../assets/images/generated/projects-workshop-small-dark.webp'
import asrLight from '../assets/images/generated/robust-persian-asr-light.webp'
import asrDark from '../assets/images/generated/robust-persian-asr-dark.webp'
import asrSmallLight from '../assets/images/generated/robust-persian-asr-small-light.webp'
import asrSmallDark from '../assets/images/generated/robust-persian-asr-small-dark.webp'
import pikoLight from '../assets/images/generated/piko-hero-light.webp'
import pikoDark from '../assets/images/generated/piko-hero-dark.webp'
import torobrentLight from '../assets/images/generated/torobrent-hero-light.webp'
import torobrentDark from '../assets/images/generated/torobrent-hero-dark.webp'
import torobAgentLight from '../assets/images/generated/torob-agent-hero-light.webp'
import torobAgentDark from '../assets/images/generated/torob-agent-hero-dark.webp'

function responsive(src: string, small: string, width: number): ImageSource {
  return { src, srcSet: `${small} ${width / 2}w, ${src} ${width}w`, sizes: '100vw' }
}

// Explicitly list website artwork. Project screenshots, previews, and diagrams
// are deliberately absent, even when they appear on Home or Projects.
function artwork(theme: Theme): Record<string, ImageSource[]> {
  return {
    '/': [{ src: heroLandscapeAssets[theme] }, { src: foregroundAssets[theme] }],
    '/projects': [responsive(theme === 'light' ? workshopLight : workshopDark, theme === 'light' ? workshopSmallLight : workshopSmallDark, 1672)],
    '/blogs': [{ src: blogImages.library[theme] }],
    '/about': [
      responsive(gardenImages[theme], aboutImages.garden[theme], 1660),
      ...Object.values(aboutImages).map(image => ({ src: image[theme] })),
      ...Object.values(universityImages).map(image => ({ src: image.src })),
    ],
    '/contact': [responsive(terraceImages[theme].full, terraceImages[theme].small, 2172), { src: terraceImages[theme].small }],
    '/projects/robust-persian-asr': [responsive(theme === 'light' ? asrLight : asrDark, theme === 'light' ? asrSmallLight : asrSmallDark, 1536)],
    '/projects/piko': [{ src: theme === 'light' ? pikoLight : pikoDark }],
    '/projects/torobrent': [{ src: theme === 'light' ? torobrentLight : torobrentDark }],
    '/projects/torob-agent': [{ src: theme === 'light' ? torobAgentLight : torobAgentDark }],
    '/projects/gitlab-agent': [{ src: theme === 'light' ? workshopSmallLight : workshopSmallDark }],
  }
}

export function pageWebsiteImages(pathname: string, theme: Theme): ImageSource[] {
  let path = pathname.replace(/\/$/, '') || '/'
  if (path === '/projects/persian-asr' || path === '/projects/robust-speech-recognition') path = '/projects/robust-persian-asr'
  return [
    { src: theme === 'light' ? symbolsLight : symbolsDark },
    ...(path === '/' ? [] : [{ src: theme === 'light' ? foliageLight : foliageDark }]),
    ...(artwork(theme)[path] ?? []),
  ]
}

export function otherWebsiteImages(entryPath: string, theme: Theme): ImageSource[] {
  const pages = artwork(theme)
  const paths = Object.keys(pages).filter(path => path !== entryPath)
  // Warm each page's main scenery before its secondary photos and artwork.
  return [
    ...paths.flatMap(path => pageWebsiteImages(path, theme).slice(0, 3)),
    ...paths.flatMap(path => pages[path].slice(1)),
  ]
}
