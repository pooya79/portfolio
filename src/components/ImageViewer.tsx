import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react'
import styles from './ImageViewer.module.css'

type ViewerImage = { id: string; src: string; label: string; alt: string; caption: string; width: number; height: number }

type ImageViewerProps = {
  title: string
  images: ViewerImage[]
  selectedId: string
  onSelect: (id: string) => void
  onClose: () => void
}

export function ImageViewer({ title, images, selectedId, onSelect, onClose }: ImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const captionId = useId()
  const [result, setResult] = useState<{ src: string; status: 'loaded' | 'error' } | null>(null)
  const index = images.findIndex(image => image.id === selectedId)
  const image = images[index]
  const status = result?.src === image.src ? result.status : 'loading'

  useEffect(() => {
    const dialog = dialogRef.current!
    const opener = document.activeElement
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  function navigate(direction: number) {
    onSelect(images[(index + direction + images.length) % images.length].id)
  }

  function closeFromBackdrop(event: MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return <dialog ref={dialogRef} className={styles.viewer} aria-labelledby={titleId} aria-describedby={captionId}
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={closeFromBackdrop}
    onKeyDown={event => {
      if (event.key === 'Tab') {
        const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
        return
      }
      if (images.length < 2 || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        navigate(event.key === 'ArrowLeft' ? -1 : 1)
      }
    }}>
    <header className={styles.header}>
      <h2 id={titleId}>{title} image viewer</h2>
      <button type="button" className={styles.control} onClick={onClose} aria-label="Close image viewer" autoFocus><XIcon size={22} aria-hidden="true" /></button>
    </header>
    <div className={styles.stage} onClick={closeFromBackdrop}>
      {images.length > 1 && <button type="button" className={`${styles.control} ${styles.previous}`} onClick={() => navigate(-1)} aria-label="Previous image"><CaretLeftIcon size={24} aria-hidden="true" /></button>}
      <div className={styles.imageArea} onClick={closeFromBackdrop} aria-busy={status === 'loading'}>
        <img key={image.id} className={styles.image} src={image.src} alt={image.alt} width={image.width} height={image.height}
          onLoad={() => setResult({ src: image.src, status: 'loaded' })}
          onError={() => setResult({ src: image.src, status: 'error' })} />
        {status !== 'loaded' && <p className={styles.imageStatus} role="status">{status === 'error' ? 'This image could not load. Try another image or close the viewer.' : 'Loading image…'}</p>}
      </div>
      {images.length > 1 && <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => navigate(1)} aria-label="Next image"><CaretRightIcon size={24} aria-hidden="true" /></button>}
    </div>
    <footer className={styles.footer}>
      <div id={captionId} aria-live="polite" aria-atomic="true"><strong>{image.label}</strong></div>
      <p className={styles.hint}>{images.length > 1 ? 'Use ← → to browse. ' : ''}Press Esc or click outside the image to close.</p>
    </footer>
  </dialog>
}
