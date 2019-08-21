import { useState } from 'react'

/* 5.19: blogilista ja hookit step2 */
/* useField-hookissa on pieni epäkohta. Se ei mahdollista lomakkeen syötekentän tyhjentämistä. */
/* Laajenna hookia siten, että se tarjoaa operaation reset kentän tyhjentämiseen. */

/* 5.20: blogilista ja hookit step3 */
/* Tee sovellukseen korjaus, joka poistaa varoituksen: Invalid value for prop reset' on <input> tag */

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
    bind: {
      type,
      value,
      onChange
    }
  }
}