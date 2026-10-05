import { useState, type FormEvent } from 'react'
import { ArrowRightIcon, ChatCircleDotsIcon, DownloadSimpleIcon, EnvelopeSimpleIcon, FileTextIcon, GithubLogoIcon, LinkedinLogoIcon, MapPinIcon, PlantIcon, UserIcon } from '@phosphor-icons/react'
import { Reveal } from '../../components/Reveal'
import { useTheme } from '../../theme/theme'
import { contactDetails } from './data'
import { terraceImages } from './sceneAssets'
import styles from './Contact.module.css'

const channels = [
  { title: 'Email', detail: contactDetails.email, href: `mailto:${contactDetails.email}`, icon: EnvelopeSimpleIcon },
  { title: 'GitHub', detail: 'github.com/pouyafallah', href: contactDetails.github, icon: GithubLogoIcon },
  { title: 'LinkedIn', detail: 'linkedin.com/in/pouyafallah', href: contactDetails.linkedin, icon: LinkedinLogoIcon },
]

function messageDraft(form: HTMLFormElement) {
  const values = new FormData(form)
  const name = String(values.get('name') ?? '').trim()
  const email = String(values.get('email') ?? '').trim()
  const subject = String(values.get('subject') ?? '').trim() || `A hello from ${name}`
  const body = `${String(values.get('message') ?? '').trim()}\n\nFrom: ${name}\nReply to: ${email}`
  return { subject, body }
}

export default function Contact() {
  const { theme } = useTheme()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { subject, body } = messageDraft(event.currentTarget)
    window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Continue in your email app to send your message. If it didn’t open, save a draft below.')
  }

  function saveDraft(form: HTMLFormElement) {
    const { subject, body } = messageDraft(form)
    const text = `To: ${contactDetails.email}\nSubject: ${subject}\n\n${body}\n`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'message-to-pouya.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus('Your draft was saved to your device. It hasn’t been sent.')
  }

  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="contact-title">
      <img className={styles.heroImage} src={terraceImages[theme].full} srcSet={`${terraceImages[theme].small} 1086w, ${terraceImages[theme].full} 2172w`} sizes="100vw" width={2172} height={724} alt="A low, vine-covered garden terrace with curved seating overlooking a lake, a green city, and alpine mountains." fetchPriority="high" />
      <div className={styles.heroWash} />
      <Reveal className={styles.heroCopy}>
        <p className={styles.eyebrow}>Get in touch</p>
        <h1 id="contact-title">Let’s build<br /><span>brighter tomorrows.</span></h1>
        <p className={styles.introduction}><strong>I’m Pouya Fallah.</strong> Let’s talk about AI systems, backend engineering, research, or your next idea. I’d love to hear from you.</p>
      </Reveal>
    </section>

    <div className={styles.contentGrid}>
      <Reveal className={styles.panel}>
        <section aria-labelledby="message-title">
          <h2 id="message-title">Send a Message</h2>
          <p className={styles.description}>Tell me about your idea, project, or just say hello.</p>
          <form className={styles.form} onSubmit={openEmail} onChange={() => setStatus('')}>
            <div className={styles.nameEmail}>
              <div className={styles.field}>
                <label className={styles.srOnly} htmlFor="name">Your name</label>
                <UserIcon size={18} aria-hidden="true" />
                <input id="name" name="name" autoComplete="name" placeholder="Your Name" required maxLength={100} />
              </div>
              <div className={styles.field}>
                <label className={styles.srOnly} htmlFor="email">Your email</label>
                <EnvelopeSimpleIcon size={18} aria-hidden="true" />
                <input id="email" name="email" type="email" autoComplete="email" placeholder="Your Email" required maxLength={254} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.srOnly} htmlFor="subject">Subject (optional)</label>
              <FileTextIcon size={18} aria-hidden="true" />
              <input id="subject" name="subject" placeholder="Subject" maxLength={150} />
            </div>
            <div className={`${styles.field} ${styles.messageField}`}>
              <label className={styles.srOnly} htmlFor="message">Your message</label>
              <ChatCircleDotsIcon size={18} aria-hidden="true" />
              <textarea id="message" name="message" placeholder="Your Message" rows={4} required minLength={10} maxLength={1000} value={message} onChange={event => setMessage(event.target.value)} aria-describedby="message-count" />
              <span className={styles.counter} id="message-count">{message.length} / 1000</span>
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.sendButton}>Send Message <ArrowRightIcon size={24} aria-hidden="true" /></button>
              <div className={styles.growingNote}><PlantIcon size={30} weight="duotone" aria-hidden="true" /><span>Thoughtful conversations<br />lead to brighter places.</span></div>
            </div>
            <div className={styles.formHelp}>
              <span>Opens a draft in your email app.</span>
              <button type="button" onClick={event => { const form = event.currentTarget.form; if (form) saveDraft(form) }}>Save a draft <DownloadSimpleIcon size={15} aria-hidden="true" /></button>
            </div>
            <p className={styles.formStatus} role="status" aria-live="polite">{status}</p>
          </form>
        </section>
      </Reveal>

      <Reveal className={styles.panel} delay={0.08}>
        <section aria-labelledby="connect-title">
          <h2 id="connect-title">Other Ways to Connect</h2>
          <p className={styles.description}>You can also reach me through these channels.</p>
          <ul className={styles.channels}>
            {channels.map(({ title, detail, href, icon: ChannelIcon }) => <li key={title}>
              <a href={href} target={title === 'Email' ? undefined : '_blank'} rel={title === 'Email' ? undefined : 'noopener noreferrer'} aria-label={`${title}: ${detail}${title === 'Email' ? '' : ' (opens in a new tab)'}`}>
                <span className={styles.channelIcon}><ChannelIcon size={25} weight={title === 'Email' ? 'regular' : 'fill'} aria-hidden="true" /></span>
                <span className={styles.channelCopy}><strong>{title}</strong><span>{detail}</span></span>
                <ArrowRightIcon size={18} className={styles.channelArrow} aria-hidden="true" />
              </a>
            </li>)}
            <li className={styles.location}>
              <span className={styles.channelIcon}><MapPinIcon size={25} aria-hidden="true" /></span>
              <span className={styles.channelCopy}><strong>Location</strong><span>{contactDetails.location}</span></span>
            </li>
          </ul>
          <div className={styles.connectionNote}><PlantIcon size={34} weight="duotone" aria-hidden="true" /><p>Different places<br />a brighter tomorrow</p></div>
        </section>
      </Reveal>

      <Reveal className={`${styles.panel} ${styles.quotePanel}`} delay={0.16}>
        <figure>
          <div className={styles.quoteImage}><img src={terraceImages[theme].small} alt="" width={1086} height={362} loading="lazy" /></div>
          <blockquote>“A brighter tomorrow<br />is a conversation away.”</blockquote>
          <figcaption>Pouya Fallah</figcaption>
        </figure>
      </Reveal>
    </div>
  </div>
}
