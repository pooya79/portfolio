export type Post = {
  slug: string
  title: string
  description: string
  category: string
  image: 'library' | 'garden' | 'workshop' | 'audio'
  date: string
  sections: { title: string; text: string }[]
}
