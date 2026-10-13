export type ImageSource = { src: string; srcSet?: string; sizes?: string }

// Share in-flight work, but leave cache lifetime decisions to the browser.
const pending = new Map<string, Promise<boolean>>()

export function preloadImage(source: ImageSource, priority: 'high' | 'low'): Promise<boolean> {
  const key = JSON.stringify(source)
  const existing = pending.get(key)
  if (existing) return existing

  const promise = new Promise<boolean>(resolve => {
    const image = new Image()
    let settled = false
    const finish = (ready: boolean) => {
      if (settled) return
      settled = true
      clearTimeout(timeout)
      image.onload = null
      image.onerror = null
      resolve(ready)
    }
    // A failed or stalled request must not trap visitors behind the loader.
    const timeout = window.setTimeout(() => finish(false), 15000)
    image.fetchPriority = priority
    image.onload = () => { image.decode().then(() => finish(true), () => finish(false)) }
    image.onerror = () => finish(false)
    if (source.sizes) image.sizes = source.sizes
    if (source.srcSet) image.srcset = source.srcSet
    image.src = source.src
  })
  pending.set(key, promise)
  void promise.then(() => pending.delete(key))
  return promise
}

export function preloadInBackground(sources: ImageSource[]): () => void {
  let cancelled = false
  let next = 0
  const unique = [...new Map(sources.map(source => [JSON.stringify(source), source])).values()]
  async function work() {
    while (!cancelled && next < unique.length) {
      const source = unique[next++]
      await preloadImage(source, 'low')
    }
  }
  // Keep spare bandwidth available for navigation and on-demand showcase images.
  void work()
  void work()
  return () => { cancelled = true }
}
