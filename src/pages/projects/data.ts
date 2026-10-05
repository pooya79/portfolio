import { livingWeb } from './living-web'
import { daylightStudy } from './daylight-study'
import { robustSpeechRecognition } from './robust-speech-recognition'
import { torobRent } from './torob-rent'
import { persianAsr } from './persian-asr'
import { fin } from './fin'
import { gitlabBot } from './gitlab-bot'
import { personalSite } from './personal-site'
import { aiSystemsLab } from './ai-systems-lab'

// The reference order is the default showcase order. No unverified dates are implied.
export const projectCollection = [torobRent, persianAsr, fin, gitlabBot, personalSite, aiSystemsLab]
// Keep existing project URLs and the home page's featured projects available.
export const projects = [...projectCollection, robustSpeechRecognition, livingWeb, daylightStudy]
