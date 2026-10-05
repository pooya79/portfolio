export type Project = {
  slug: string
  title: string
  description: string
  category: 'Interface' | 'Experiment'
  motif: 'leaf' | 'sun'
  introduction: string
  details: { title: string; text: string }[]
}
