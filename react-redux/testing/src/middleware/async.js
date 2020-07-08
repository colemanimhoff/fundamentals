export default ({ dispatch }) => (next) => (action) => {
  if (!action.payload || !action.payload.then) { // better way to see if a payload is a promise?
    return next(action)
  }

  action.payload.then((response) => {
    const newAction = {
      ...action,
      payload: response
    }

    dispatch(newAction)
  })
}