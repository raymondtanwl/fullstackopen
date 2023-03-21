import { useState } from 'react'

/**
 * This hook is designed to work with <input>. Each input can utilise this hook to manage and
 * access the state, reducing the codes needed to be written to handle each input.
 *
 * const [ contentValue, contentBind, contentReset ] = useField('text', 'anecdoteContent', 'anecdote content')
 *
 * <input {...contentBind} />
 *
 * const inputVal = contentValue
 * @param {*} type
 * @returns
 */
export const useField = (type, name, placeholder) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // function to clear input
  const reset = () => setValue('')

  // binding attributes for <input>
  const bind = {
    type,
    name,
    value,
    onChange,
  }

  // add placeholder attribute if value is present
  if (placeholder) {
    bind['placeholder'] = placeholder
  }

  // expose value, binding attribute, and reset function to be accessible by the implementor
  return [
    value, bind, reset
  ]

  // return {
  //   type,
  //   name,
  //   value,
  //   onChange,
  // }
}
