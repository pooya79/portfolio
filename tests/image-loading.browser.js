/* global document, window, MutationObserver, performance */
// Run against a dev server:
// playwright-cli open http://127.0.0.1:5173/ --browser chrome
// playwright-cli run-code --filename tests/image-loading.browser.js
// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright CLI expects a function expression.
async (page) => {
  const base = page.url().split('#')[0].split('?')[0]
  const browser = page.context().browser()
  const results = []
  const assert = (condition, message) => { if (!condition) throw new Error(message) }
  const observeLoader = () => {
    window.loaderAudit = { shown: 0, leaving: 0, removed: 0 }
    new MutationObserver(() => {
      const loader = document.querySelector('[data-intro]')
      if (loader && !window.loaderAudit.shown) window.loaderAudit.shown = Date.now()
      if (loader && loader.className.includes('leaving') && !window.loaderAudit.leaving) window.loaderAudit.leaving = Date.now()
      if (!loader && window.loaderAudit.shown && !window.loaderAudit.removed) window.loaderAudit.removed = Date.now()
    }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] })
  }
  const isImage = url => /\.(webp|svg)$/.test(url) && !url.endsWith('/favicon.svg')

  const context = await browser.newContext({ colorScheme: 'light' })
  await context.addInitScript(observeLoader)
  // An old intro flag must not bypass a genuinely pending image.
  await context.addInitScript(() => window.localStorage.setItem('portfolio-intro-seen-v1', 'true'))
  const p = await context.newPage()
  const requests = []
  p.on('request', request => { if (isImage(request.url())) requests.push({ url: request.url(), at: Date.now() }) })
  let releaseScenery
  let releaseShowcase
  const scenery = new Promise(resolve => { releaseScenery = resolve })
  const showcase = new Promise(resolve => { releaseShowcase = resolve })
  await p.route('**/*', async route => {
    if (route.request().url().endsWith('/solarpunk-clouds-light.webp')) await scenery
    if (route.request().url().endsWith('/piko/flow.webp')) await showcase
    await route.continue()
  })
  try {
    await p.goto(base)
    await p.locator('[data-intro]').waitFor({ state: 'visible' })
    assert(!requests.some(item => item.url.endsWith('/about-garden-light.webp')), 'Other pages started downloading before entry')
    assert(await p.evaluate(() => !Array.from(document.images).find(img => img.src.endsWith('/solarpunk-clouds-light.webp')).complete), 'Scenery delay did not reproduce')
    releaseScenery()
    await p.locator('[data-intro]').waitFor({ state: 'detached', timeout: 5000 })
    const timing = await p.evaluate(() => window.loaderAudit)
    assert(timing.leaving - timing.shown >= 990, `Loader was too short: ${JSON.stringify(timing)}`)
    assert(await p.evaluate(() => !Array.from(document.images).find(img => img.src.endsWith('/piko/flow.webp')).complete), 'Showcase should still be pending when entry opens')
    results.push('Entry waits for scenery and decode, ignores old intro flag and pending showcase, and stays visible at least one second')

    await p.waitForFunction(() => ['contact-terrace-light.webp', 'blog-library-light.webp', 'about-garden-light.webp', 'piko-hero-light.webp', 'amirkabir-campus.webp'].every(name => performance.getEntriesByType('resource').some(entry => entry.name.endsWith('/' + name))))
    const otherPageRequests = requests.filter(item => /\/(about-garden|contact-terrace|blog-library|piko-hero)/.test(item.url))
    assert(otherPageRequests.every(item => item.at >= timing.removed), 'Background requests began before the entry loader closed')
    assert(!requests.some(item => /-dark\.webp$/.test(item.url)), 'Opposite theme was downloaded unnecessarily')
    assert(!requests.some(item => /\/images\/(torobrent|gitlab-agent)\/|\/piko\/(dashboard|preview|telegram-connection)\.webp|torob-agent-workflow/.test(item.url)), 'Background queue fetched a project showcase')
    results.push('Other pages download after entry, current theme only, with showcase screenshots and diagrams excluded')

    await p.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click()
    await p.locator('h1').waitFor()
    await p.waitForTimeout(250)
    assert(await p.locator('[data-intro]').count() === 0, 'Navigation reactivated the entry loader')
    results.push('Page navigation does not show the full-screen loader')
    await p.getByRole('button', { name: 'Switch to night', exact: true }).click()
    await p.waitForFunction(() => document.querySelector('img[class*=heroImage]')?.currentSrc.endsWith('/about-garden-dark.webp'))
    await p.waitForFunction(() => performance.getEntriesByType('resource').some(entry => entry.name.endsWith('/contact-terrace-dark.webp')))
    await p.waitForFunction(() => performance.getEntriesByType('resource').some(entry => entry.name.endsWith('/solarpunk-clouds-dark.webp')))
    assert(await p.locator('[data-intro]').count() === 0, 'Theme switching reactivated the loader')
    results.push('Night mode displays and warms the matching night scenery without a loader')
  } finally {
    releaseScenery()
    releaseShowcase()
    await p.unrouteAll({ behavior: 'wait' })
    await context.close()
  }

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: 'dark', reducedMotion: 'reduce' })
  const m = await mobile.newPage()
  const mobileImages = []
  m.on('request', request => { if (isImage(request.url())) mobileImages.push(request.url()) })
  try {
    await m.goto(base + '#/about')
    await m.waitForFunction(() => !document.querySelector('[aria-hidden=true][inert]') && !!document.querySelector('h1'))
    await m.waitForFunction(() => performance.getEntriesByType('resource').some(entry => entry.name.endsWith('/contact-terrace-small-dark.webp')))
    assert(await m.evaluate(() => document.querySelector('img[class*=heroImage]').currentSrc.endsWith('/about-garden-small-dark.webp')), 'Mobile hero selected the wrong responsive image')
    assert(!mobileImages.some(url => /\/(about-garden|contact-terrace|projects-workshop)-dark\.webp$/.test(url)), 'Mobile prefetch unnecessarily downloaded desktop artwork')
    assert(!mobileImages.some(url => /-light\.webp$/.test(url)), 'Dark mobile entry downloaded light artwork')
    results.push('Direct mobile entry and reduced motion work; responsive small night images are prefetched')
  } finally { await mobile.close() }

  const failure = await browser.newContext()
  const f = await failure.newPage()
  try {
    await f.route('**/solarpunk-clouds-light.webp', route => route.abort())
    await f.goto(base)
    await f.waitForFunction(() => !document.querySelector('[aria-hidden=true][inert]') && !!document.querySelector('#hero-title'), undefined, { timeout: 5000 })
    assert(await f.locator('[data-intro]').count() === 0, 'Failed image trapped the visitor')
    results.push('Image errors do not trap visitors behind the loader')
  } finally { await failure.close() }

  // Use a context without request interception: interception disables HTTP cache.
  const warm = await browser.newContext()
  await warm.addInitScript(observeLoader)
  const w = await warm.newPage()
  try {
    await w.goto(base)
    await w.waitForFunction(() => !document.querySelector('[aria-hidden=true][inert]') && !!document.querySelector('#hero-title'))
    await w.reload()
    await w.waitForFunction(() => !document.querySelector('[aria-hidden=true][inert]') && !!document.querySelector('#hero-title'))
    assert(await w.evaluate(() => window.loaderAudit.shown === 0), 'Warm entry unnecessarily flashed the loader')
    results.push('Cached entry skips the loader')
  } finally { await warm.close() }
  return results
}
