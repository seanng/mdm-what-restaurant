import RadiusSlider from 'components/RadiusSlider'
import Container from 'components/Container'
import t from 'data/translations'
// import banner from 'public/banner.jpg'
import { GOOGLE_PLACES_URL } from 'utils/constants'
import Card from './Card'
import Button from './Button'

function MainView({
  skipText,
  place,
  language,
  onSkipClick,
  radiusSliderOptions,
  shouldShowSkip,
  distance,
}) {
  const googleMapLink = `${GOOGLE_PLACES_URL}/?api=1&query=${place.vicinity}&query_place_id=${place.place_id}`

  return (
    <Container>
      <Card>
        {place.photoUrl && (
          <div className="relative rounded-lg">
            <img
              alt="img"
              className="h-auto max-h-80 w-full max-w-screen-sm object-cover object-center rounded-lg"
              src={place.photoUrl}
            />
            <div className="absolute top-5 right-5 z-30 rounded-lg h-11 w-11 bg-gray-900 text-white text-lg flex justify-center items-center">
              {place.rating}
            </div>
          </div>
        )}
        <h3 className="text-xl mt-8 mb-2 font-semibold">
          <a href={googleMapLink} target="_blank" rel="noreferrer">
            {place.name}
          </a>
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed whitespace-prewrap">
          <a href={googleMapLink} target="_blank" rel="noreferrer">
            {`📍  ${place.vicinity}`}
          </a>
        </p>
        <div className="flex flex-row text-xs mt-4 font-normal">
          <div className="flex flex-row items-center mr-5">
            <span role="img" aria-label="walk" className="text-lg mr-2">
              🚶🏻
            </span>
            <span className="mt-1 mr-5">{`${distance} away`}</span>
          </div>
          {place.price_level && (
            <div className="flex flex-row items-center">
              <span className="text-gray-400 mt-1">|</span>
              {/* TODO: replace emoji with image. */}
              <span role="img" aria-label="money-bag" className="text-lg mr-2">
                💰
              </span>
              <span className="mt-1 mr-5">
                {t[`priceLevel${place.price_level}`][language]}
              </span>
            </div>
          )}
        </div>
      </Card>
      <RadiusSlider
        radiusSliderOptions={radiusSliderOptions}
        language={language}
      />
      {shouldShowSkip && (
        <div className="flex justify-center mt-8">
          <Button onClick={onSkipClick}>{skipText}</Button>
        </div>
      )}
    </Container>
  )
}

export default MainView
