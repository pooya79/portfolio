/* global document */
/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates this function expression. */
// Browser regression check: open the local site with playwright-cli, then run
// playwright-cli run-code --filename=tests/image-viewer.check.js
async page => {
  const origin = page.url().split('/').slice(0, 3).join('/')
  for (const extra of page.context().pages()) {
    if (extra !== page) await extra.close()
  }
  await page.goto(`${origin}/#/projects/gitlab-agent`)
  await page.reload()
  const opener = page.locator('#app-preview').getByRole('button').first()
  // Accept the old link too, so this check reproduces the original failure.
  const oldOpener = page.getByRole('link', { name: /^Enlarge bots screenshot/ })
  await (await oldOpener.count() ? oldOpener : opener).click()
  const viewer = page.getByRole('dialog', { name: 'GitLab Agent image viewer' })
  await viewer.waitFor({ state: 'visible', timeout: 2000 })
  if (page.context().pages().length !== 1) throw new Error('Image opened a new tab')
  const firstSource = await viewer.locator('img').getAttribute('src')
  await viewer.getByRole('button', { name: 'Next image' }).click()
  const secondSource = await viewer.locator('img').getAttribute('src')
  if (secondSource === firstSource) throw new Error('Next did not change the image')
  await viewer.getByRole('button', { name: 'Previous image' }).click()
  if (await viewer.locator('img').getAttribute('src') !== firstSource) throw new Error('Previous did not restore the image')
  await viewer.getByRole('button', { name: 'Previous image' }).click()
  if (await viewer.locator('img').getAttribute('src') === firstSource) throw new Error('Previous did not wrap to the last image')
  await viewer.getByRole('button', { name: 'Next image' }).click()
  if (await viewer.locator('img').getAttribute('src') !== firstSource) throw new Error('Next did not wrap to the first image')
  await viewer.getByRole('button', { name: 'Close image viewer' }).focus()
  await page.keyboard.press('Shift+Tab')
  if (!await viewer.getByRole('button', { name: 'Next image' }).evaluate(el => el === document.activeElement)) throw new Error('Focus escaped the viewer')
  await page.keyboard.press('Tab')
  if (!await viewer.getByRole('button', { name: 'Close image viewer' }).evaluate(el => el === document.activeElement)) throw new Error('Focus did not wrap inside the viewer')
  await viewer.locator('img').click()
  if (!await viewer.isVisible()) throw new Error('Clicking the image closed the viewer')
  await page.mouse.click(2, 2)
  await viewer.waitFor({ state: 'hidden' })
  if (!await opener.evaluate(el => el === document.activeElement)) throw new Error('Focus did not return to the opener')
  if (await page.evaluate(() => document.body.style.overflow === 'hidden')) throw new Error('Page scroll stayed locked')
  await page.locator('#app-preview').getByRole('button', { name: 'Enlarge', exact: true }).click()
  await viewer.waitFor({ state: 'visible' })
  await page.keyboard.press('ArrowRight')
  if (await viewer.locator('img').getAttribute('src') !== secondSource) throw new Error('Right arrow did not advance')
  await page.keyboard.press('ArrowLeft')
  if (await viewer.locator('img').getAttribute('src') !== firstSource) throw new Error('Left arrow did not go back')
  await page.keyboard.press('Escape')
  await viewer.waitFor({ state: 'hidden' })
  await opener.click()
  await viewer.getByRole('button', { name: 'Close image viewer' }).click()
  await viewer.waitFor({ state: 'hidden' })
  return 'PASS: stays on the project; next, previous, image click, outside click, Escape, close, focus restoration, and scroll cleanup'
}
