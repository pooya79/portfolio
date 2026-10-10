import type { Post } from '../types'

export const listeningBeforeBuilding: Post = {
  "slug": "listening-before-building",
  "title": "Listening before building",
  "description": "What speech interfaces can teach us about designing for the people on the other side.",
  "category": "AI & Engineering",
  "image": "audio",
  "date": "2026-09-21",
  "sections": [
    {
      "title": "Listen to the edges",
      "text": "A quiet room is only one place where someone might use a speech interface. People pause, switch languages, and speak over background noise. Designing around that variety starts with listening to examples beyond the easiest demo."
    },
    {
      "title": "Make uncertainty useful",
      "text": "When a system is unsure, the interface should make correction straightforward. Show the words it heard, preserve the original context, and let someone try again without losing their work. Confidence is useful only when it helps a person decide what to do next."
    },
    {
      "title": "Measure the whole experience",
      "text": "Recognition accuracy matters, but so do recovery time and effort. A slightly imperfect transcript with a good correction flow can be more useful than a polished demo that offers no way back."
    }
  ]
}
