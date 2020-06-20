import React, { Component } from 'react'

import unsplash from '../api/unsplash'
import SearchBar from './SearchBar'
import ImageList from './ImageList'

class App extends Component {
  state = {
    images: [],
  }

  handleResponse = (response) => {
    if (response.status !== 200) {
      throw new Error(response.errors)
    } else {
      this.setState({ images: response.data.results })
    }
  }

  onSearchSumbit = async (term) => {
    try {
      const response = await unsplash.get('/search/photos', {
        params: {
          query: term,
        },
      })

      this.handleResponse(response)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui divider hidden"></div>
        <SearchBar onSubmit={this.onSearchSumbit} />
        <ImageList images={this.state.images} />
      </div>
    )
  }
}

export default App
