import React from 'react'
import ReactDOM from 'react-dom'

import App from 'components/App'
import { BrowserRouter, Route } from 'react-router-dom'
import Root from 'Root'

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
)
