import { getHumanReadableDistance } from 'utils/helpers'

export const loadingTexts = [
  {
    en: 'Finding nearby restaurants...',
    'zh-HK': 'Finding nearby restaurants...',
  },
]

export const headings = [
  {
    en: 'Check out',
    'zh-HK': 'Check out',
  },
  {
    en: 'Eat some of this',
    'zh-HK': 'Eat some of this',
  },
  {
    en: 'Sup. Have you tried',
    'zh-HK': 'Sup. Have you tried',
  },
  {
    en: 'How about',
    'zh-HK': 'How about',
  },
  {
    en: 'Yo what about',
    'zh-HK': 'Yo what about',
  },
  {
    en: 'Yo I heard this place was lit af',
    'zh-HK': 'Yo I heard this place was lit af',
  },
  {
    en: "This place is poppin' off",
    'zh-HK': "This place is poppin' off",
  },
]

export const skipTexts = [
  // {
  //   en: 'Naw dawg. Show me another place!',
  //   zh: '別的地方',
  // },
  {
    en: "This place ain't it. Show me somwehere else!",
    zh: '別的地方',
  },
  // {
  //   en: "I'm not feelin it. Show me another place!",
  //   zh: '別的地方',
  // },
  {
    en: 'SHOW ME ANOTHER PLACE 🖖',
    'zh-HK': 'SHOW ME ANOTHER PLACE 🖖',
  },
  {
    en: 'THANK YOU NEXT 🙏',
    'zh-HK': 'THANK YOU NEXT 🙏',
  },
  {
    en: 'No thanks. I want to eat somewhere else!',
    zh: '別的地方',
  },
]

const translations = {
  enableLocationHeading: {
    en: "We're unable to detect your current location",
    'zh-HK': "We're unable to detect your current location",
  },
  enableLocationDescription: {
    en:
      'Enable your current location and refresh the page to see nearby restaurants.',
    'zh-HK':
      'Enable your current location and refresh the page to see nearby restaurants.',
  },
  enableLocationPrompt: {
    en: 'Refresh this page after you',
    'zh-HK': 'Refresh this page after you',
  },
  expandMyRadius: {
    en: 'Expand my search radius',
    'zh-HK': 'Expand my search radius',
  },
  howFar: {
    en: 'Adjust search radius:',
    'zh-HK': 'Adjust search radius:',
  },
  // noPlacesNearbyPrompt: (radius) => ({
  //   en: `No places are open within ${getHumanReadableDistance(
  //     radius
  //   )} of your current location`,
  //   'zh-HK': 'There are no places in the selected vicinity.',
  // }),
  noPlacesNearbyHeading: {
    en: 'It seems like there are no restaurants nearby',
    'zh-HK': 'It seems like there are no restaurants nearby',
  },
  noPlacesNearbyDescription: {
    en: 'Please try adjusting the distance',
    'zh-HK': 'Please try adjusting the distance',
  },
  priceLevel1: {
    en: `$`,
    'zh-HK': '$',
  },
  priceLevel2: {
    en: `$$`,
    'zh-HK': '$$',
  },
  priceLevel3: {
    en: `$$$`,
    'zh-HK': '$$$',
  },
  priceLevel4: {
    en: `$$$$`,
    'zh-HK': '$$$$',
  },
  priceLevel5: {
    en: `$$$$$`,
    'zh-HK': '$$$$$',
  },
  refreshThisPage: {
    en: 'REFRESH THIS PAGE 👈',
    'zh-HK': 'REFRESH THIS PAGE 👈',
  },
  withinRadius: (radius) => ({
    en: `within ${getHumanReadableDistance(radius)} of my location`,
    'zh-HK': `within ${getHumanReadableDistance(radius)} of my location`,
  }),
}

export default {
  ...translations,
  ...skipTexts,
  ...headings,
}
