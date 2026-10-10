import { useEffect, useRef } from 'react'
import styles from './Home.module.css'

const vertex = `
attribute vec2 position;
varying vec2 uv;
void main() { uv = position * .5 + .5; gl_Position = vec4(position, 0., 1.); }
`

// Coordinates refer to the original artwork, so motion stays attached to objects
// even when object-fit: cover crops the image on smaller screens.
const fragment = `
precision mediump float;
uniform sampler2D artwork;
uniform vec2 frame;
uniform float elapsed;
uniform float foreground;
uniform float anchor;
varying vec2 uv;
void main() {
  float aspect = 1672. / 941.;
  float screen = frame.x / frame.y;
  vec2 visible = vec2(min(1., screen / aspect), min(1., aspect / screen));
  vec2 p = vec2(uv.x, 1. - uv.y) * visible + (1. - visible) * vec2(anchor, .5);
  vec2 sampleAt = p;
  if (foreground < .5) {
    // A flat inner mask moves the entire airship rigidly; its soft outer
    // boundary blends the displacement into the surrounding empty sky.
    float ship = 1. - smoothstep(.65, 1., length((p - vec2(.445, .347)) / vec2(.082, .064)));
    sampleAt -= ship * vec2(sin(elapsed * .19) * .010, sin(elapsed * .37) * .0025);
    float lake = smoothstep(.75, .85, p.y);
    sampleAt.x += lake * sin(p.y * 190. + elapsed * 1.3) * .0009;
    sampleAt.y += lake * sin(p.x * 100. + p.y * 70. - elapsed * .9) * .00045;
  } else {
    // Only the isolated lower-right foliage sways. The left vines share pixels
    // with the columns, so exclude that entire area to keep architecture rigid.
    float leaves = smoothstep(.86, .96, p.x) * smoothstep(.77, .9, p.y);
    sampleAt.x += leaves * sin(elapsed * .85 + p.y * 9.) * .0018;
    sampleAt.y += leaves * sin(elapsed * 1.1 + p.x * 13.) * .0007;
  }
  gl_FragColor = texture2D(artwork, vec2(sampleAt.x, 1. - sampleAt.y));
}
`

export function SceneImage({ src, foreground = false, paused, reduced }: {
  src: string
  foreground?: boolean
  paused: boolean
  reduced: boolean
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const controller = useRef<((paused: boolean) => void) | null>(null)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
    controller.current?.(paused)
  }, [paused])

  useEffect(() => {
    const target = canvas.current
    if (!target || reduced) return
    const gl = target.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false })
    if (!gl) return
    let disposed = false
    let loaded = false
    let visible = true
    let running = false
    let request = 0
    let previous = 0
    let elapsed = 0
    const shaders: WebGLShader[] = []
    const program = gl.createProgram()
    const buffer = gl.createBuffer()
    const texture = gl.createTexture()
    if (!program || !buffer || !texture) return
    for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
      const shader = gl.createShader(type)!
      shaders.push(shader)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      gl.attachShader(program, shader)
    }
    gl.linkProgram(program)
    const destroy = () => {
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      shaders.forEach(shader => gl.deleteShader(shader))
    }
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { destroy(); return }
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    const timeUniform = gl.getUniformLocation(program, 'elapsed')
    const frameUniform = gl.getUniformLocation(program, 'frame')
    const anchorUniform = gl.getUniformLocation(program, 'anchor')
    gl.uniform1f(gl.getUniformLocation(program, 'foreground'), foreground ? 1 : 0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    const draw = () => {
      if (!loaded || disposed) return
      gl.uniform1f(timeUniform, elapsed)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    const tick = (now: number) => {
      if (!running) return
      // Cap rendering at 30fps and never catch up after a hidden tab resumes.
      if (now - previous >= 32) {
        elapsed += Math.min((now - previous) / 1000, .065)
        previous = now
        draw()
      }
      request = requestAnimationFrame(tick)
    }
    const sync = () => {
      cancelAnimationFrame(request)
      running = loaded && !disposed && !pausedRef.current && visible && !document.hidden
      previous = performance.now()
      if (running) request = requestAnimationFrame(tick)
    }
    controller.current = sync
    const resize = () => {
      const rect = target.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      target.width = Math.max(1, Math.round(rect.width * ratio))
      target.height = Math.max(1, Math.round(rect.height * ratio))
      gl.viewport(0, 0, target.width, target.height)
      gl.uniform2f(frameUniform, target.width, target.height)
      gl.uniform1f(anchorUniform, foreground ? 0 : (window.innerWidth <= 800 ? .44 : .5))
      draw()
    }
    const image = new Image()
    image.onload = () => {
      if (disposed) return
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      loaded = true
      resize()
      target.dataset.ready = 'true'
      sync()
    }
    image.src = src
    const observer = new ResizeObserver(resize)
    observer.observe(target)
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
    intersection.observe(target)
    const lost = (event: Event) => {
      event.preventDefault()
      loaded = false
      delete target.dataset.ready
      sync()
    }
    target.addEventListener('webglcontextlost', lost)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('resize', resize)
    return () => {
      disposed = true
      controller.current = null
      cancelAnimationFrame(request)
      observer.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('resize', resize)
      target.removeEventListener('webglcontextlost', lost)
      delete target.dataset.ready
      image.onload = null
      destroy()
    }
  }, [src, foreground, reduced])

  return <div className={styles.animatedImage}>
    <canvas ref={canvas} className={styles.sceneCanvas} aria-hidden="true" />
    <img className={styles.sceneImage} src={src} alt="" width={1672} height={941} fetchPriority={foreground ? 'auto' : 'high'} />
  </div>
}
