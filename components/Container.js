import StickyFooter from 'components/StickyFooter'
import Image from 'next/image'

export default function Container({ children, ...props }) {
  return (
    <div
      style={{
        position: 'relative',
        margin: 'auto',
        width: '80%',
        paddingBottom: '50px',
        maxWidth: '400px',
      }}
      {...props}
    >
      <div className="mb-3">
        <Image
          className="rounded-md"
          src="/banner.jpg"
          width={400}
          height={90}
          alt="hello"
        />
      </div>
      {children}
      <StickyFooter />
    </div>
  )
}
