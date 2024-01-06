import { getHumanReadableDistance } from 'utils/helpers'

export const loadingTexts = [
  'Finding nearby restaurants...',
]

export const headings = [
  'Check out'
  'Eat some of this',
  'Sup. Have you tried',
  'How about',
  'Yo what about',
  'Yo I heard this place was super lit',
  "This place is poppin' off",
]

export const skipTexts = [
  "This place ain't it. Show me somwehere else!",
  'SHOW ME ANOTHER PLACE 🖖',
  'THANK YOU NEXT 🙏',
  'No thanks. I want to eat somewhere else!',
]

const translations = {
  enableLocationHeading: "We're unable to detect your current location",
  enableLocationDescription: 'Enable your current location and refresh the page to see nearby restaurants.',
  enableLocationPrompt:'Refresh this page after you',
  expandMyRadius: 'Expand my search radius',
  howFar: 'Adjust search radius:',
  noPlacesNearbyHeading: 'It seems like there are no restaurants nearby',
  noPlacesNearbyDescription: 'Please try adjusting the distance',
  priceLevel1: '$',
  priceLevel2: '$$',
  priceLevel3: '$$$',
  priceLevel4: '$$$$',
  priceLevel5: '$$$$$',
  refreshThisPage: 'REFRESH THIS PAGE 👈',
  withinRadius: (radius) => `within ${getHumanReadableDistance(radius)} of my location`,
}

export default {
  ...translations,
  ...skipTexts,
  ...headings,
}
