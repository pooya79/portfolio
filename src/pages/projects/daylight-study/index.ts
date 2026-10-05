import type { Project } from '../types'

export const daylightStudy: Project = {
  slug: 'daylight-study',
  title: 'A daylight study',
  description: 'A small experiment in light, color, and a changing atmosphere.',
  category: 'Experiment',
  motif: 'sun',
  introduction: 'This sample experiment explores how a digital space could change character between day and night while keeping its content familiar.',
  details: [
    { title: 'The idea', text: 'Treat dark mode as a change in atmosphere. Lighting, surface colors, and illustrations should work together.' },
    { title: 'The approach', text: 'A shared theme system follows the device preference and remembers a visitor’s manual choice.' },
    { title: 'What comes next', text: 'Add a real experiment, its results, and paired day/night imagery when ready.' },
  ],
}
