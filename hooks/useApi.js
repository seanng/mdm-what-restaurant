/* eslint-disable no-await-in-loop */
/* global navigator */
import { useState } from 'react'
import axios from 'axios'
import {
  LOADING,
  REFETCHING,
  NO_NEARBY_RESTAURANT,
  POSITION_PERMISSION_DENIED,
  POSITION_UNAVAILABLE,
  POSITION_TIMEOUT,
  SUCCESS,
  NO_GEOLOCATION,
} from 'utils/constants'
// import dummyResults from 'data/dummy-results'
import { getPlaceWithPhotoUrl, getRandom, sleep } from 'utils/helpers'
import { INITIAL_RADIUS } from 'utils/configs'

export default function useApi() {
  const [mode, setMode] = useState(LOADING)
  // const [place, setPlace] = useState(dummyResults[0])
  // const [allPlaces, setAllPlaces] = useState(dummyResults)
  const [currentLatLng, setCurrentLatLng] = useState([0, 0])
  const [place, setPlace] = useState(null)
  const [allPlaces, setAllPlaces] = useState([])

  async function setRandomPlace(list = allPlaces) {
    let randomPlace
    do {
      randomPlace = getRandom(list)
    } while (place?.place_id === randomPlace.place_id)
    const placeWithPhotoUrl = await getPlaceWithPhotoUrl(randomPlace)
    setPlace(placeWithPhotoUrl)
  }

  async function fetchPlaces(payload) {
    return new Promise((resolve) => {
      if (mode !== LOADING) {
        setMode(REFETCHING)
      }
      if (!navigator.geolocation) {
        setMode(NO_GEOLOCATION)
      }

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setCurrentLatLng([coords.latitude, coords.longitude])
        handleRequest(coords, payload, resolve)
      }, handleNavigatorError)
    })
  }

  async function handleRequest(
    { longitude, latitude },
    payload = {},
    cb = () => {}
  ) {
    let pagetoken
    let results = []
    do {
      const { data } = await axios.post('/api/nearby', {
        radius: INITIAL_RADIUS,
        ...payload,
        pagetoken,
        location: { longitude, latitude },
      })
      if (data.results.length === 0) {
        setPlace(null)
        setMode(NO_NEARBY_RESTAURANT)
        return
      }
      // during first iteration
      if (!pagetoken) {
        await setRandomPlace(data.results)
        setAllPlaces(data.results)
        cb()
      }
      pagetoken = data.next_page_token
      results = results.concat(data.results)
      setMode(SUCCESS)
      // wait for token to be made available on google places api
      await sleep(2000)
      // then quietly fetch remaining pages
    } while (pagetoken)
    setAllPlaces(results)
  }

  function handleNavigatorError(error) {
    switch (error.code) {
      case 1:
        setMode(POSITION_PERMISSION_DENIED)
        break
      case 2:
        // Your precise location could not be determined.
        setMode(POSITION_UNAVAILABLE)
        break
      case 3:
        setMode(POSITION_TIMEOUT)
        break
      default:
        setMode(error.message)
    }
  }

  return {
    fetchPlaces,
    mode,
    place,
    setRandomPlace,
    allPlaces,
    currentLatLng,
    setPlace,
  }
}
