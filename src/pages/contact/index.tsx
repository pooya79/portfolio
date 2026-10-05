import { useState, type FormEvent } from 'react'
import { DownloadSimpleIcon, EnvelopeSimpleIcon, LeafIcon } from '@phosphor-icons/react'
import { PageHeading } from '../../components/PageHeading'
import styles from '../../components/Content.module.css'

export default function Contact() {
  const [status, setStatus] = useState('')
  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = `To: Pouya\nFrom: ${form.get('name')} <${form.get('email')}>\n\n${form.get('message')}\n`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'message-to-pouya.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus('Your message draft was downloaded. It has not been sent.')
  }
  return <>
    <PageHeading title="Good things start with hello." description="An idea, a collaboration, or a shared curiosity. There’s always room for a conversation." />
    <div className={styles.contactGrid}>
      <section className={styles.contactNote}><EnvelopeSimpleIcon size={42} weight="duotone" /><h2>Let’s make something<br />thoughtful.</h2><p>Contact details are coming soon. For now, you can write a message and save a draft to your device.</p><div className={styles.note}><LeafIcon size={20} /><span>Your message stays with you until you choose to share it.</span></div></section>
      <form className={styles.form} onSubmit={saveDraft} onChange={() => setStatus('')}>
        <div className={styles.field}><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="How should I call you?" required maxLength={100} /></div>
        <div className={styles.field}><label htmlFor="email">Your email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></div>
        <div className={styles.field}><label htmlFor="message">What’s on your mind?</label><textarea id="message" name="message" rows={6} placeholder="Tell me a little about your idea…" required minLength={10} maxLength={5000} /></div>
        <p className={styles.formHelp}>This saves a text file. It doesn’t send a message.</p>
        <button type="submit" className="button">Save message draft <DownloadSimpleIcon size={17} /></button>
        <p role="status" aria-live="polite" className={styles.formStatus}>{status}</p>
      </form>
    </div>
  </>
}
