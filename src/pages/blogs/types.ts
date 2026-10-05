export type Post = {
  slug: string
  title: string
  description: string
  category: string
  sections: { title: string; text: string }[]
}
