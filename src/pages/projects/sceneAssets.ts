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
  workshop: { light: workshopLight, dark: workshopDark, small: { light: workshopSmallLight, dark: workshopSmallDark } },
  audio: { light: audioLight, dark: audioDark, small: { light: audioSmallLight, dark: audioSmallDark } },
  landscape: { light: landscapeLight, dark: landscapeDark, small: { light: landscapeSmallLight, dark: landscapeSmallDark } },
}

export function projectImageSources(image: keyof typeof projectImages, theme: 'light' | 'dark') {
  const assets = projectImages[image]
  return `${assets.small[theme]} 836w, ${assets[theme]} 1672w`
}
