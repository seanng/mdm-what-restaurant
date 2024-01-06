import Nouislider from 'nouislider-react'
import { INITIAL_RADIUS } from 'utils/configs'
import t from 'data/translations'
import Card from './Card'

export default function RadiusSlider({ radiusSliderOptions, language }) {
  const { onChange, onFinalChange, radius } = radiusSliderOptions

  return (
    <div className="mt-5">
      <Card>
        <p className="mb-4 text-sm">{t.howFar[language]}</p>
        <div className="flex flex-row items-center">
          <div className="relative w-full">
            <Nouislider
              connect
              start={INITIAL_RADIUS}
              range={{
                min: [100, 10],
                '25%': [400, 20],
                '50%': [1000, 50],
                '75%': [2000, 100],
                max: [5000],
              }}
              onSlide={onChange}
              onChange={onFinalChange}
            />
          </div>
          <div className="w-48 text-right text-sm">{`within ${radius} m`}</div>
        </div>
      </Card>
    </div>
  )
}
