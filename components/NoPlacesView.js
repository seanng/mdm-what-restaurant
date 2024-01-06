import Image from 'next/image'
import t from 'data/translations'
import RadiusSlider from 'components/RadiusSlider'
import Container from './Container'
import Card from './Card'
import H2 from './H2'

export default function NoPlacesView({ radiusSliderOptions }) {
  return (
    <Container>
      <Card>
        <H2>{t.noPlacesNearbyHeading}</H2>
        <div>{t.noPlacesNearbyDescription}</div>
        <div className="flex justify-center mt-10 mb-7">
          <Image
            src="/thinking.png"
            alt="thinking face"
            height={80}
            width={80}
          />
        </div>
      </Card>
      <RadiusSlider radiusSliderOptions={radiusSliderOptions} />
    </Container>
  )
}
