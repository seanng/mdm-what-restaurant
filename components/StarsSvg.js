/** @see https://codepen.io/jakobud/pen/GorbQY */
export default function Stars({ rating }) {
  const percentage = `${rating * 20}%`
  return (
    <svg viewBox="0 0 1000 200" className="h-4 md:h-5 ml-3">
      <defs>
        <polygon
          id="star"
          points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "
        />
        <clipPath id="stars">
          <use xlinkHref="#star" />
          <use xlinkHref="#star" x="20%" />
          <use xlinkHref="#star" x="40%" />
          <use xlinkHref="#star" x="60%" />
          <use xlinkHref="#star" x="80%" />
        </clipPath>
      </defs>
      <rect
        style={{
          height: '100%',
          width: '100%',
          stroke: 'red',
          strokeWidth: 1,
          fill: '#FFF',
        }}
        clipPath="url(#stars)"
      />
      <rect
        width={percentage}
        style={{ fill: '#FFB94B', height: '100%' }}
        clipPath="url(#stars)"
      />
    </svg>
  )
}
