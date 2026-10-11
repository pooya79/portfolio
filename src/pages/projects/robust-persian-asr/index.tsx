import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, WaveformIcon, StackIcon, GitBranchIcon, FileTextIcon, GithubLogoIcon, PlantIcon } from '@phosphor-icons/react'
import { Reveal } from '../../../components/Reveal'
import { useTheme } from '../../../theme/theme'
import { projectImages, projectImageSources } from '../sceneAssets'
import { evaluationSets, methods, models, repository, resultsArchive, type EvaluationSet } from './data'
import styles from './Thesis.module.css'

function goToSection(id: string) {
  const target = document.getElementById(id)
  target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  target?.focus({ preventScroll: true })
}

function Signal({ enhanced = false }: { enhanced?: boolean }) {
  return <div className={`${styles.signal} ${enhanced ? styles.enhancedSignal : ''}`} aria-hidden="true">
    {Array.from({ length: 35 }, (_, index) => <i key={index} style={{ '--bar': `${14 + Math.abs(Math.sin(index * 1.7) * Math.cos(index * .29)) * 80}%` } as CSSProperties} />)}
  </div>
}

export default function RobustPersianAsr() {
  const { theme } = useTheme()
  const [dualView, setDualView] = useState(true)
  const [dataset, setDataset] = useState<EvaluationSet>('aggregate')
  const baseline = methods[0].scores[dataset].wer
  const small = methods[1].scores[dataset].wer
  const medium = methods[2].scores[dataset].wer
  const evaluationSet = evaluationSets.find(item => item.id === dataset)!

  return <article className={styles.page}>
    <header className={styles.hero}>
      <img className={styles.heroArt} src={projectImages.asr[theme]} srcSet={projectImageSources('asr', theme)} sizes="100vw" width={1536} height={1024} fetchPriority="high" alt="An imagined listening garden: waveform-shaped acoustic fins, a brass sound receiver, solar glass, and greenery around a reflecting pool." />
      <div className={styles.heroWash} />
      <div className={styles.heroInner}>
        <Link className={styles.back} to="/projects"><ArrowLeftIcon size={16} /> Back to projects</Link>
        <Reveal className={styles.heroCopy}>
          <p className={styles.eyebrow}>MS thesis · Speech recognition</p>
          <h1>Robust<br />Persian ASR</h1>
          <p className={styles.subtitle}>Understanding speech,<br />beyond the noise.</p>
          <p className={styles.summary}>Adapting Whisper Small and Medium to Persian speech, from everyday recordings to real telephone and VoIP conditions.</p>
          <div className={styles.actions}>
            <button className={styles.primary} onClick={() => goToSection('approach')}>Explore the research <ArrowRightIcon size={19} /></button>
            <a className={styles.secondary} href={repository} target="_blank" rel="noreferrer"><GithubLogoIcon size={20} /> View on GitHub <ArrowUpRightIcon size={16} /></a>
          </div>
        </Reveal>
      </div>
      <p className={styles.artNote}>A listening garden, imagined for this project.</p>
    </header>

    <nav className={styles.sectionNav} aria-label="Case study sections">
      <div>{[['approach', 'The approach'], ['findings', 'Results'], ['resources', 'Code & models']].map(([id, label]) => <button key={id} onClick={() => goToSection(id)}>{label}<ArrowDown /></button>)}</div>
      <span>Python · PyTorch · Whisper · Hugging Face</span>
    </nav>

    <section id="approach" tabIndex={-1} className={styles.section} aria-labelledby="approach-title">
      <Reveal>
        <h2 id="approach-title">Train for real-world speech.</h2>
        <p className={styles.lead}>Persian adaptation. Realistic degradation. Better recognition.</p>
        <div className={styles.context}>
          <p>The main study adapts Whisper Small and Medium to Persian. Multi-condition training exposes the recognizer to environmental noise, bandwidth limits, codec compression, and packet loss, then tests whether that robustness transfers to real telephone and VoIP speech.</p>
          <p>A complementary data pipeline segments IranSeda recordings, creates and filters pseudo-labels, and adds that speech to Small’s training mixture. A separate dual-view fusion investigation asks whether enhanced features add useful information beyond the multi-condition recognizer.</p>
        </div>
      </Reveal>
      <Reveal>
        <h3 className={styles.diagramHeading}>A complementary path: dual-view fusion</h3>
        <p className={styles.diagramIntro}>Original and enhanced log-Mel features share a Whisper Small encoder, then combine before decoding. Enhancement prepares recognition features, rather than restored playback audio.</p>
        <div className={styles.diagramControls} role="group" aria-label="Explore the recognition architecture">
          <button aria-pressed={!dualView} onClick={() => setDualView(false)}>Original view</button>
          <button aria-pressed={dualView} onClick={() => setDualView(true)}>Dual view</button>
        </div>
        <div className={styles.pipeline} data-dual={dualView} aria-label={dualView ? 'Original and enhanced log-Mel features pass through a shared Whisper encoder, fusion block, and decoder.' : 'Original log-Mel features pass through a Whisper encoder and decoder without enhancement or fusion.'}>
          <div className={styles.input}><WaveformIcon size={31} /><strong>Persian speech</strong><small>16 kHz audio</small></div>
          <span className={styles.connector} aria-hidden="true">→</span>
          <div className={styles.views}>
            <div className={styles.view}><Signal /><strong>Original log-Mel</strong><small>Preserve the signal</small></div>
            {dualView && <div className={styles.view}><Signal enhanced /><strong>Enhanced log-Mel</strong><small>Learned enhancement</small></div>}
          </div>
          <span className={styles.connector} aria-hidden="true">→</span>
          <div className={styles.node}><StackIcon size={29} /><strong>{dualView ? 'Shared Whisper' : 'Whisper'}<br />encoder</strong></div>
          <span className={styles.connector} aria-hidden="true">→</span>
          {dualView && <><div className={`${styles.node} ${styles.fusion}`}><GitBranchIcon size={29} /><strong>Cross-attention<br />fusion</strong></div><span className={styles.connector} aria-hidden="true">→</span></>}
          <div className={styles.node}><FileTextIcon size={29} /><strong>Whisper<br />decoder</strong></div>
        </div>
        <p className={styles.diagramNote} aria-live="polite">{dualView ? 'The Small fusion system combines original and enhanced representations through cross-attention and a learned gate.' : 'The baseline follows the original signal alone. Select Dual view to see where enhancement and fusion enter.'} <span>Architecture illustration, not live inference.</span></p>
      </Reveal>
      <Reveal className={styles.process}>
        <div><h3>Prepare</h3><p>Normalize Persian transcripts and standardize speech datasets, including Common Voice and FLEURS, to mono 16 kHz audio.</p></div>
        <div><h3>Challenge</h3><p>Generate aligned clean/degraded pairs using environmental noise, bandwidth limits, codecs, and network impairments.</p></div>
        <div><h3>Compare</h3><p>Compare Small and Medium on five held-out datasets, covering general Persian speech and real telephone/VoIP calls.</p></div>
      </Reveal>
    </section>

    <section id="findings" tabIndex={-1} className={`${styles.section} ${styles.findings}`} aria-labelledby="findings-title">
      <Reveal>
        <h2 id="findings-title">What the experiments show.</h2>
        <p className={styles.lead}>The main Whisper Small and Medium study.</p>
        <label className={styles.datasetSelect}>Evaluation set
          <select value={dataset} onChange={event => setDataset(event.target.value as EvaluationSet)}>
            {evaluationSets.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <div className={styles.metrics} aria-live="polite" aria-atomic="true">
          <div><strong>{baseline.toFixed(2)}<span>%</span></strong><p>Small · standard training WER</p></div>
          <div><strong>{small.toFixed(2)}<span>%</span></strong><p>Small · multi-condition WER</p></div>
          <div><strong>{medium.toFixed(2)}<span>%</span></strong><p>Medium WER</p></div>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <caption>{evaluationSet.name} · {methods[0].scores[dataset].examples.toLocaleString('en-US')} evaluated utterances per model</caption>
            <thead><tr><th scope="col">Method</th><th scope="col">WER (%)</th><th scope="col">CER (%)</th></tr></thead>
            <tbody>{methods.map((method, index) => <tr key={method.name} className={index === 2 ? styles.best : undefined}><th scope="row">{method.name}</th><td>{method.scores[dataset].wer.toFixed(2)}</td><td>{method.scores[dataset].cer.toFixed(2)}</td></tr>)}</tbody>
          </table>
        </div>
        <p className={styles.resultNote}>WER measures word errors; CER measures character errors. Lower is better. Each main run evaluated 21,848 utterances across five test sets; six over-length labels were skipped. Aggregate scores are computed from total errors and reference units, rather than a simple average of dataset percentages. PersianSpeech contains only 24 evaluated utterances.</p>
        <p className={styles.takeaway}>Multi-condition training reduced Small’s aggregate WER from 23.27% to 17.83%, and its WER on real telephone/VoIP speech from 35.63% to 25.80%. Medium achieved the lowest aggregate WER at 14.36%. Adding IranSeda speech brought Small to 17.22% overall, with gains that varied by domain.</p>
        <a className="text-link" href={resultsArchive} target="_blank" rel="noreferrer">Read the main evaluation reports <ArrowUpRightIcon size={16} /></a>
      </Reveal>
      <Reveal className={styles.resources}>
        <div id="resources" tabIndex={-1}>
          <PlantIcon size={29} aria-hidden="true" />
          <h2>Continue the research.</h2>
          <p>Explore the implementation and the Persian Whisper Small and Medium checkpoints.</p>
        </div>
        <div className={styles.resourceLinks}>
          <a href={repository} target="_blank" rel="noreferrer"><span><strong>Source & experiments</strong><small>Data pipelines, training recipes, evaluation</small></span><ArrowUpRightIcon size={23} /></a>
          {models.map(model => <a key={model.id} href={model.href} target="_blank" rel="noreferrer"><span><strong>{model.name} · Persian</strong><small>{model.id}</small></span><ArrowUpRightIcon size={23} /></a>)}
        </div>
        <p className={styles.modelNote}>Scores above describe the archived research runs. See each model card for the published checkpoint version, access requirements, inference instructions, and training details.</p>
      </Reveal>
    </section>
  </article>
}

function ArrowDown() {
  return <ArrowRightIcon className={styles.downArrow} size={14} aria-hidden="true" />
}
