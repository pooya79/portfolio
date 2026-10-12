export type Project = {
  slug: string
  title: string
  description: string
  category: 'Interface' | 'Experiment' | 'Product' | 'Research' | 'Backend'
  motif: 'leaf' | 'sun'
  introduction: string
  details: { title: string; text: string }[]
}

export type ProjectFilter = 'All' | 'AI' | 'Research' | 'Backend' | 'Products'
export type ShowcaseProject = Project & {
  presentation: 'research' | 'app'
  tags: string[]
  filters: ProjectFilter[]
  image: 'workshop' | 'audio' | 'landscape' | 'asr' | 'torobrent' | 'piko'
  imagePosition: string
  imageScale?: number
}
