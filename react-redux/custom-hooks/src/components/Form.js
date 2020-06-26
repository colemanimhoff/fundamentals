import React from 'react'
import { useForm } from '../customHooks/useForm'
import { validate } from '../helpers/validateLogin'

const Form = () => {
  const { handleChange, handleSubmit, errors, values } = useForm(submit, validate)

  function submit() {
    console.log(values)
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input onChange={handleChange} name="email" type="email" value={values.email}/>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input onChange={handleChange} name="password" type="password" value={values.password}/>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="Submit">Submit</button>
      </form>
    </div>
  )
}

export default Form


// form
// label / input for email
// label / input for email
// signup button

// handle changes
// handle submit

// handle errors
// show errors if there are errors

// custom react hook
// allow you to reuse stateful logic