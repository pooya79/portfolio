import { greenerInternet } from './a-greener-internet'
import { motionWithPurpose } from './motion-with-purpose'

import { smallModels } from './small-models-real-problems'
import { listeningBeforeBuilding } from './listening-before-building'
import { designingForStillness } from './designing-for-stillness'

export const posts = [greenerInternet, motionWithPurpose, smallModels, listeningBeforeBuilding, designingForStillness]

export function readingTime(post: (typeof posts)[number]) {
  return Math.max(1, Math.ceil(post.sections.map(section => section.text).join(" ").split(/\s+/).length / 200))
}

export function displayDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date))
}
