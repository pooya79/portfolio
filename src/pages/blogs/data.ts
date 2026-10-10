import type { Post } from './types'

// Add real posts here when they are ready to publish.
export const posts: Post[] = []

export function readingTime(post: (typeof posts)[number]) {
  return Math.max(1, Math.ceil(post.sections.map(section => section.text).join(" ").split(/\s+/).length / 200))
}

export function displayDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date))
}
