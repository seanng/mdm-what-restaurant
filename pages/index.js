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
import { getDistanceFromLatLon, getLanguageFromBrowser } from 'utils/helpers'
import { INITIAL_RADIUS } from 'utils/configs'

function IndexPage() {
  const [language, setLanguage] = useState('en')
  const [history, setHistory] = useState([])
  const [radius, setRadius] = useState(INITIAL_RADIUS)
  const router = useRouter()

  const { setRandomPrompts, skipText, setSkipText } = useRandomTexts(language)

  const {
    fetchPlaces,
    place,
    mode,
    setRandomPlace,
    currentLatLng,
    allPlaces,
    setPlace,
  } = useApi()

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
    setLanguage(getLanguageFromBrowser())
    setRandomPrompts()
    fetchPlaces()
    // clear url in case someone shares a link with idx=<number>
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

  if (mode === LOADING) {
    return <LoadingView language={language} />
  }

  if (mode === POSITION_PERMISSION_DENIED) {
    return <LocationErrorView language={language} />
  }

  const radiusSliderOptions = {
    onChange: handleRadiusChange,
    onFinalChange: handleFinalRadiusChange,
    radius,
  }

  if (!place) {
    return (
      <>
        <NoPlacesView
          {...{
            language,
            radiusSliderOptions,
          }}
        />
        <SpinnerModal shouldOpen={mode === REFETCHING} />
      </>
    )
  }

  const distance = getDistanceFromLatLon(
    currentLatLng[0],
    currentLatLng[1],
    place.geometry.location.lat,
    place.geometry.location.lng
  )

  return (
    <>
      <MainView
        {...{
          skipText,
          place,
          language,
          onSkipClick: handleSkipClick,
          radiusSliderOptions,
          distance,
          shouldShowSkip: allPlaces.length > 1,
        }}
      />
      <SpinnerModal shouldOpen={mode === REFETCHING} />
    </>
  )
}

export default IndexPage
