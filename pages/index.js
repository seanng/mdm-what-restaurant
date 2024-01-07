/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-await-in-loop */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingView from 'components/LoadingView'
import MainView from 'components/MainView'
import SpinnerModal from 'components/SpinnerModal'
import LocationErrorView from 'components/LocationErrorView'
import NoPlacesView from 'components/NoPlacesView'
import useRandomTexts from 'hooks/useRandomTexts'
import useApi from 'hooks/useApi'
import {
  REFETCHING,
  LOADING,
  POSITION_PERMISSION_DENIED,
} from 'utils/constants'
import { getDistanceFromLatLon } from 'utils/helpers'
import { INITIAL_RADIUS } from 'utils/configs'

/**
 * This is the main page of the app.
 */
function IndexPage() {
  // Keep track of the restaurant view history in case the user navigates back to see the last place.
  const [history, setHistory] = useState([])
  const [radius, setRadius] = useState(INITIAL_RADIUS)
  const router = useRouter()
  const { setRandomPrompts, skipText, setSkipText } = useRandomTexts()

  // The bulk of API related logic is in this useApi hook.
  const {
    fetchPlaces,
    place,
    mode,
    setRandomPlace,
    currentLatLng,
    allPlaces,
    setPlace,
  } = useApi()

  // When the user navigates back to a previous place, we need to update the state.
  useEffect(() => {
    const idx = Number(router.query.idx || 0)
    if (history[idx]) {
      setPlace(history[idx].place)
      setSkipText(history[idx].skipText)
    } else {
      setHistory((v) =>
        v.concat([
          {
            place,
            skipText,
          },
        ])
      )
    }
  }, [router.query.idx])

  // initial load.
  useEffect(() => {
    setRandomPrompts()
    fetchPlaces()
    router.replace('/', '/', { shallow: true })
  }, [])

  const handleSkipClick = async () => {
    await setRandomPlace()
    setRandomPrompts()

    // update history
    const idx = Number(router.query.idx || 0)
    const isAtPastPlace = idx < history.length
    const href = `/?idx=${idx + 1}`
    if (isAtPastPlace) {
      setHistory((v) => v.slice(0, idx).concat([{ place, skipText }]))
    }
    router.push(href, href, { shallow: true })
  }

  const handleRadiusChange = async (val) => {
    const value = Number(val).toFixed()
    setRadius(value)
  }

  const handleFinalRadiusChange = async (val) => {
    const value = Number(val).toFixed()
    await fetchPlaces({ radius: value })
    setRandomPrompts()
  }

  const radiusSliderOptions = {
    onChange: handleRadiusChange,
    onFinalChange: handleFinalRadiusChange,
    radius,
  }

  if (mode === LOADING) {
    return <LoadingView />
  }

  if (mode === POSITION_PERMISSION_DENIED) {
    return <LocationErrorView />
  }

  if (!place) {
    return (
      <>
        <NoPlacesView radiusSliderOptions={radiusSliderOptions} />
        <SpinnerModal shouldOpen={mode === REFETCHING} />
      </>
    )
  }

  return (
    <>
      <MainView
        {...{
          skipText,
          place,
          onSkipClick: handleSkipClick,
          radiusSliderOptions,
          distance: getDistanceFromLatLon(
            currentLatLng[0],
            currentLatLng[1],
            place.geometry.location.lat,
            place.geometry.location.lng
          ),
          shouldShowSkip: allPlaces.length > 1,
        }}
      />
      <SpinnerModal shouldOpen={mode === REFETCHING} />
    </>
  )
}

export default IndexPage
