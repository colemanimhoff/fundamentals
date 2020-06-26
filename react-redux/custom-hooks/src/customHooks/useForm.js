import { useState, useEffect } from 'react'

export const useForm = (callback, validate) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors(validate(values))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [callback, errors, isSubmitting, values])

  return {
    handleChange,
    handleSubmit,
    errors,
    values
  }
}

// new state for errors
// function that validates these errors
// pass these errors back to form