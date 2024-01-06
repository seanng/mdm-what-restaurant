import { useState } from 'react'
import { skipTexts } from 'data/translations'
import { getRandom } from 'utils/helpers'

export default function useRandomTexts() {
  const [skipText, setSkipText] = useState(skipTexts[0])

  const setRandomPrompts = () => {
    setSkipText(getRandom(skipTexts))
  }

  return {
    setRandomPrompts,
    skipText,
    setSkipText,
  }
}
