import asrLight from '../../assets/images/generated/robust-persian-asr-light.webp'
import asrDark from '../../assets/images/generated/robust-persian-asr-dark.webp'
import asrSmallLight from '../../assets/images/generated/robust-persian-asr-small-light.webp'
import asrSmallDark from '../../assets/images/generated/robust-persian-asr-small-dark.webp'
import workshopLight from '../../assets/images/generated/projects-workshop-light.webp'
import workshopDark from '../../assets/images/generated/projects-workshop-dark.webp'
import audioLight from '../../assets/images/generated/projects-audio-light.webp'
import audioDark from '../../assets/images/generated/projects-audio-dark.webp'
import landscapeLight from '../../assets/images/generated/solarpunk-landscape-light.webp'
import landscapeDark from '../../assets/images/generated/solarpunk-landscape-dark.webp'
import workshopSmallLight from '../../assets/images/generated/projects-workshop-small-light.webp'
import workshopSmallDark from '../../assets/images/generated/projects-workshop-small-dark.webp'
import audioSmallLight from '../../assets/images/generated/projects-audio-small-light.webp'
import audioSmallDark from '../../assets/images/generated/projects-audio-small-dark.webp'
import landscapeSmallLight from '../../assets/images/generated/solarpunk-landscape-small-light.webp'
import landscapeSmallDark from '../../assets/images/generated/solarpunk-landscape-small-dark.webp'

export const projectImages = {
  asr: { light: asrLight, dark: asrDark, small: { light: asrSmallLight, dark: asrSmallDark } },
  workshop: { light: workshopLight, dark: workshopDark, small: { light: workshopSmallLight, dark: workshopSmallDark } },
  audio: { light: audioLight, dark: audioDark, small: { light: audioSmallLight, dark: audioSmallDark } },
  landscape: { light: landscapeLight, dark: landscapeDark, small: { light: landscapeSmallLight, dark: landscapeSmallDark } },
}

export function projectImageSources(image: keyof typeof projectImages, theme: 'light' | 'dark') {
  const assets = projectImages[image]
  const widths = image === 'asr' ? [768, 1536] : [836, 1672]
  return `${assets.small[theme]} ${widths[0]}w, ${assets[theme]} ${widths[1]}w`
}
