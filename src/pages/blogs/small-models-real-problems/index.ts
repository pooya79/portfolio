import type { Post } from '../types'

export const smallModels: Post = {
  "slug": "small-models-real-problems",
  "title": "Small models, real problems",
  "description": "A few thoughts on choosing the smallest tool that can do the job well.",
  "category": "AI & Engineering",
  "image": "workshop",
  "date": "2026-09-28",
  "sections": [
    {
      "title": "Start with the problem",
      "text": "Before choosing a model, write down what a useful answer looks like. A narrow task with a clear boundary often needs less machinery than an open-ended assistant. A simple baseline gives every later experiment something honest to compete against."
    },
    {
      "title": "Make the tradeoffs visible",
      "text": "Latency, memory, and maintenance all shape the experience. Keep a small collection of realistic examples and compare the results. A model that is easier to understand and run may be the better choice even when a larger one wins a benchmark."
    },
    {
      "title": "Leave room to learn",
      "text": "Treat the first version as a question. Record where it struggles, improve the examples, and revisit the choice when the task changes. Good engineering is a series of informed adjustments."
    }
  ]
}
