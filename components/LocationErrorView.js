import Image from 'next/image'
import t from 'data/translations'
import Card from './Card'
import Container from './Container'
import H2 from './H2'
import Button from './Button'

export default function LocationErrorView({ language }) {
  const handleRefreshClick = () => {
    document.location.reload()
  }

  return (
    <Container>
      <Card>
        <H2>{t.enableLocationHeading[language]}</H2>
        <div>{t.enableLocationDescription[language]}</div>
        <div className="flex justify-center mt-10 mb-7">
          <Image
            src="/happy-cry.png"
            alt="happily crying face"
            height={80}
            width={80}
          />
        </div>
      </Card>
      <div className="flex justify-center mt-8">
        <Button onClick={handleRefreshClick}>
          {t.refreshThisPage[language]}
        </Button>
      </div>
    </Container>
  )
}
