import { useState } from 'react'
import { skipTexts } from 'data/translations'
import { getRandom } from 'utils/helpers'

export default function useRandomTexts(language) {
  const [skipText, setSkipText] = useState(skipTexts[0][language])

  const setRandomPrompts = () => {
    setSkipText(getRandom(skipTexts)[language])
  }

  return {
    setRandomPrompts,
    skipText,
    setSkipText,
  }
}
