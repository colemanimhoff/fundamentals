import React from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import async from 'middleware/async'
import reducers from 'reducers'

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(async),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  return <Provider store={store}>{children}</Provider>
}
