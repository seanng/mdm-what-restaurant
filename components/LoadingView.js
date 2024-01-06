import { loadingTexts } from 'data/translations'
import { getRandom } from 'utils/helpers'
import Container from './Container'
import Spinner from './Spinner'
import H2 from './H2'
import Card from './Card'

export default function LoadingView({ language }) {
  return (
    <Container>
      <Card>
        <H2>{getRandom(loadingTexts)[language]}</H2>
        <div className="flex justify-center mt-10 mb-7">
          <Spinner />
        </div>
      </Card>
    </Container>
  )
}
