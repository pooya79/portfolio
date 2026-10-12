import gardenLight from '../../assets/images/generated/about-garden-light.webp'
import gardenDark from '../../assets/images/generated/about-garden-dark.webp'
import gardenSmallLight from '../../assets/images/generated/about-garden-small-light.webp'
import gardenSmallDark from '../../assets/images/generated/about-garden-small-dark.webp'
import landscapeLight from '../../assets/images/generated/solarpunk-landscape-small-light.webp'
import landscapeDark from '../../assets/images/generated/solarpunk-landscape-small-dark.webp'
import workshopLight from '../../assets/images/generated/projects-workshop-small-light.webp'
import workshopDark from '../../assets/images/generated/projects-workshop-small-dark.webp'
import amirkabirCampus from '../../assets/images/universities/amirkabir-campus.webp'
import sharifCampus from '../../assets/images/universities/sharif-campus.webp'

export const gardenImages = { light: gardenLight, dark: gardenDark }
export const aboutImages = {
  garden: { light: gardenSmallLight, dark: gardenSmallDark },
  landscape: { light: landscapeLight, dark: landscapeDark },
  workshop: { light: workshopLight, dark: workshopDark },
}

// Real campus photographs stay faithful to their original lighting in both themes.
export const universityImages = {
  amirkabir: {
    src: amirkabirCampus,
    width: 1440,
    height: 1080,
    alt: 'The sculptural entrance arch of Amirkabir University of Technology beside its Persian name and university emblem.',
    author: 'Behnood Bandi',
    source: 'https://commons.wikimedia.org/wiki/File:AUT2.JPG',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  sharif: {
    src: sharifCampus,
    width: 1440,
    height: 810,
    alt: 'Sharif University’s Avicenna building in daylight, with its brick tower, university emblem, Persian building sign, and green trees.',
    author: 'Behrooz Rezvani',
    source: 'https://commons.wikimedia.org/wiki/File:Sharif_University_of_Technology_July,_19,2016_-Tehran,Iran_-_panoramio.jpg',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
}
