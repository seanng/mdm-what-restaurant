import { Client } from '@googlemaps/google-maps-services-js'

const gmaps = new Client({})

const LOCATION = {
  // somewhere in sheung wan...
  lat: 22.284014,
  lng: 114.151726,
}

/**
 * Randomizer handled by frontend
 * @see https://developers.google.com/maps/documentation/places/web-service/search#PlaceSearchRequests
 */
export default async function nearby(req, res) {
  const { location = LOCATION, radius = 5000, language = 'en' } = req.body

  try {
    const { data } = await gmaps.placesNearby({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        type: 'restaurant',
        opennow: true,
        language,
        radius,
        location,
        ...req.body,
      },
    })

    res.json(data)
  } catch (error) {
    console.log('error: ', error.toJSON())
    res.status(400).send('error')
  }
}
