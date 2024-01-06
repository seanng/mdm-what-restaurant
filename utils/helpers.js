/* global navigator */
import axios from 'axios'

export function getRandom(list) {
  const randomIdx = Math.floor(Math.random() * list.length)
  return list[randomIdx]
}

export async function getPlaceWithPhotoUrl(restaurant) {
  const [photo] = restaurant.photos || []
  if (!photo || !photo.photo_reference) {
    return restaurant
  }
  const { data } = await axios.post(
    '/api/photo',
    {
      // maxwidth: based on the device width...
      photoreference: photo.photo_reference,
    },
    { responseType: 'blob' }
  )
  return { ...restaurant, photoUrl: window.URL.createObjectURL(data) }
}

export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

export function getHumanReadableDistance(meters) {
  if (meters < 1000) {
    return `${meters.toFixed()}m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

export function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km

  return getHumanReadableDistance(d * 1000)
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export function getLanguageFromBrowser() {
  const browserLanguage = navigator.language
  const supportedNonEnLanguages = ['zh-HK']

  if (supportedNonEnLanguages.findIndex((v) => v === browserLanguage) > -1) {
    return browserLanguage
  }

  return 'en'
}
